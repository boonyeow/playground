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
} from "@chakra-ui/react";
import IconService from "icon-sdk-js";
import ICONexConnection from "../util/interact";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const connection = new ICONexConnection();
const ProposalCollection = ({ proposalInfo }) => {
    console.log("proposalcol", proposalInfo);
    const statusInfo = {
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

    const getBlockInfo = async (blockHeight) => {
        let res = await connection.iconService
            .getBlockByHeight(IconConverter.toHexNumber(blockHeight))
            .execute();
        return new Date((res.timeStamp / 1e6) * 1000);
    };

    const formatTimestamp = (timestamp) => {
        return new Date((timestamp / 1e6) * 1000).toUTCString();
    };

    return (
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Description</Th>
                        <Th>Vote Summary</Th>
                        <Th>Status</Th>
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
                                    {formatTimestamp(
                                        proposalInfo[index].startTimestamp
                                    )}
                                </Td>
                                <Td>{proposalInfo[index].id}</Td>
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
                                    <Box
                                        borderRadius="5px"
                                        px="15px"
                                        py="5px"
                                        textAlign="center"
                                        display="inline-block"
                                        fontWeight="semibold"
                                        fontSize="sm"
                                        sx={
                                            statusInfo[
                                                proposalInfo[index].status
                                            ].theme
                                        }
                                    >
                                        {
                                            statusInfo[
                                                proposalInfo[index].status
                                            ].status
                                        }
                                    </Box>
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default ProposalCollection;
