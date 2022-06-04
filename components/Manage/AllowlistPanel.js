import { Search2Icon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Table,
    TableCaption,
    TableContainer,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Tfoot,
    Text,
    Flex,
    Select,
    Input,
    InputGroup,
    InputLeftElement,
    FormControl,
    FormLabel,
    Switch,
} from "@chakra-ui/react";

const AllowlistPanel = () => {
    return (
        <Box px="5">
            <Text fontSize="lg" fontWeight="bold" color="#3d3d3d" mb={2}>
                Registered users
            </Text>
            <Flex justifyContent={"space-between"} py="2">
                <InputGroup>
                    <InputLeftElement
                        children={<Search2Icon color="gray.500" />}
                    />
                    <Input width="auto" placeholder="Search address" />
                </InputGroup>
                <FormControl
                    display="flex"
                    alignItems="center"
                    justifyContent={"end"}
                >
                    <FormLabel mb="0">Toggle allowlist</FormLabel>
                    <Switch></Switch>
                </FormControl>
            </Flex>
            <TableContainer mt="3">
                <Table variant="simple">
                    <Thead bgColor="gray.50">
                        <Tr>
                            <Th width="30%">Date</Th>
                            <Th>Address</Th>
                            <Th>Phase</Th>
                        </Tr>
                    </Thead>
                    <Tbody fontSize="sm">
                        <Tr>
                            <Td>December 23, 2021 2:35 AM</Td>
                            <Td>hxbd1375315c7732779edaa4c3903ffc9b93e82ca3</Td>
                            <Td>1</Td>
                        </Tr>
                        <Tr>
                            <Td>December 23, 2021 2:35 AM</Td>
                            <Td>hxbd1375315c7732779edaa4c3903ffc9b93e82ca3</Td>
                            <Td>1</Td>
                        </Tr>
                        <Tr>
                            <Td>December 23, 2021 2:35 AM</Td>
                            <Td>hxbd1375315c7732779edaa4c3903ffc9b93e82ca3</Td>
                            <Td>1</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AllowlistPanel;
