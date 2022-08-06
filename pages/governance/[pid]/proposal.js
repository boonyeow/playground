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
    Select,
} from "@chakra-ui/react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import PageHeader from "../../../components/PageHeader";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import DatePicker from "../../../components/DatePicker";
import TapProposal from "../../../components/TapProposal";
import RefundProposal from "../../../components/RefundProposal";



const createProposal = () => {
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });
    const [proposalId, setProposalId] = useState("");
    const [iam, setIAM] = useState("contributor");
    const [proposaltype, setProposaltype] = useState("tap");
    const [tapVisible, setTapVisible] = useState(true);
    const [refundVisible, setRefundVisible] = useState(false);


    useEffect(() => {
        setProposalId(localStorage.getItem("lastEvent"));
        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);

    }, []);

    useEffect(() => {
        for (const project of userInfo.projectsDeployed) {
            console.log(project)
            if (proposalId == project.contractAddress) {
                setIAM("Owner")
            }
        }
        console.log(iam)
    }, [userInfo]);

    useEffect(() => {
        proposaltype == "tap"
            ? setTapVisible(true)
            : setTapVisible(false);
        proposaltype == "refund" ? setRefundVisible(true) : setRefundVisible(false);

    }, [proposaltype]);

    const handleOnChange = (e) => {
        setProposaltype(e.target.value);
    }

    return (
        <Box maxWidth={"6xl"} width="100%" m="auto" minHeight="100vh" py="2.5vh">
            <Sidebar active="Governance" />
            <Box width="100%" height="100%" ml="75px" p="1.5rem 3rem 3rem 3rem">
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

                    <Box mt="20px">
                        <Flex>
                            <Box
                                width="100%"
                                maxWidth="calc(100% / 3 * 2 - 12.5px)"
                                mr="25px"
                            >
                                <FormControl mt="25px">
                                    <FormLabel>Proposal Type</FormLabel>
                                    {iam === "Owner" ? (
                                        <Select value={proposaltype} onChange={handleOnChange}>
                                            <option selected value='tap'>Increase / Decrease Tap Rate</option>
                                        </Select>
                                    ) : (<Select value={proposaltype} onChange={handleOnChange}>
                                        <option value='refund'>Refund</option>
                                        <option selected value='tap'>Increase / Decrease Tap Rate</option>
                                    </Select>)}

                                    <FormHelperText>
                                        Please select a proposal type.
                                    </FormHelperText>
                                </FormControl>
                                {tapVisible && <TapProposal />}
                                {refundVisible && <RefundProposal />}
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default createProposal;
