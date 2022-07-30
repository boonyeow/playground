import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    VStack,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Progress,
} from "@chakra-ui/react";
import { Greengrass } from "aws-sdk";
import FeaturedProject from "../FeaturedProject";
import Project from "../Project";
import ProposalCollection from "../ProposalCollection";
import OwnerList from "../OwnerList";
import { useEffect, useRef, useState } from "react";
import PageHeader from "../PageHeader";
import IconService from "icon-sdk-js";
import axios from "axios";
import ICONexConnection from "../../util/interact";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;


const GovernanceInfo = ({ proposalInfo, voterInfo, pid, totalFund, holders }) => {
    const connection = new ICONexConnection();

    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });

    const [isOwner, ownerCheck] = useState(false);

    useEffect(() => {
        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);

        const isOwner = async () => {
            // Retrieve record with userAddress from DynamoDB
            let res = await axios.get(
                `https://lisbon.tracker.solidwallet.io/v3/contract/info?addr=${pid}`
            );
            if (res.data.result == '200') {
                if (temp.userAddress == res.data.data.creator) {
                    ownerCheck(true)
                }
            }
        };
        isOwner();
    }, []);


    return (
        <>
            <Box width="100%" height="100%" ml="75px" p="1.5rem 3rem 3rem 3rem">
                <PageHeader
                    title="Governance"
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                />
                <Box w="100%" mt="15px">
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
                        >
                            <SimpleGrid columns="2" spacingX="25px">
                                <Box
                                    width="100%"
                                    borderRadius="15px"
                                    p="30px"
                                    border="1px solid #f1f1f1"
                                >
                                    <Text fontSize="20px" fontWeight="bold" paddingBottom="12px">Locked Funds</Text>
                                    <Text fontSize="30px">{totalFund.toLocaleString('en', { useGrouping: true })}  <span style={{ fontSize: "medium" }}>ICX</span> </Text>
                                </Box>
                                <Box
                                    width="100%"
                                    borderRadius="15px"
                                    p="30px"
                                    border="1px solid #f1f1f1"
                                >
                                    <Text fontSize="20px" fontWeight="bold" paddingBottom="12px">Holders</Text>
                                    <Text fontSize="30px">{Object.keys(voterInfo).length.toLocaleString('en', { useGrouping: true })}<span style={{ fontSize: "medium" }}> addresses</span> </Text>
                                </Box>
                            </SimpleGrid>

                            {/* <Text fontSize="20px" fontWeight="bold" paddingBottom="12px">Locked Funds</Text> */}
                            {/* <Text fontSize="30px">{totalFund.toLocaleString('en', { useGrouping: true })}  <span style={{ fontSize: "medium" }}>ICX</span> </Text> */}
                        </Box>

                    </SimpleGrid>
                    <Box
                        width="100%"
                        mt="25px"
                        borderRadius="15px"
                        p="30px"
                        border="1px solid #f1f1f1"
                        bg="white"
                    >
                        <Flex alignItems="center" justifyContent="space-between">
                            <Text fontSize="20px" fontWeight="bold" paddingBottom="12px">Proposals</Text>
                            {isOwner === true &&
                                <Button
                                    bg="transparent"
                                    color="#3D5CC3"
                                    _hover={{ bg: "blue.100", color: "#000000", }}
                                    onClick={() => { delegateVotes(voterContent.address) }}
                                >
                                    Create Proposal
                                </Button>
                            }
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
                        <Text fontSize="20px" fontWeight="bold" paddingBottom="12px">Voters by Voting Weight</Text>
                        <OwnerList voterInfo={voterInfo} userInfo={userInfo} pid={pid} />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default GovernanceInfo;
