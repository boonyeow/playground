import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useToast,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import IconService from "icon-sdk-js";
import { useRouter } from "next/router";
import ICONexConnection, { sleep } from "../util/interact";
import CustomAlert from ".//CustomAlert.js";
import React, { useEffect, useRef, useState } from "react";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const OwnerList = ({ voterInfo, userInfo, pid }) => {
    const connection = new ICONexConnection();

    // convert javascript object literal to array and tally total votes available
    const voters = [];
    var totalVotes = 0;
    for (var key in voterInfo) {
        voters.push({
            address: key,
            value: IconConverter.toNumber(voterInfo[key]),
        });
        totalVotes += IconConverter.toNumber(voterInfo[key]);
    }
    voters.sort(function (a, b) {
        return b.value - a.value;
    });

    // custom alert state initialization
    const [showStatus, setShowStatus] = useState(false);
    const [statusType, setStatusType] = useState("loading");
    const [statusTitle, setStatusTitle] = useState("Delegating..");
    const [statusDesc, setStatusDesc] = useState(
        "Awaiting transaction approval"
    );

    // toast initialization
    const toast = useToast();

    // delegate function
    const delegateVotes = async (delegateAddress) => {
        const txObj = new IconBuilder.CallTransactionBuilder()
            .from(userInfo.userAddress)
            .to(pid)
            .nid(IconConverter.toBigNumber(2))
            .nonce(IconConverter.toBigNumber(1))
            .version(IconConverter.toBigNumber(3)) //constant
            .timestamp(new Date().getTime() * 1000)
            .method("setDelegation")
            .params({
                delegate: delegateAddress,
            })
            .build();

        let estimatedSteps;

        try {
            estimatedSteps = IconConverter.toBigNumber(
                await connection.debugService.estimateStep(txObj).execute()
            );
        } catch (err) {
            toast({
                title: "Invalid Delegatee",
                description: "Unable to delegate to this address.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right",
            });
            return;
        }

        // in case they close custom alert before cancelling
        setStatusType("loading");
        setStatusTitle("Delegating..");
        setStatusDesc("Awaiting transaction approval");
        setShowStatus(true);

        const margin = IconConverter.toBigNumber(10000);

        // Add step limit property to transaction with margin to prevent out of step
        txObj.stepLimit = IconService.IconConverter.toHex(
            estimatedSteps.plus(margin)
        );

        const payload = {
            jsonrpc: "2.0",
            method: "icx_sendTransaction",
            id: 6639,
            params: IconConverter.toRawTransaction(txObj),
        };

        try {
            let rpcResponse = await connection.ICONexRequest(
                "REQUEST_JSON-RPC",
                payload
            );
            if (rpcResponse.error) {
                setStatusType("failure");
                setStatusTitle("Cancelled");
                setStatusDesc("Delegation process has been stopped");
            } else {
                console.log(rpcResponse);
                await sleep(5000);
                const txResult = await connection.iconService
                    .getTransactionResult(rpcResponse.result)
                    .execute();

                // await sleep(5000); // might require it
                if (txResult.status == 0) {
                    setStatusType("failure");
                    setStatusTitle("Delegation failed");
                    setStatusDesc("Unexpected error has occurred");
                } else if (txResult.status == 1) {
                    setStatusType("success");
                    setStatusTitle("Success!");
                    setStatusDesc("Votes have been delegated :)");
                }
            }
        } catch (err) {
            console.log("error in rpcResponse catch block", err);
            setStatusType("failure");
            setStatusTitle("oops");
            setStatusDesc("idk what happen");
        }
    };

    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Address</Th>
                            <Th textAlign="center">Votes</Th>
                            <Th textAlign="center">Voting Weight</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {voters.map((voterContent, index) => {
                            var voteWeight =
                                (voterContent.value / totalVotes) * 100;
                            return (
                                <Tr key={index}>
                                    <Td color="#3D5CC3" fontWeight="semibold">
                                        {voterContent.address}
                                    </Td>
                                    <Td textAlign="center">
                                        {voterContent.value}
                                    </Td>
                                    <Td textAlign="center">
                                        {voteWeight.toFixed(2)}%
                                    </Td>
                                    <Td>
                                        {voterContent.address ==
                                        userInfo.userAddress ? (
                                            <Button
                                                variant="outside-button"
                                                disabled
                                            >
                                                Delegate
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outside-button"
                                                onClick={() => {
                                                    delegateVotes(
                                                        voterContent.address
                                                    );
                                                }}
                                                //disabled //if user is not signed in, disable
                                            >
                                                Delegate
                                            </Button>
                                        )}
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <CustomAlert
                showStatus={showStatus}
                title={statusTitle}
                desc={statusDesc}
                status={statusType}
                onClose={() => {
                    setShowStatus(false);
                    setStatusType("loading");
                    setStatusTitle("Delegating..");
                    setStatusDesc("Awaiting transaction approval"); //revert everything to default
                }}
            />
        </>
    );
};

export default OwnerList;
