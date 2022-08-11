import IconService from "icon-sdk-js";
import secp256k1 from "secp256k1";
import { sha3_256 as sha3256 } from "js-sha3";
import axios from "axios";
import jwt from "jsonwebtoken";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

import cfg from "../../util/config";

const getUserAddress = (hashcode, signature) => {
    const hashcodeBuffer = Buffer.from(hashcode, "hex");

    const signatureArray = Buffer.from(
        signature, //signedTransaction.getSignature(),
        "base64"
    );
    const signatureBuffer = signatureArray.subarray(0, 64);
    const recoveryBuffer = signatureArray.subarray(64);

    const publicKey = secp256k1.recover(
        hashcodeBuffer,
        signatureBuffer,
        parseInt(recoveryBuffer.toString("hex")),
        false
    );

    const publicKeyBuffer = publicKey.slice(1);
    return "hx" + sha3256(publicKeyBuffer).slice(-40);
};

const createUser = async (userAddress) => {
    let res = await axios.post(`${cfg.BASE_URL}/api/users`, {
        userAddress: userAddress,
    });
    return res;
};

export default async function handler(req, res) {
    if (req.method == "POST") {
        let data = req.body;
        console.log("data", data);
        const decoded = getUserAddress(data.txHash, data.signature);
        if (data.userAddress === decoded) {
            // User is authenticated, proceed to issue jwt
            var token = jwt.sign({ user: data.userAddress }, "crowdnine", {
                expiresIn: "1d",
            });
            console.log("token", token);

            // proceed to update nonce
            await axios.post(`${cfg.BASE_URL}/api/users`, {
                userAddress: data.userAddress,
            });
            res.status(200).send({ success: 1, token: token });
        } else {
            res.status(401).send({ error: "signature verification failed" });
        }
    } else {
        res.status(400).send("Only POST/GET requests are allowed");
    }
}
