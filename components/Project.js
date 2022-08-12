import { Box, Text, Button, Flex, Center } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const Project = ({ src, title, desc, actionLabel, href, contractAddr }) => {
    //src = src == "" ? "/../../4.avif" : src; // to remove;
    return (
        <Flex
            mt="10px"
            borderRadius="15px"
            p="30px"
            bg="white"
            border="1px solid var(--chakra-colors-blackAlpha-200);"
            shadow="sm"
        >
            <Box color="white" width="100%">
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
                        {src == "" ? (
                            <Center>
                                <Jazzicon
                                    diameter={75}
                                    seed={jsNumberForAddress(contractAddr)}
                                />
                            </Center>
                        ) : (
                            <NextImage
                                layout="responsive"
                                objectFit="contain"
                                width="100%"
                                height="100%"
                                src={src}
                                style={{ borderRadius: "50px" }}
                            />
                        )}
                    </Box>
                    <NextLink href={href}>
                        <Button variant="action-button">{actionLabel}</Button>
                    </NextLink>
                </Flex>
                <Box alignSelf="center" mt="10px">
                    <Text fontWeight="bold" fontSize="2xl" color="black">
                        {title}
                    </Text>
                    <Text color="#686868" mt="10px" noOfLines={3}>
                        {desc}
                    </Text>
                </Box>
            </Box>
        </Flex>
    );
};
export default Project;
