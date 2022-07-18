import IconService from "icon-sdk-js";
import crypto from "crypto";
import db from "../../db";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const getSignedTransaction = (allowlistAddress, contractAddress, salt) => {
    const txObj = new IconBuilder.MessageTransactionBuilder()
        .from(allowlistAddress)
        .to(contractAddress)
        .stepLimit(IconConverter.toBigNumber(100000))
        .nid(IconConverter.toBigNumber(3))
        .nonce(IconConverter.toBigNumber(1))
        .version(IconConverter.toBigNumber(3))
        .data(salt)
        .build();
    // console.log("txObj", txObj);
    const signerWallet = IconWallet.loadPrivateKey(
        process.env.SIGNER_PRIVATE_KEY
    );
    const signedTransaction = new SignedTransaction(txObj, signerWallet);
    return signedTransaction;
};

const getParams = (query) => {
    const params = {
        TableName: "allowlist",
        Key: {
            contractAddress: query.contractAddress,
            userAddress: query  .userAddress,
        },
    };
    return params;
};

const postParams = (body) => {
    const salt = crypto.randomBytes(32).toString("hex");
    const signedTransaction = getSignedTransaction(
        body.userAddress,
        body.contractAddress,
        salt
    );

    const params = {
        TableName: "allowlist",
        Item: {
            contractAddress: body.contractAddress,
            userAddress: body.userAddress,
            salt: salt,
            signature: signedTransaction.getSignature(),
            timestamp: Date.now(),
        },
        ConditionExpression: "contractAddress <> :cx AND walletAddress <> :hx",
        ExpressionAttributeValues: {
            ":cx": body.contractAddress,
            ":hx": body.userAddress,
        },
    };
    return params;
};

export default async function handler(req, res) {
    if (req.method === "GET") {
        const params = getParams(req.query);
        db.get(params, function (err, data) {
            if (err) res.send(err.statusCode);
            else res.send(data);
        });
    } else if (req.method === "POST") {
        const params = postParams(req.body);
        db.put(params, function (err, data) {
            if (err) res.send(err.statusCode);
            else res.send(data);
        });
    } else {
        res.status(400).send("Only POST/GET requests are allowed");
    }
}
