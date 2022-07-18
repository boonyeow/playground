import { Box, Text, VStack, Button, Flex } from "@chakra-ui/react";
import NextImage from "next/image";
const LaunchpadProject = ({ src, title, desc, actionLabel, addr }) => {
    return (
        <Flex
            mt="10px"
            borderRadius="15px"
            p="30px"
            bg="gray.50"
            border="1px solid var(--chakra-colors-blackAlpha-200);"
        >
            <Box color="white">
                <Flex justifyContent="space-between" alignItems="center">
                    <Box
                        minWidth="75px"
                        width="75px"
                        height="75px"
                        bg="#272727"
                        mr="30px"
                        // p="2px"
                        borderRadius={"50px"}
                    >
                        <NextImage
                            layout="responsive"
                            objectFit="contain"
                            width="100%"
                            height="100%"
                            src={src}
                            style={{ borderRadius: "50px" }}
                        />
                    </Box>
                    <VStack align='left' spacing="5px">
                        <Text fontWeight="semibold" fontSize="xl" color="black" mt="0" noOfLines={1}>
                            {title}
                        </Text>
                        <Text color="#686868" mt="0" lineHeight="1">
                            {addr}
                        </Text>
                    </VStack>
                </Flex>
            </Box>
        </Flex>
    );
};
export default LaunchpadProject;
