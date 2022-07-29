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

const ProposalCollection = ({ proposalInfo }) => {
    const statusInfo = {
        0: {
            status: "Active",
            theme: {
                bg: "#E9D8FD",
                color: "#6B46C1"
            }
        },
        1: {
            status: "Approved",
            theme: {
                bg: "#C6F6D5",
                color: "#2F855A"
            }
        },
        2: {
            status: "Rejected",
            theme: {
                bg: "#FED7D7",
                color: "#C53030"
            }
        },
        3: {
            status: "Executed",
            theme: {
                bg: "#C6F6D5",
                color: "#2F855A"
            }
        },
        4: {
            status: "Cancelled",
            theme: {
                bg: "#CBD5E0",
                color: "#718096"
            }
        }
    }
    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Description</Th>
                        <Th>Vote Summary</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {proposalInfo.proposals.map((proposalContent, index) => {
                        const totalVotes = parseInt(proposalContent.disagreeVotes) + parseInt(proposalContent.agreeVotes) + parseInt(proposalContent.noVotes);
                        const disagreePercentage = parseInt(proposalContent.disagreeVotes) / totalVotes * 100;
                        const disagreeWidth = disagreePercentage.toString().concat("%");
                        const agreePercentage = parseInt(proposalContent.agreeVotes) / totalVotes * 100;
                        const agreeWidth = agreePercentage.toString().concat("%");
                        // width of vote summary                
                        return (<Tr key={index}>
                            <Td>{proposalContent.startBlockHeight}</Td>
                            <Td>{proposalContent.id}</Td>
                            <Td>
                                <Box bg="#D9D9D9" width="100%" height="6px" borderRadius="5px">
                                    <Flex width="100%" height="100%">
                                        <Box width={agreeWidth} bg="#43CC9B" height="100%" borderRadius="5px 0 0 5px" />
                                        <Box width={disagreeWidth} bg="#F16767" height="100%" />
                                    </Flex>
                                </Box>
                            </Td>
                            <Td>
                                <Box
                                    borderRadius="50px"
                                    px="20px"
                                    py="10px"
                                    textAlign="center"
                                    display="inline-block"
                                    fontWeight="semibold"
                                    sx={statusInfo[proposalContent.status].theme}
                                >
                                    {statusInfo[proposalContent.status].status}
                                </Box>
                            </Td>
                        </Tr >
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default ProposalCollection;
