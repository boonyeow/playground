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
import SingleCollection from "../SingleCollection";
import FeaturedProject from "../FeaturedProject";
import Project from "../Project";

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
                        <FeaturedProject
                            src="/../public/unnamed.jpg"
                            title="Project Name"
                            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"
                            price="100 ICX"
                            fundingRequested="20,000 ICX"
                            launchTimestamp="18 July 2022"
                        />

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
                        <Project
                            title="Project Name"
                            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"
                            src="/../public/unnamed.jpg"
                            actionLabel="View Project"
                        />
                    </SimpleGrid>
                </Box>
            </Box>
        </>
    );
};

export default HomeContent;
