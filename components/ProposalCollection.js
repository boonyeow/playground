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
import NextLink from "next/link";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const connection = new ICONexConnection();
const ProposalCollection = ({ proposalInfo, pid }) => {
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

    const formatTimestamp = (timestamp) => {
        return new Date((timestamp / 1e6) * 1000).toUTCString();
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
                                            statusInfo[
                                                parseInt(
                                                    proposalInfo[index].info
                                                        .status
                                                )
                                            ].theme
                                        }
                                    >
                                        {
                                            statusInfo[
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
                                    <NextLink
                                        href={`/governance/${pid}/${index}`}
                                    >
                                        <Button variant="outside-button">
                                            View more
                                        </Button>
                                    </NextLink>
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
