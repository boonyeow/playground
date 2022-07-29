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


const GovernanceInfo = ({ proposalInfo, voterInfo, pid }) => {
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });

    useEffect(() => {
        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);
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
                            mt="10px"
                            borderRadius="15px"
                            p="30px"
                            border="1px solid #f1f1f1"
                        >
                            <Text>Top Addresses by Voting Power</Text>
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
                        <Text fontSize="20px" fontWeight="bold" paddingBottom="12px">Proposals</Text>
                        <ProposalCollection proposalInfo={proposalInfo} />
                        { }

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
