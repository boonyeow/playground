import {
    Box,
    Flex,
    SimpleGrid,
    Text,
    Button,
    HStack,
    Skeleton,
    SkeletonText,
} from "@chakra-ui/react";
import Sidebar from "../../../components/Sidebar";
import { useRouter } from "next/router";
import NextLink from "next/link";
import IconService from "icon-sdk-js";
import ICONexConnection from "../../../util/interact";
import { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import { ChevronRightIcon } from "@chakra-ui/icons";
import FeaturedProject from "../../../components/FeaturedProject";
import axios from "axios";
import ProposalCollection from "../../../components/ProposalCollection";
import cfg from "../../../util/config";
import HolderList from "../../../components/HolderList";
import Footer from "../../../components/Footer";
import Withdrawal from "../../../components/Withdrawal";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const ProjectGovernance = () => {
    const router = useRouter();
    const { pid } = router.query;
    const connection = new ICONexConnection();

    const [isOwner, setIsOwner] = useState(false);
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });

    const [proposalInfo, setProposalInfo] = useState({});

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

    const [contractBalance, setContractBalance] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);

    const [voterInfo, setVoterInfo] = useState({});

    useEffect(() => {
        if (router.isReady) {
            const temp = localStorage.getItem("_persist");
            temp = temp == null ? userInfo : JSON.parse(temp);
            setUserInfo(temp);
            console.log("React 18 Application Re-Rendering");
            const getProposals = async () => {
                const call = new IconBuilder.CallBuilder()
                    .method("getAllProposalInfo")
                    .to(pid)
                    .build();
                let res = await connection.iconService.call(call).execute();
                setProposalInfo(res);
            };

            const getAllVoters = async () => {
                const call = new IconBuilder.CallBuilder()
                    .method("getAllVoters")
                    .to(pid)
                    .build();
                return await connection.iconService.call(call).execute();
            };

            const getContractBalance = async () => {
                return await connection.iconService.getBalance(pid).execute();
            };

            const fetchProjectInfo = async () => {
                const call = new IconBuilder.CallBuilder()
                    .from(null)
                    .to(pid)
                    .method("getProjectInfo")
                    .build();
                return await connection.iconService.call(call).execute();
            };

            const getTotalSupply = async () => {
                const call = new IconBuilder.CallBuilder()
                    .method("totalSupply")
                    .to(pid)
                    .build();
                let res = await connection.iconService.call(call).execute();
                setTotalSupply(res);
            };

            const checkOwner = async () => {
                // Retrieve record with userAddress from DynamoDB
                let res = await axios.get(
                    `https://lisbon.tracker.solidwallet.io/v3/contract/info?addr=${pid}`
                );
                if (res.data.result == "200") {
                    if (temp.userAddress == res.data.data.creator) {
                        setIsOwner(true);
                    }
                }
            };

            Promise.all([
                getAllVoters(),
                getContractBalance(),
                fetchProjectInfo(),
            ]).then((res) => {
                // setProposalInfo(res[0]);
                setVoterInfo(res[0]);
                setContractBalance(IconConverter.toNumber(res[1]));

                console.log("res[2]", res[2]);
                let pi = {
                    name: res[2].name,
                    thumbnailSrc: res[2].thumbnailSrc,
                    description: res[2].description,
                    details: res[2].details,
                    fundingGoal: IconConverter.toNumber(res[2].fundingGoal),
                    pricePerNFT: IconConverter.toNumber(res[2].pricePerNFT),
                    startTimestamp: IconConverter.toNumber(
                        res[2].startTimestamp
                    ),
                    endTimestamp: IconConverter.toNumber(res[2].endTimestamp),
                    withdrawalRate: IconConverter.toNumber(
                        res[2].withdrawalRate
                    ),
                };
                setProjectInfo(pi);
            });

            getProposals();
            checkOwner();
            getTotalSupply();
        }
    }, [router.isReady]);

    return (
        <>
            <Box
                maxWidth={"8xl"}
                width="100%"
                m="auto"
                minHeight="100vh"
                py="2.5vh"
            >
                <Sidebar active="Governance" />
                <Box
                    width="100%"
                    height="100%"
                    ml="75px"
                    p="1.5rem 3rem 3rem 3rem"
                >
                    <PageHeader
                        title="Governance"
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                    />
                    <Box w="100%" mt="15px">
                        <Flex>
                            <NextLink href="/governance" color="gray.600">
                                Explore DAOs
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
                                    contractBalance={contractBalance}
                                    isGovernance={true}
                                />
                                <Withdrawal
                                    projectInfo={projectInfo}
                                    contractBalance={contractBalance}
                                ></Withdrawal>
                            </SimpleGrid>
                        </Flex>
                        <Box
                            width="100%"
                            mt="25px"
                            borderRadius="15px"
                            p="30px"
                            border="1px solid #f1f1f1"
                            bg="white"
                        >
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Text
                                    fontSize="20px"
                                    fontWeight="bold"
                                    paddingBottom="12px"
                                >
                                    Proposals
                                </Text>

                                {/* <Button onClick={test}> createetest</Button> */}
                                {isOwner === true && (
                                    <NextLink href={`${pid}/create`}>
                                        <Button
                                            bg="transparent"
                                            color="#3D5CC3"
                                            _hover={{
                                                bg: "blue.100",
                                                color: "#000000",
                                            }}
                                        >
                                            Create Proposal
                                        </Button>
                                    </NextLink>
                                )}
                            </Flex>
                            <ProposalCollection
                                proposalInfo={proposalInfo}
                                pid={pid}
                                userInfo={userInfo}
                            />
                        </Box>
                        <Box
                            width="100%"
                            mt="25px"
                            borderRadius="15px"
                            p="30px"
                            border="1px solid #f1f1f1"
                            bg="white"
                        >
                            <Text
                                fontSize="20px"
                                fontWeight="bold"
                                paddingBottom="12px"
                            >
                                Leaderboard
                            </Text>
                            <HolderList
                                voterInfo={voterInfo}
                                userInfo={userInfo}
                                pid={pid}
                                totalSupply={totalSupply}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default ProjectGovernance;
