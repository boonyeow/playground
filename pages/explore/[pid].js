import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    VStack,
} from "@chakra-ui/react";
import "../../styles/Home.module.css";
import Sidebar from "../../components/Sidebar";
import ExploreContent from "../../components/Explore/ExploreContent";
import PageHeader from "../../components/PageHeader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import FeaturedProject from "../../components/FeaturedProject";
import IconService from "icon-sdk-js";
import ICONexConnection from "../../util/interact";

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
        fundingGoal: 0,
        pricePerNFT: 0,
        startTimestamp: 0,
        endTimestamp: 0,
    });

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
                fundingGoal: IconConverter.toUtf8(res.fundingGoal),
                pricePerNFT: IconConverter.toUtf8(res.pricePerNFT),
                startTimestamp: IconConverter.toNumber(res.startTimestamp),
                endTimestamp: IconConverter.toNumber(res.endTimestamp),
            };
            setProjectInfo(pi);
        };

        if (router.isReady) {
            //fetch contract data
            fetchProjectInfo();
        }
    }, [router.isReady]);

    return (
        <>
            <Box maxWidth={"6xl"} width="100%" m="auto" h="150vh" pt="2.5vh">
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
                            <Box w="50%" h="100%">
                                <FeaturedProject
                                    src={projectInfo.thumbnailSrc}
                                    title={projectInfo.name}
                                    desc={projectInfo.description}
                                    price={`${projectInfo.pricePerNFT} ICX`}
                                    fundingGoal={projectInfo.fundingGoal}
                                    startTimestamp={projectInfo.startTimestamp}
                                    addr={pid}
                                    actionLabel="View Activity"
                                />
                            </Box>
                            <Box w="50%" h="100%" bg="blue">
                                hello
                            </Box>
                        </Flex>
                        <Flex width="50%" height="100%">
                            <Box width="100%" height="100%" bg="blue"></Box>
                            {/* minting dispenser */}
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ProjectDetail;
