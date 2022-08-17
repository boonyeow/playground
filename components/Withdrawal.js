import {
    Box,
    Button,
    Flex,
    FormLabel,
    HStack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { PieChart } from "react-minimal-pie-chart";

const AdditionalInfo = ({ title, color }) => {
    return (
        <VStack mr="30px" spacing="0">
            <Flex alignItems="center">
                <Box
                    w="10px"
                    h="10px"
                    bg={color}
                    mr="10px"
                    borderRadius="2px"
                ></Box>
                <Text
                    color="black"
                    fontWeight="semibold"
                    alignSelf="self-start"
                    fontSize="sm"
                >
                    {title}
                </Text>
            </Flex>
        </VStack>
    );
};

const Withdrawal = ({ projectInfo, contractBalance }) => {
    return (
        <Box
            borderRadius="15px"
            p="30px"
            bg="white"
            border="1px solid var(--chakra-colors-blackAlpha-50);"
            shadow="sm"
            display="inline-block"
            w="100%"
            minHeight="300px"
        >
            <Text fontWeight="bold" fontSize="2xl">
                Treasury
            </Text>

            <Box mt="25px">
                <Box px="25px">
                    <Flex>
                        <Text fontWeight="semibold" color="#8e8e8e">
                            Project Balance
                        </Text>
                    </Flex>
                    <VStack>
                        <Box
                            w="100%"
                            h="15px"
                            bg="gray.100"
                            borderRadius="25px"
                            mt="10px"
                        >
                            <Box
                                w="50%"
                                h="15px"
                                bg="black"
                                borderRadius="25px"
                            ></Box>
                        </Box>
                        <Flex
                            mt="10px"
                            fontSize="sm"
                            fontWeight="semibold"
                            color="#8e8e8e"
                            w="100%"
                            justifyContent="space-between"
                        >
                            <Text>50 ICX</Text>
                            <Text>50 ICX</Text>
                        </Flex>
                    </VStack>
                </Box>
                <Flex p="5px" borderRadius="15px" justifyContent={"center"}>
                    <AdditionalInfo
                        title="Unlocked Balance"
                        value="50 ICX"
                        color="black"
                    />
                    <AdditionalInfo
                        title="Locked Balance"
                        value="50 ICX"
                        color="gray.100"
                    />
                </Flex>
            </Box>
        </Box>
    );
};
export default Withdrawal;
