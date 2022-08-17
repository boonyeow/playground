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
    TableContainer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import IconService from "icon-sdk-js";
import ICONexConnection from "../util/interact";
import { ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import CustomAlert from "./CustomAlert";
import cfg from "../util/config";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const connection = new ICONexConnection();
const ProposalCollection = ({ proposalInfo, pid, userInfo }) => {
    console.log(proposalInfo);
    // const [lastblock, setLastBlock] = useState('');
    const [showStatus, setShowStatus] = useState(false);
    const [statusInfo, setStatusInfo] = useState({
        type: "loading",
        title: "executing proposal",
        desc: "awaiting tx approval...",
    });
    const [showClose, setShowClose] = useState(true);

    const statusInformation = {
        0: {
            status: "Active",
            theme: {
                bg: "#E9D8FD",
                color: "#6B46C1",
            },
        },
        1: {
            status: "Approved",
            theme: {
                bg: "#C6F6D5",
                color: "#2F855A",
            },
        },
        2: {
            status: "Rejected",
            theme: {
                bg: "#FED7D7",
                color: "#C53030",
            },
        },
        3: {
            status: "Executed",
            theme: {
                bg: "#C6F6D5",
                color: "#2F855A",
            },
        },
        4: {
            status: "Cancelled",
            theme: {
                bg: "#CBD5E0",
                color: "#718096",
            },
        },
    };

    // currently user need to refresh to get most updated proposal status
    // useEffect(() => {
    //     const getlatestblockheight = async () => {
    //         // Returns block information
    //         const block = await connection.iconService.getLastBlock().execute();
    //         setLastBlock(block.height)
    //     };
    //     getlatestblockheight()
    // }, []);

    const executeProposal = async (event, proposalIndexInfo, index) => {
        setShowStatus(true);
        setShowClose(false);
        if (parseInt(proposalIndexInfo.proposalType) == 1) {
            let data = {};
            data.withdrawalRate = proposalIndexInfo.withdrawalRate;
            data.id = IconConverter.toHexNumber(index);

            const txObj = new IconBuilder.CallTransactionBuilder()
                .from(userInfo.userAddress)
                .to(pid)
                .nid(cfg.NID)
                .nonce(IconConverter.toBigNumber(1))
                .version(IconConverter.toBigNumber(3))
                .timestamp(new Date().getTime() * 1000)
                .method("changeWithdrawalRate")
                .params(data)
                .build();
            console.log("txobj", txObj);
            const estimatedSteps = IconConverter.toBigNumber(
                await connection.debugService.estimateStep(txObj).execute()
            );
            console.log("estimatedSteps", estimatedSteps);

            txObj.stepLimit = IconService.IconConverter.toHex(
                estimatedSteps.plus(IconConverter.toBigNumber(10000)) // prevent out of step
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

            getTransactionResult(rpcResponse, 5);
        }

        // need to do for execution of refund proposal
    };

    const cancelProposal = async (event, index) => {
        setStatusInfo({
            type: "loading",
            title: "cancelling proposal",
            desc: "awaiting tx approval...",
        });
        setShowStatus(true);
        setShowClose(false);
        const txObj = new IconBuilder.CallTransactionBuilder()
            .from(userInfo.userAddress)
            .to(pid)
            .nid(cfg.NID)
            .nonce(IconConverter.toBigNumber(1))
            .version(IconConverter.toBigNumber(3))
            .timestamp(new Date().getTime() * 1000)
            .method("cancelProposal")
            .params({
                id: IconConverter.toHexNumber(index),
            })
            .build();
        const estimatedSteps = IconConverter.toBigNumber(
            await connection.debugService.estimateStep(txObj).execute()
        );
        console.log("estimatedSteps", estimatedSteps);

        txObj.stepLimit = IconService.IconConverter.toHex(
            estimatedSteps.plus(IconConverter.toBigNumber(10000)) // prevent out of step
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

        getTransactionResult(rpcResponse, 5);
    };

    const getTransactionResult = async (rpcResponse, maxRetry, values) => {
        console.log("trying...", maxRetry);
        if (rpcResponse.error) {
            setShowClose(true);
            setStatusInfo({
                type: "failure",
                title: "ooops",
                desc: "your transaction was not approved",
            });
        } else {
            try {
                const txResult = await connection.iconService
                    .getTransactionResult(rpcResponse.result)
                    .execute();
                if (txResult.status === 1) {
                    setShowClose(true);
                    setStatusInfo({
                        type: "success",
                        title: "success",
                        desc: "your proposal has been executed!",
                    });
                } else {
                    console.log("FAILED BOI", txResult);
                    setShowClose(true);
                    setStatusInfo({
                        type: "failure",
                        title: "ooops",
                        desc: "your transaction has failed, please try again",
                    });
                }
            } catch (err) {
                if (maxRetry > 0) {
                    setTimeout(
                        () => getTransactionResult(rpcResponse, maxRetry - 1),
                        2200
                    );
                } else {
                    console.log(err);
                    setShowClose(true);
                    setStatusInfo({
                        type: "failure",
                        title: "ooops",
                        desc: "your transaction has failed, please try again",
                    });
                }
            }
        }
    };
    return (
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th w="45%">Title</Th>
                        <Th w="35%">Vote Summary</Th>
                        <Th w="20%"></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Object.keys(proposalInfo).map((index) => {
                        const totalVotes =
                            parseInt(proposalInfo[index].disagreeVotes) +
                            parseInt(proposalInfo[index].agreeVotes) +
                            parseInt(proposalInfo[index].noVotes);
                        const disagreePercentage =
                            (parseInt(proposalInfo[index].disagreeVotes) /
                                totalVotes) *
                            100;
                        const disagreeWidth = disagreePercentage
                            .toString()
                            .concat("%");
                        const agreePercentage =
                            (parseInt(proposalInfo[index].agreeVotes) /
                                totalVotes) *
                            100;
                        const agreeWidth = agreePercentage
                            .toString()
                            .concat("%");
                        // width of vote summary
                        return (
                            <Tr key={index}>
                                <Td>
                                    <Box
                                        borderRadius="5px"
                                        px="15px"
                                        py="5px"
                                        mr="15px"
                                        textAlign="center"
                                        display="inline-block"
                                        fontWeight="semibold"
                                        fontSize="sm"
                                        sx={
                                            statusInformation[
                                                parseInt(
                                                    proposalInfo[index].info
                                                        .status
                                                )
                                            ].theme
                                        }
                                    >
                                        {
                                            statusInformation[
                                                parseInt(
                                                    proposalInfo[index].info
                                                        .status
                                                )
                                            ].status
                                        }
                                    </Box>
                                    {proposalInfo[index].info.title}
                                </Td>
                                <Td>
                                    <Box
                                        bg="#D9D9D9"
                                        width="100%"
                                        height="6px"
                                        borderRadius="5px"
                                    >
                                        <Flex width="100%" height="100%">
                                            <Box
                                                width={agreeWidth}
                                                bg="#43CC9B"
                                                height="100%"
                                                borderRadius="5px 0 0 5px"
                                            />
                                            <Box
                                                width={disagreeWidth}
                                                bg="#F16767"
                                                height="100%"
                                            />
                                        </Flex>
                                    </Box>
                                </Td>
                                <Td>
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            rightIcon={<ChevronDownIcon />}
                                            variant="outside-button"
                                        >
                                            Actions
                                        </MenuButton>
                                        {parseInt(
                                            proposalInfo[index].info.status
                                        ) == 0 && (
                                            <MenuList>
                                                <NextLink
                                                    href={`/governance/${pid}/${index}`}
                                                >
                                                    <MenuItem>View</MenuItem>
                                                </NextLink>
                                                <MenuItem
                                                    onClick={(event) =>
                                                        cancelProposal(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </MenuItem>
                                            </MenuList>
                                        )}
                                        {parseInt(
                                            proposalInfo[index].info.status
                                        ) == 1 && (
                                            <MenuList>
                                                <NextLink
                                                    href={`/governance/${pid}/${index}`}
                                                >
                                                    <MenuItem>View</MenuItem>
                                                </NextLink>
                                                <MenuItem
                                                    onClick={(event) =>
                                                        executeProposal(
                                                            event,
                                                            proposalInfo[index]
                                                                .info,
                                                            index
                                                        )
                                                    }
                                                >
                                                    Execute
                                                </MenuItem>
                                            </MenuList>
                                        )}
                                        {console.log(
                                            IconConverter.toNumber(
                                                proposalInfo[index].info.status
                                            )
                                        )}
                                        {(IconConverter.toNumber(
                                            proposalInfo[index].info.status
                                        ) === 2 ||
                                            IconConverter.toNumber(
                                                proposalInfo[index].info.status
                                            ) === 3 ||
                                            IconConverter.toNumber(
                                                proposalInfo[index].info.status
                                            ) === 4) && (
                                            // {IconConverter.toNumber(proposalInfo[index].info.status) === 3 &&

                                            <MenuList>
                                                <NextLink
                                                    href={`/governance/${pid}/${index}`}
                                                >
                                                    <MenuItem>View</MenuItem>
                                                </NextLink>
                                            </MenuList>
                                        )}
                                    </Menu>
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
            <CustomAlert
                showStatus={showStatus}
                onClose={() => {
                    setShowStatus(false);
                    setStatusInfo({
                        type: "loading",
                        title: "executing proposal",
                        desc: "awaiting tx approval",
                    }); //revert everything to default
                }}
                title={statusInfo.title}
                desc={statusInfo.desc}
                status={statusInfo.type}
                showClose={showClose}
            />
        </TableContainer>
    );
};

export default ProposalCollection;
