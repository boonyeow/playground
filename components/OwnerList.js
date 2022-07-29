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
    Progress,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import IconService from "icon-sdk-js";
import { useRouter } from "next/router";
import ICONexConnection from "../util/interact";
import CustomAlert from ".//CustomAlert.js";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const OwnerList = ({ voterInfo, userInfo, pid }) => {
    const connection = new ICONexConnection;

    // convert javascript object literal to array and tally total votes available
    const voters = [];
    var totalVotes = 0;
    for (var key in voterInfo) {
        voters.push({ "address": key, "value": IconConverter.toNumber(voterInfo[key]) })
        totalVotes += IconConverter.toNumber(voterInfo[key]);
    }
    voters.sort(function (a, b) {
        return b.value - a.value;
    })

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
                delegate: delegateAddress
            })
            .build();

        const estimatedSteps = IconConverter.toBigNumber(
            await connection.debugService.estimateStep(txObj).execute()
        );

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

        let rpcResponse = await connection.ICONexRequest(
            "REQUEST_JSON-RPC",
            payload
        );
        console.log(rpcResponse.error);

    }

    return (
        <>
            <TableContainer>
                <Table variant='simple'>
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
                            var voteWeight = voterContent.value / totalVotes * 100;
                            return (
                                <Tr key={index}>
                                    <Td>{voterContent.address}</Td>
                                    <Td textAlign="center">{voterContent.value}</Td>
                                    <Td textAlign="center">{voteWeight.toFixed(2)}%</Td>
                                    <Td float="right">
                                        <Button
                                            bg="transparent"
                                            color="#3D5CC3"
                                            _hover={{ bg: "blue.100", color: "#000000", }}
                                            onClick={() => { delegateVotes(voterContent.address) }}
                                        >
                                            Delegate
                                        </Button>
                                    </Td>
                                </Tr >
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            {/* <Button onClick={lol}>d</Button> */}
            <CustomAlert showStatus={false} title="TITLE" desc="DESC" status="status" />

        </>
    );
};

export default OwnerList;
