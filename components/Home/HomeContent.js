import { Box, Text, Button, SimpleGrid } from "@chakra-ui/react";
import Project from "../Project";
import PageHeader from "../PageHeader";
import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const FeaturedProject = dynamic(
    () => import("../../components/FeaturedProject"),
    {
        ssr: false,
    }
);

const HomeContent = () => {
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });

    useEffect(() => {
        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);
    }, []);

    const projectInfo = {
        name: "Hello",
        thumbnailSrc: "/../public/unnamed.jpg",
        description: "Hello",
        details: "",
        fundingGoal: "100",
        pricePerNFT: "5",
        startTimestamp: "",
        endTimestamp: "",
    };
    return (
        <>
            <Box width="100%" height="100%" ml="75px" p="1.5rem 3rem 3rem 3rem">
                <PageHeader
                    title="Home"
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                />
                <Box w="100%" mt="15px">
                    <Text color="gray.600" fontWeight="semibold">
                        Featured
                    </Text>
                    <SimpleGrid
                        columns="2"
                        spacingX="25px"
                        mt="10px"
                        width="100%"
                    >
                        <FeaturedProject
                            projectInfo={projectInfo}
                            addr="cx67deb13f90599e44068b1478edf9ab824f785e99"
                            actionLabel="View Details"
                            // src="/../public/unnamed.jpg"
                            // title="Project Name"
                            // desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"
                            // price="100 ICX"
                            // fundingGoal="20,000 ICX"
                            // launchTimestamp="18 July 2022"
                        />

                        <Box
                            width="100%"
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
                        <Project
                            title="Project Name"
                            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"
                            src="/../public/unnamed.jpg"
                            actionLabel="View Project"
                        />
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
