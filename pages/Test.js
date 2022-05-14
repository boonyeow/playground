import React, { useEffect, useRef } from "react";
import { Text, Button, Input } from "@chakra-ui/react";
import ICONexConnection from "../util/interact";

const Test = () => {
    const connection = new ICONexConnection();
    const iconService = connection.iconService;
    const wallet = connection.wallet;
    const inputCX = useRef(null);

    const getAPIList = async () => {
        console.log(inputCX.current.value);
        const apiList = await iconService
            .getScoreApi(inputCX.current.value)
            .execute();
        console.log(apiList.getList());
    };

    const deployContract = async () => {
        const balance = await iconService
            .getBalance(wallet.getAddress())
            .execute();
        console.log(balance);
    };

    return (
        <>
            <Input ref={inputCX} placeholder="cx addy"></Input>
            <Button onClick={getAPIList}>Test</Button>
            <Button onClick={deployContract}>Test</Button>
        </>
    );
};

export default Test;
