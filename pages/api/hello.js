// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import IconService from "icon-sdk-js";
import secp256k1 from "secp256k1";
import { sha3_256 as sha3256 } from "js-sha3";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const getSignedTransaction = (allowlistAddress, contractAddress) => {
    const txObj = new IconBuilder.MessageTransactionBuilder()
        .from(allowlistAddress)
        .to(contractAddress)
        .stepLimit(IconConverter.toBigNumber(100000))
        .nid(IconConverter.toBigNumber(3))
        .nonce(IconConverter.toBigNumber(1))
        .version(IconConverter.toBigNumber(3))
        .data(IconConverter.fromUtf8("Hello"))
        .build();
    const signerWallet = IconWallet.loadPrivateKey(
        process.env.SIGNER_PRIVATE_KEY
    );
    const signedTransaction = new SignedTransaction(txObj, signerWallet);
    return signedTransaction;
};

const getPublicAddress = (rawTransaction, signature) => {
    //const rawTransaction = signedTransaction.getRawTransaction();
    const hashcode = IconService.IconUtil.serialize(rawTransaction); // in hex
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

export default function handler(req, res) {
    const signedTransaction = getSignedTransaction(
        "hx14818f728d40ebaad185aa553d333f4c913ed566",
        "cxd4ed095287fb93dc0806bbec5fdf46ce1a13d8c9"
    );
    const rawTransaction = signedTransaction.getRawTransaction();
    const signature = signedTransaction.getSignature();
    const publicAddress = getPublicAddress(rawTransaction, signature);
    const signerWallet = IconWallet.loadPrivateKey(
        process.env.SIGNER_PRIVATE_KEY
    );

    res.status(200).json({
        test: "hello",
        signedTransaction: signedTransaction,
        decodedaddy: publicAddress,
        initial: signerWallet.getAddress(),
    });
}
