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
    const [delegate, setDelegate] = useState(null);
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
                    .method("getAllProposals")
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

            const getDelegate = async () => {
                const call = new IconBuilder.CallBuilder()
                    .method("getDelegate")
                    .to(pid)
                    .params({ user: temp.userAddress })
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
                getDelegate(),
            ]).then((res) => {
                // setProposalInfo(res[0]);
                setVoterInfo(res[0]);
                setContractBalance(IconConverter.toNumber(res[1]));

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
                };
                setProjectInfo(pi);
                setDelegate(res[3]);
            });

            getProposals();
            checkOwner();
            getDelegate();
            getTotalSupply();
        }
    }, [router.isReady]);

    const test = async () => {
        const txObj = new IconBuilder.CallTransactionBuilder()
            .from(userInfo.userAddress)
            .to(pid)
            .nid(cfg.NID)
            .nonce(IconConverter.toBigNumber(1))
            .version(IconConverter.toBigNumber(3))
            .timestamp(new Date().getTime() * 1000)
            .method("createProposal")
            .params({
                startBlockHeight: IconConverter.toHexNumber(1000),
            })
            .build();
        const estimatedSteps = IconConverter.toBigNumber(
            await connection.debugService.estimateStep(txObj).execute()
        );
        console.log("estimatedSteps", estimatedSteps);

        txObj.stepLimit = IconService.IconConverter.toHex(
            estimatedSteps.plus(IconConverter.toBigNumber(10000)) // prevent out of step
        );

        const payload = {
            jsonrpc: "2.0",
            method: "icx_sendTransaction",
            id: 6639,
            params: IconConverter.toRawTransaction(txObj),
        };

        let rpcResponse = await connection.ICONexRequest(
            "REQUEST_JSON-RPC",
            payload
        );
        console.log(rpcResponse);
    };

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
                                        {contractBalance}
                                    </Box>
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
                                {/* {isOwner === false && ( // need edit */}
                                <NextLink href={`${pid}/proposal`}>
                                    <Button
                                        bg="transparent"
                                        color="#3D5CC3"
                                        _hover={{
                                            bg: "blue.100",
                                            color: "#000000",
                                        }}
                                        onClick={() => {
                                            localStorage.setItem(
                                                "lastEvent",
                                                pid
                                            );
                                        }}
                                    >
                                        Create Proposal
                                    </Button>
                                </NextLink>
                                <Button onClick={test}> createetest</Button>
                                {isOwner === true && (
                                    <NextLink href={`${pid}/proposal`}>
                                        <Button
                                            bg="transparent"
                                            color="#3D5CC3"
                                            _hover={{
                                                bg: "blue.100",
                                                color: "#000000",
                                            }}
                                            onClick={() => {
                                                localStorage.setItem(
                                                    "lastEvent",
                                                    pid
                                                );
                                            }}
                                        >
                                            Create Proposal
                                        </Button>
                                    </NextLink>
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
                                Holders
                            </Text>
                            <HolderList
                                voterInfo={voterInfo}
                                userInfo={userInfo}
                                pid={pid}
                                delegate={delegate}
                                totalSupply={totalSupply}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ProjectGovernance;
