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
    const displayProposal = () => {
        const tableRow = [];
        for (var i = 0; i < proposalInfo.proposals.length; i++) {

            // width of vote summary
            const totalVotes = parseInt(proposalInfo.proposals[i].disagreeVotes) + parseInt(proposalInfo.proposals[i].agreeVotes) + parseInt(proposalInfo.proposals[i].noVotes);
            const disagreePercentage = parseInt(proposalInfo.proposals[i].disagreeVotes) / totalVotes * 100;
            const disagreeWidth = disagreePercentage.toString().concat("%");
            const agreePercentage = parseInt(proposalInfo.proposals[i].agreeVotes) / totalVotes * 100;
            const agreeWidth = agreePercentage.toString().concat("%");

            // status bar
            var status, theme;
            switch (proposalInfo.proposals[i].status) {
                case 0:
                    status = "Active";
                    theme = {
                        bg: "#E9D8FD",
                        color: "#6B46C1"
                    };
                    break;
                case 1:
                    status = "Approved";
                    theme = {
                        bg: "#C6F6D5",
                        color: "#2F855A"
                    };
                    break;
                case 2:
                    status = "Rejected";
                    theme = {
                        bg: "#FED7D7",
                        color: "#C53030"
                    };
                    break;
                case 3:
                    status = "Executed";
                    theme = {
                        bg: "#C6F6D5",
                        color: "#2F855A"
                    };
                    break;
                case 4:
                    status = "Cancelled";
                    theme = {
                        bg: "#CBD5E0",
                        color: "#718096"
                    };
                    break;
            }

            tableRow.push(
                <Tr>
                    <Td>{proposalInfo.proposals[i].startBlockHeight}</Td>
                    <Td>{proposalInfo.proposals[i].id}</Td>
                    <Td>
                        <Box bg="#D9D9D9" width="100%" height="6px" borderRadius="5px">
                            <Flex width="100%" height="100%">
                                <Box width={agreeWidth} bg="#43CC9B" height="100%" borderRadius="5px 0 0 5px" />
                                <Box width={disagreeWidth} bg="#F16767" height="100%" />
                            </Flex>
                        </Box>
                    </Td>
                    <Td>
                        <Box borderRadius="50px" px="20px" py="10px" textAlign="center" display="inline-block" fontWeight="semibold" sx={theme} >
                            {status}
                        </Box>
                    </Td>
                </Tr >
            );
        };
        return tableRow;
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
                    {displayProposal()}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default ProposalCollection;
