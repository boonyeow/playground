import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    HStack,
    Input,
    SimpleGrid,
    Text,
    useNumberInput,
    VStack,
} from "@chakra-ui/react";
import "../../styles/Home.module.css";
import Sidebar from "../../components/Sidebar";
import PageHeader from "../../components/PageHeader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import IconService from "icon-sdk-js";
import ICONexConnection from "../../util/interact";
import Dispenser from "../../components/Dispenser";
import dynamic from "next/dynamic";
import Footer from "../../components/Footer";
import SingleListing from "../../components/SingleListing";

const FeaturedProject = dynamic(
    () => import("../../components/FeaturedProject"),
    {
        ssr: false,
    }
);

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const ProjectDetail = () => {
    const connection = new ICONexConnection();
    const router = useRouter();
    const { pid } = router.query;
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });

    const [projectInfo, setProjectInfo] = useState({
        name: "",
        thumbnailSrc: "",
        description: "",
        details: "",
        fundingGoal: "",
        pricePerNFT: "",
        startTimestamp: "",
        endTimestamp: "",
    });

    const [totalSupply, setTotalSupply] = useState(0);

    useEffect(() => {
        const fetchProjectInfo = async () => {
            const call = new IconBuilder.CallBuilder()
                .from(null)
                .to(pid)
                .method("getProjectInfo")
                .build();
            let res = await connection.iconService.call(call).execute();
            console.log("res", res);
            let pi = {
                name: res.name,
                thumbnailSrc: res.thumbnailSrc,
                description: res.description,
                details: res.details,
                fundingGoal: IconConverter.toNumber(res.fundingGoal),
                pricePerNFT: IconConverter.toNumber(res.pricePerNFT),
                startTimestamp: IconConverter.toNumber(res.startTimestamp),
                endTimestamp: IconConverter.toNumber(res.endTimestamp),
            };
            setProjectInfo(pi);
        };

        const getTotalSupply = async () => {
            const call = new IconBuilder.CallBuilder()
                .from(null)
                .to(pid)
                .method("totalSupply")
                .build();
            let res = await connection.iconService.call(call).execute();
            setTotalSupply(IconConverter.toNumber(res));
        };

        if (router.isReady) {
            //fetch contract data
            fetchProjectInfo();
            getTotalSupply();
            const temp = localStorage.getItem("_persist");
            temp = temp == null ? userInfo : JSON.parse(temp);
            setUserInfo(temp);
        }
    }, [router.isReady]);

    return (
        <>
            <Box maxWidth={"8xl"} width="100%" m="auto" h="150vh" pt="2.5vh">
                <Sidebar active="Explore" />
                <Box w="100%" h="100%" ml="75px" p="1.5rem 3rem 3rem 3rem">
                    <PageHeader
                        title="About project"
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                    />
                    <Box w="100%" mt="15px">
                        <Flex>
                            <NextLink href="/explore" color="gray.600">
                                Explore
                            </NextLink>
                            <ChevronRightIcon alignSelf="center" mx="10px" />
                            <Text color="gray.600" fontWeight="semibold">
                                {pid}
                            </Text>
                        </Flex>
                        <Flex width="100%" mt="25px">
                            <SimpleGrid
                                columns="2"
                                spacingX="25px"
                                width="100%"
                            >
                                <FeaturedProject
                                    projectInfo={projectInfo}
                                    addr={pid}
                                    actionLabel="View Activity"
                                    isGovernance={false}
                                />
                                <Dispenser
                                    projectInfo={projectInfo}
                                    pid={pid}
                                    setTotalSupply={setTotalSupply}
                                />
                            </SimpleGrid>
                        </Flex>

                        <Box mt="25px">
                            <Text fontWeight="semibold">Gallery</Text>

                            <Grid
                                templateColumns="repeat(5, 1fr)"
                                templateRows="repeat(2, 1fr)"
                                gap="25px"
                                mt="15px"
                            >
                                {[...Array(totalSupply)].map((current, i) => (
                                    <SingleListing
                                        title={`${projectInfo.name} - ${i}`}
                                        seed={pid}
                                    ></SingleListing>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default ProjectDetail;
