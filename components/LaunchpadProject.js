import { Box, Text, VStack, Button, Flex, Center } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
const LaunchpadProject = ({ src, title, desc, actionLabel, addr }) => {
    // if (src == "") {
    //     src = "/../public/4.avif";
    // }
    return (
        <Flex
            mt="10px"
            borderRadius="15px"
            p="30px"
            bg="white"
            border="1px solid var(--chakra-colors-blackAlpha-200);"
        >
            <Box color="white" width="100%">
                <Flex justifyContent="space-between" alignItems="center">
                    <Box
                        minWidth="75px"
                        width="75px"
                        height="75px"
                        bg="#272727"
                        mr="30px"
                        borderRadius={"50px"}
                    >
                        {
                            src == "" ?
                            <Center>
                                <Jazzicon diameter={75} seed={jsNumberForAddress(contractAdd)} />
                            </Center>
                            :
                            <NextImage
                                layout="responsive"
                                objectFit="contain"
                                width="100%"
                                height="100%"
                                src={src}
                                style={{ borderRadius: "50px" }}
                            />
                        }
                        {/* <NextImage
                            layout="responsive"
                            objectFit="contain"
                            width="100%"
                            height="100%"
                            src={src}
                            style={{ borderRadius: "50px" }}
                        /> */}
                    </Box>
                    <NextLink href={`/launchpad/${addr}`}>
                        <Button variant="action-button">{actionLabel}</Button>
                    </NextLink>
                </Flex>
                <Box alignSelf="center" mt="10px">
                    <Text
                        fontWeight="semibold"
                        fontSize="xl"
                        color="black"
                        noOfLines={1}
                    >
                        {title}
                    </Text>
                    <Text
                        color="#686868"
                        mt="0"
                        lineHeight="1.2"
                        fontFamily="mono"
                        noOfLines={1}
                    >
                        {addr}
                    </Text>
                </Box>
            </Box>
        </Flex>
    );
};
export default LaunchpadProject;
