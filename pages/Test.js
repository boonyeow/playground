import React, { useEffect, useRef } from "react";
import { Text, Button, Input } from "@chakra-ui/react";
import { ICONexConnection, estimateStepsforDeployment } from "../util/interact";
import cfg from "../config.json";
import { fetchContractContent } from "../util/fetchContractContent";
import IconService from "icon-sdk-js";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;
const Test = () => {
    const inputCX = useRef(null);

    const httpProvider = new HttpProvider(cfg.rpc_endpoint);
    const iconService = new IconService(httpProvider);
    const wallet = "";
    useEffect(() => {
        wallet = IconWallet.loadPrivateKey(
            "4e53d8d26fcb04f1f36b0e0659c19ccf9e2b5c4faea25b29dd084033c7b48dbd"
        );
    }, []);

    // const getAPIList = async () => {
    //     console.log(inputCX.current.value);
    //     const apiList = await iconService
    //         .getScoreApi(inputCX.current.value)
    //         .execute();
    //     console.log(apiList.getList());
    // };

    const testfunc = () => {
        console.log(iconService);
        console.log(iconService.sendTransaction);
    };

    const deployContract = async () => {
        const contractInBytes = await fetchContractContent(
            "https://siasky.net/CACHSYOEvx3Xe6U9JIcEtVU5qEy3ICIi_f1zMsFEdsOxtA"
        );
        console.log(contractInBytes);

        const params = {
            symbol: "test",
        };

        const stepLimitInHex = await estimateStepsforDeployment(
            wallet.address,
            contractInBytes,
            params
        );
        console.log("steplimitinhex", stepLimitInHex);

        const txObj = new IconService.IconBuilder.DeployTransactionBuilder()
            .nid(cfg.nid)
            .from(wallet.address)
            .to(cfg.ZERO_ADDRESS)
            .stepLimit(IconConverter.toBigNumber("20000000000"))
            .version(IconConverter.toBigNumber(3))
            .timestamp(Date.now() * 1000)
            .contentType("application/java")
            .content(contractInBytes)
            .params({})
            .nonce(IconConverter.toBigNumber(1))
            .build();
        console.log("txobj", txObj);

        const signedTransaction = new SignedTransaction(txObj, wallet);

        const txHash = await iconService
            .sendTransaction(signedTransaction)
            .execute();
        console.log("txhash", txHash);
        setTimeout(async () => {
            const txObject = await iconService
                .getTransactionResult(txHash)
                .execute();
            console.log(txObject);
        }, 5000);
    };

    return (
        <>
            <Input ref={inputCX} placeholder="cx addy"></Input>
            <Button onClick={testfunc}>Test</Button>
            <Button onClick={deployContract}>Deploy</Button>
        </>
    );
};

export default Test;
