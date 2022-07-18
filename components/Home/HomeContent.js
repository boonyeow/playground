import {
    Box,
    Text,
    HStack,
    VStack,
    Stack,
    Button,
    Heading,
    Flex,
    SimpleGrid,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { AddIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import SingleCollection from "../SingleCollection";
import FeaturedCollection from "../FeaturedCollection";

const HomeContent = () => {
    return (
        <>
            <Box width="100%" height="100%" ml="75px" p="1.5rem 3rem 3rem 3rem">
                <Flex alignItems="center" justifyContent="space-between">
                    <Text fontSize="4xl" fontWeight="bold">
                        Home
                    </Text>
                    <Button bg="primary" color="white">
                        Sign in
                    </Button>
                </Flex>

                <Box w="100%" mt="15px">
                    <Text color="gray.600" fontWeight="semibold">
                        Featured
                    </Text>
                    <SimpleGrid columns="2" spacingX="25px">
                        <Flex
                            mt="10px"
                            borderRadius="15px"
                            p="30px"
                            shadow="md"
                            bg="#0e0e0e"
                        >
                            <Box color="white">
                                <Flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
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
                                            src="/../public/unnamed.jpg"
                                            style={{ borderRadius: "50px" }}
                                        />
                                    </Box>
                                    <Button
                                        borderRadius="50px"
                                        color="black"
                                        fontSize="sm"
                                    >
                                        View Project
                                    </Button>
                                </Flex>
                                <Box alignSelf="center" mt="10px">
                                    <Text fontWeight="bold" fontSize="2xl">
                                        Project Name
                                    </Text>
                                    <Text color="#8e8e8e" mt="10px">
                                        Caduceus is the Metaverse protocol for
                                        decentralized edge rendering, an
                                        infrastructure-level open blockchain.
                                    </Text>
                                </Box>

                                <Box mt="15px">
                                    <Box
                                        bg="#1c1c1c"
                                        display="inline-flex"
                                        p="25px"
                                        borderRadius="15px"
                                    >
                                        <VStack mr="30px" spacing="0">
                                            <Text
                                                color="white"
                                                fontWeight="semibold"
                                                alignSelf="self-start"
                                                fontSize="sm"
                                            >
                                                Price per NFT
                                            </Text>
                                            <Text
                                                fontSize="lg"
                                                alignSelf="self-start"
                                                color="#8e8e8e"
                                            >
                                                150 ICX
                                            </Text>
                                        </VStack>
                                        <VStack mr="30px" spacing="0">
                                            <Text
                                                color="white"
                                                fontWeight="semibold"
                                                alignSelf="self-start"
                                                fontSize="sm"
                                            >
                                                Total supply
                                            </Text>
                                            <Text
                                                fontSize="lg"
                                                alignSelf="self-start"
                                                color="#8e8e8e"
                                            >
                                                20,000
                                            </Text>
                                        </VStack>
                                        <VStack mr="30px" spacing="0">
                                            <Text
                                                color="white"
                                                fontWeight="semibold"
                                                alignSelf="self-start"
                                                fontSize="sm"
                                            >
                                                Starts in
                                            </Text>
                                            <Text
                                                fontSize="lg"
                                                alignSelf="self-start"
                                                color="#8e8e8e"
                                            >
                                                15H 50m 59s
                                            </Text>
                                        </VStack>
                                    </Box>
                                </Box>
                            </Box>
                        </Flex>
                        <Box
                            width="100%"
                            mt="10px"
                            borderRadius="15px"
                            p="30px"
                            bg="linear-gradient(120deg, #f26688, #ff7878, #ff8f69, #ffa860, #ffc25e)"
                        >
                            <Box width="100%" textAlign="left">
                                <Text
                                    fontSize="6xl"
                                    color="white"
                                    fontWeight="bold"
                                    lineHeight="1"
                                >
                                    Kickstart your project now.
                                </Text>
                                <Text
                                    lineHeight="1"
                                    mt="25px"
                                    color="white"
                                    fontWeight="semibold"
                                >
                                    Launchpad is an NFT-based crowdfunding
                                    platform for entrepreneurs, developers &
                                    creatives.
                                </Text>
                                <Button
                                    mt="15px"
                                    borderRadius="25px"
                                    mr="15px"
                                    color="white"
                                    background="#ffffff33"
                                    _hover={{
                                        background: "#ffffffdb",
                                        color: "#ff7878",
                                    }}
                                >
                                    How does it work?
                                </Button>
                                <Button
                                    mt="15px"
                                    borderRadius="25px"
                                    color="white"
                                    background="#ffffff33"
                                    _hover={{
                                        background: "#ffffffdb",
                                        color: "#ff8f69",
                                    }}
                                >
                                    Apply for launch
                                </Button>
                            </Box>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box w="100%" mt="15px">
                    <Text color="gray.600" fontWeight="semibold">
                        Recently launched
                    </Text>
                    <SimpleGrid spacingX="25px" spacingY="25px" columns="3">
                        <Flex
                            mt="10px"
                            borderRadius="15px"
                            p="30px"
                            bg="gray.50"
                            border="1px solid var(--chakra-colors-blackAlpha-200);"
                        >
                            <Box color="white">
                                <Flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
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
                                            src="/../public/unnamed.jpg"
                                            style={{ borderRadius: "50px" }}
                                        />
                                    </Box>
                                    <Button
                                        borderRadius="50px"
                                        fontSize="sm"
                                        bg="black"
                                    >
                                        View Project
                                    </Button>
                                </Flex>
                                <Box alignSelf="center" mt="10px">
                                    <Text
                                        fontWeight="bold"
                                        fontSize="2xl"
                                        color="black"
                                    >
                                        Project Name
                                    </Text>
                                    <Text color="#686868" mt="10px">
                                        Caduceus is the Metaverse protocol for
                                        decentralized edge rendering, an
                                        infrastructure-level open blockchain.
                                    </Text>
                                </Box>
                            </Box>
                        </Flex>
                        <Flex
                            mt="10px"
                            borderRadius="15px"
                            p="30px"
                            bg="gray.50"
                            border="1px solid var(--chakra-colors-blackAlpha-200);"
                        >
                            <Box color="white">
                                <Flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
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
                                            src="/../public/unnamed.jpg"
                                            style={{ borderRadius: "50px" }}
                                        />
                                    </Box>
                                    <Button
                                        borderRadius="50px"
                                        fontSize="sm"
                                        bg="black"
                                    >
                                        View Project
                                    </Button>
                                </Flex>
                                <Box alignSelf="center" mt="10px">
                                    <Text
                                        fontWeight="bold"
                                        fontSize="2xl"
                                        color="black"
                                    >
                                        Project Name
                                    </Text>
                                    <Text color="#686868" mt="10px">
                                        Caduceus is the Metaverse protocol for
                                        decentralized edge rendering, an
                                        infrastructure-level open blockchain.
                                    </Text>
                                </Box>
                            </Box>
                        </Flex>
                        <Flex
                            mt="10px"
                            borderRadius="15px"
                            p="30px"
                            bg="gray.50"
                            border="1px solid var(--chakra-colors-blackAlpha-200);"
                        >
                            <Box color="white">
                                <Flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
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
                                            src="/../public/unnamed.jpg"
                                            style={{ borderRadius: "50px" }}
                                        />
                                    </Box>
                                    <Button
                                        borderRadius="50px"
                                        fontSize="sm"
                                        bg="black"
                                    >
                                        View Project
                                    </Button>
                                </Flex>
                                <Box alignSelf="center" mt="10px">
                                    <Text
                                        fontWeight="bold"
                                        fontSize="2xl"
                                        color="black"
                                    >
                                        Project Name
                                    </Text>
                                    <Text color="#686868" mt="10px">
                                        Caduceus is the Metaverse protocol for
                                        decentralized edge rendering, an
                                        infrastructure-level open blockchain.
                                    </Text>
                                </Box>
                            </Box>
                        </Flex>
                        <Flex
                            mt="10px"
                            borderRadius="15px"
                            p="30px"
                            bg="gray.50"
                            border="1px solid var(--chakra-colors-blackAlpha-200);"
                        >
                            <Box color="white">
                                <Flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
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
                                            src="/../public/unnamed.jpg"
                                            style={{ borderRadius: "50px" }}
                                        />
                                    </Box>
                                    <Button
                                        borderRadius="50px"
                                        fontSize="sm"
                                        bg="black"
                                    >
                                        View Project
                                    </Button>
                                </Flex>
                                <Box alignSelf="center" mt="10px">
                                    <Text
                                        fontWeight="bold"
                                        fontSize="2xl"
                                        color="black"
                                    >
                                        Project Name
                                    </Text>
                                    <Text color="#686868" mt="10px">
                                        Caduceus is the Metaverse protocol for
                                        decentralized edge rendering, an
                                        infrastructure-level open blockchain.
                                    </Text>
                                </Box>
                            </Box>
                        </Flex>
                        <Flex
                            mt="10px"
                            borderRadius="15px"
                            p="30px"
                            bg="gray.50"
                            border="1px solid var(--chakra-colors-blackAlpha-200);"
                        >
                            <Box color="white">
                                <Flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
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
                                            src="/../public/unnamed.jpg"
                                            style={{ borderRadius: "50px" }}
                                        />
                                    </Box>
                                    <Button
                                        borderRadius="50px"
                                        fontSize="sm"
                                        bg="black"
                                    >
                                        View Project
                                    </Button>
                                </Flex>
                                <Box alignSelf="center" mt="10px">
                                    <Text
                                        fontWeight="bold"
                                        fontSize="2xl"
                                        color="black"
                                    >
                                        Project Name
                                    </Text>
                                    <Text color="#686868" mt="10px">
                                        Caduceus is the Metaverse protocol for
                                        decentralized edge rendering, an
                                        infrastructure-level open blockchain.
                                    </Text>
                                </Box>
                            </Box>
                        </Flex>
                    </SimpleGrid>
                </Box>
            </Box>
        </>
    );
};

export default HomeContent;
