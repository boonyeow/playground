import { Box, Flex, SimpleGrid, Text, Button, HStack } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/router";
import NextLink from "next/link";
import IconService from "icon-sdk-js";
import ICONexConnection from "../../util/interact";
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { ChevronRightIcon } from "@chakra-ui/icons";
import FeaturedProject from "../../components/FeaturedProject";
import axios from "axios";
import ProposalCollection from "../../components/ProposalCollection";
import OwnerList from "../../components/OwnerList";

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

    const [proposalInfo, setProposalInfo] = useState({
        proposals: [
            {
                id: "-",
                startBlockHeight: 0,
                status: 0,
                disagreeVotes: 0,
                agreeVotes: 0,
                noVotes: 0,
            },
        ],
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

    const [fund, setFund] = useState(0);

    const [voterInfo, setVoterInfo] = useState({});
    useEffect(() => {
        if (router.isReady) {
            const getProposals = async () => {
                const txObj = new IconBuilder.CallBuilder()
                    .method("getProposals")
                    .to(pid)
                    .build();
                const proposals = await connection.iconService
                    .call(txObj)
                    .execute();
                setProposalInfo(proposals);
            };

            const getAllVoters = async () => {
                const txObj = new IconBuilder.CallBuilder()
                    .method("getAllVoters")
                    .to(pid)
                    .build();
                const voters = await connection.iconService
                    .call(txObj)
                    .execute();
                setVoterInfo(voters);
            };

            const getContractBalance = async () => {
                const balance = await connection.iconService
                    .getBalance(pid)
                    .execute();
                setFund(IconConverter.toNumber(balance));
            };

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

            getProposals();
            getAllVoters();
            getContractBalance();
            fetchProjectInfo();
            checkOwner();
            const temp = localStorage.getItem("_persist");
            temp = temp == null ? userInfo : JSON.parse(temp);
            setUserInfo(temp);
        }
    }, [router.isReady]);

    const delegateVotes = () => {};

    return (
        <>
            <Box maxWidth={"6xl"} width="100%" m="auto" h="150vh" pt="2.5vh">
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
                                Governance
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
                                    isGovernance={true}
                                />
                                <HStack spacing="25px">
                                    <Box
                                        w="100%"
                                        height="100%"
                                        bg="black"
                                        borderRadius="15px"
                                        p="30px"
                                    >
                                        <Text
                                            color="white"
                                            fontSize="sm"
                                            fontWeight="semibold"
                                        >
                                            Locked Balance
                                        </Text>
                                        <Text
                                            lineHeight="1.2"
                                            color="white"
                                            fontWeight="bold"
                                            fontSize="4xl"
                                            noOfLines={1}
                                        >
                                            {fund / 10 ** 18} ICX
                                        </Text>

                                        <Text
                                            color="white"
                                            fontSize="sm"
                                            fontWeight="semibold"
                                        >
                                            Holders
                                        </Text>
                                    </Box>
                                    <Box
                                        w="100%"
                                        height="100%"
                                        bg="black"
                                        borderRadius="15px"
                                        p="30px"
                                    ></Box>
                                </HStack>
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
                                {isOwner === true && (
                                    <Button
                                        bg="transparent"
                                        color="#3D5CC3"
                                        _hover={{
                                            bg: "blue.100",
                                            color: "#000000",
                                        }}
                                        onClick={() => {
                                            console.log("hello");
                                        }}
                                    >
                                        Create Proposal
                                    </Button>
                                )}
                            </Flex>
                            <ProposalCollection proposalInfo={proposalInfo} />
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
                                Voters
                            </Text>
                            <OwnerList
                                voterInfo={voterInfo}
                                userInfo={userInfo}
                                pid={pid}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ProjectGovernance;
