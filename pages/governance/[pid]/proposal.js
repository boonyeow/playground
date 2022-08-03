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
    Tr,
    Th,
    Td,
    TableContainer,
    Icon,
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    Textarea,
    NumberInput,
    NumberInputField,
    VisuallyHiddenInput,
} from "@chakra-ui/react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import PageHeader from "../../../components/PageHeader";
import { useEffect, useState } from "react";
import NextLink from 'next/link';
import { ChevronRightIcon } from "@chakra-ui/icons";

const createProposal = () => {
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });
    const [proposalId, setProposalId] = useState("");
    useEffect(() => {
        setProposalId(localStorage.getItem("lastEvent"));
        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);
    }, []);

    return (
        <Box
            maxWidth={"6xl"}
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
                    title="Create Proposal"
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                />
                <Box w="100%" mt="15px">
                    <Flex>
                        <NextLink href="/governance" color="gray.600">
                            Governance
                        </NextLink>
                        <ChevronRightIcon alignSelf="center" mx="10px" />
                        <NextLink href={`/governance/${proposalId}`} color="gray.600">
                            {proposalId}
                        </NextLink>
                        <ChevronRightIcon alignSelf="center" mx="10px" />
                        <Text color="gray.600" fontWeight="semibold">
                            Create Proposal
                        </Text>
                    </Flex>
                    <Box mt="25px">

                    </Box>
                </Box>
            </Box>
        </Box >
    );
};

export default createProposal;
