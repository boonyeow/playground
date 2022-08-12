import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text,
    useRadioGroup,
    useRadio,
    HStack,
    Icon,
    VStack,
} from "@chakra-ui/react";
import Sidebar from "../../../components/Sidebar";
import PageHeader from "../../../components/PageHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { TiTick, TiTimes } from "react-icons/ti";
import IconService from "icon-sdk-js";
import ICONexConnection, { sleep } from "../../../util/interact";
import cfg from "../../../util/config";
import CustomAlert from "../../../components/CustomAlert";
const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const RadioCard = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();
    return (
        <Box as="label" w="100%">
            <input {...input} />
            <Flex
                {...checkbox}
                cursor="pointer"
                borderRadius="15px"
                _checked={{
                    // bg: "#1e86ff",
                    color: "white",
                    fontWeight: "bold",
                    border: "1px solid #c3c3c3",
                }}
                px={5}
                py={3}
                fontSize="sm"
                textAlign="center"
                color="#8e8e8e"
                bg="#1c1c1c"
                justifyContent="center"
            >
                {input.value == "Approve" ? (
                    <Icon as={TiTick} alignSelf="center" mr="5px" />
                ) : (
                    <Icon as={TiTimes} alignSelf="center" mr="5px" />
                )}
                <Text>{props.children}</Text>
            </Flex>
        </Box>
    );
};

const ProposalDetail = () => {
    const connection = new ICONexConnection();
    const router = useRouter();
    const { pid, proposalID } = router.query;
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });

    const [proposalInfo, setProposalInfo] = useState({});
    const [voteChoice, setVoteChoice] = useState(null);

    const [showStatus, setShowStatus] = useState(false);
    const [statusInfo, setStatusInfo] = useState({
        type: "loading",
        title: "submitting vote",
        desc: "awaiting tx approval...",
    });
    const [showClose, setShowClose] = useState(true);

    const options = ["Approve", "Reject"];
    const { getRootProps, getRadioProps } = useRadioGroup({
        onChange: (v) => {
            if (v === "Approve") {
                setVoteChoice(1);
            } else if (v == "Reject") {
                setVoteChoice(0);
            }
        },
    });

    const group = getRootProps();

    useEffect(() => {
        const getProposalInfo = async (proposalID) => {
            const call = new IconBuilder.CallBuilder()
                .from(null)
                .to(pid)
                .method("getProposalInfo")
                .params({ id: IconConverter.toHexNumber(proposalID) })
                .build();
            let res = await connection.iconService.call(call).execute();
            console.log("inenr", res);
            setProposalInfo(res);
        };

        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);

        if (router.isReady) {
            getProposalInfo(proposalID);
        }
    }, [router.isReady]);

    const formatTimestamp = (timestamp) => {
        return new Date((timestamp / 1e6) * 1000).toUTCString();
    };

    const getEstimatedEnd = (proposalInfo) => {
        let startBlockHeight = IconConverter.toNumber(
            proposalInfo.info.startBlockHeight
        );
        let endBlockHeight = IconConverter.toNumber(
            proposalInfo.info.endBlockHeight
        );
        let diff = (endBlockHeight - startBlockHeight) * 2;
        return new Date(
            (IconConverter.toNumber(proposalInfo.info.startTimestamp) / 1e6 +
                diff) *
                1000
        ).toUTCString();
    };

    const submitVote = async () => {
        setShowStatus(true);
        const txObj = new IconBuilder.CallTransactionBuilder()
            .from(userInfo.userAddress)
            .to(pid)
            .nid(cfg.NID)
            .nonce(IconConverter.toBigNumber(1))
            .version(IconConverter.toBigNumber(3))
            .timestamp(new Date().getTime() * 1000)
            .method("voteProposal")
            .params({
                id: IconConverter.toHexNumber(proposalID),
                voteChoice: IconConverter.toHexNumber(voteChoice),
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

        getTransactionResult(rpcResponse, 5);
    };

    const getTransactionResult = async (rpcResponse, maxRetry) => {
        console.log("trying...", maxRetry);
        if (rpcResponse.error) {
            setShowClose(true);
            setStatusInfo({
                type: "failure",
                title: "ooops",
                desc: "your transaction was not approved",
            });
        } else {
            try {
                const txResult = await connection.iconService
                    .getTransactionResult(rpcResponse.result)
                    .execute();
                if (txResult.status === 1) {
                    setShowClose(true);
                    setStatusInfo({
                        type: "success",
                        title: "success",
                        desc: "your vote has been submitted!",
                    });
                } else {
                    console.log("FAILED BOI", txResult);
                    setShowClose(true);
                    setStatusInfo({
                        type: "failure",
                        title: "ooops",
                        desc: "your transaction has failed, please try again",
                    });
                }
            } catch (err) {
                if (maxRetry > 0) {
                    setTimeout(
                        () => getTransactionResult(rpcResponse, maxRetry - 1),
                        2200
                    );
                } else {
                    console.log(err);
                    setShowClose(true);
                    setStatusInfo({
                        type: "failure",
                        title: "ooops",
                        desc: "your transaction has failed, please try again",
                    });
                }
            }
        }
    };

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
                            <NextLink
                                href={`/governance/${pid}`}
                                color="gray.600"
                            >
                                {router.isReady ? pid : ""}
                            </NextLink>
                            <ChevronRightIcon alignSelf="center" mx="10px" />
                            <Text color="gray.600" fontWeight="semibold">
                                View Proposal
                            </Text>
                        </Flex>

                        <Flex>
                            <Box
                                width="100%"
                                maxWidth="calc(100% / 3 * 2 - 12.5px)"
                                mr="25px"
                                mt="25px"
                            >
                                <Box
                                    borderRadius="15px"
                                    p="50px"
                                    shadow="md"
                                    bg="#0e0e0e"
                                    w="100%"
                                >
                                    <Box color="white" w="100%">
                                        <Flex justifyContent={"space-between"}>
                                            <Box>
                                                <Text
                                                    fontWeight="bold"
                                                    fontSize="3xl"
                                                    mt="10px"
                                                >
                                                    {Object.keys(proposalInfo)
                                                        .length > 0 &&
                                                        proposalInfo.info.title}
                                                </Text>
                                                <Flex
                                                    fontFamily="mono"
                                                    lineHeight={1}
                                                    color="#686868"
                                                >
                                                    <Text>proposed by</Text>
                                                    &nbsp;
                                                    <NextLink
                                                        href={"google.com"}
                                                    >
                                                        <Link color="#1e86ff">
                                                            {Object.keys(
                                                                proposalInfo
                                                            ).length > 0 &&
                                                                proposalInfo
                                                                    .info
                                                                    .proposer}
                                                        </Link>
                                                    </NextLink>
                                                </Flex>
                                            </Box>
                                            {Object.keys(proposalInfo).length >
                                                0 &&
                                                proposalInfo.info
                                                    .discussion && (
                                                    <Box
                                                        textAlign="right"
                                                        alignSelf="center"
                                                    >
                                                        <NextLink
                                                            href={
                                                                proposalInfo
                                                                    .info
                                                                    .discussion
                                                            }
                                                        >
                                                            <Button
                                                                borderRadius="50px"
                                                                color="black"
                                                                fontSize="sm"
                                                            >
                                                                View Discussion
                                                            </Button>
                                                        </NextLink>
                                                    </Box>
                                                )}
                                        </Flex>

                                        <Text color="#8e8e8e" mt="25px">
                                            {Object.keys(proposalInfo).length >
                                                0 &&
                                                proposalInfo.info.description}
                                        </Text>
                                        <Text textAlign="center">See more</Text>

                                        <Box
                                            borderRadius="15px"
                                            mt="25px"
                                            w="500px"
                                        >
                                            <Text
                                                fontWeight={"bold"}
                                                fontSize="2xl"
                                            >
                                                Additional Information
                                            </Text>
                                            <Box>
                                                <Flex justifyContent="space-between">
                                                    <Text
                                                        color="#c7c7c7"
                                                        fontWeight="semibold"
                                                    >
                                                        Start Timestamp
                                                    </Text>
                                                    <Text color="#8e8e8e">
                                                        {Object.keys(
                                                            proposalInfo
                                                        ).length > 0 &&
                                                            formatTimestamp(
                                                                proposalInfo
                                                                    .info
                                                                    .startTimestamp
                                                            )}
                                                    </Text>
                                                </Flex>

                                                <Flex justifyContent="space-between">
                                                    <Text
                                                        color="#c7c7c7"
                                                        fontWeight="semibold"
                                                    >
                                                        Estimated End Timestamp
                                                    </Text>
                                                    <Text color="#8e8e8e">
                                                        {Object.keys(
                                                            proposalInfo
                                                        ).length > 0 &&
                                                            getEstimatedEnd(
                                                                proposalInfo
                                                            )}
                                                    </Text>
                                                </Flex>
                                                <Flex justifyContent="space-between">
                                                    <Text
                                                        color="#c7c7c7"
                                                        fontWeight="semibold"
                                                    >
                                                        Snapshot Block
                                                    </Text>
                                                    <Text color="#8e8e8e">
                                                        {Object.keys(
                                                            proposalInfo
                                                        ).length > 0 &&
                                                            IconConverter.toNumber(
                                                                proposalInfo
                                                                    .info
                                                                    .endBlockHeight
                                                            )}
                                                    </Text>
                                                </Flex>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box
                                    height="50px"
                                    w="100%"
                                    bg="#0e0e0e"
                                    mt="25px"
                                    borderRadius="15px"
                                ></Box>
                            </Box>
                            <Box
                                maxWidth="calc(100% / 3 - 12.5px)"
                                mt="25px"
                                width="100%"
                            >
                                <Box
                                    borderRadius="15px"
                                    p="30px"
                                    bg="#0e0e0e"
                                    border="1px solid var(--chakra-colors-blackAlpha-50);"
                                    shadow="sm"
                                    display="inline-block"
                                    w="100%"
                                >
                                    <FormLabel color="white">
                                        Cast your vote
                                    </FormLabel>
                                    <VStack spacing="15px" mt="25px" px="15px">
                                        {options.map((value) => {
                                            const radio = getRadioProps({
                                                value,
                                            });
                                            return (
                                                <RadioCard
                                                    key={value}
                                                    {...radio}
                                                >
                                                    {value}
                                                </RadioCard>
                                            );
                                        })}
                                    </VStack>
                                    <Box
                                        width="100%"
                                        textAlign="right"
                                        mt="25px"
                                        px="15px"
                                    >
                                        <Button
                                            variant="outside-button-rev"
                                            onClick={submitVote}
                                            disabled={
                                                voteChoice === null
                                                    ? true
                                                    : false
                                            }
                                            _disabled={{
                                                opacity: 1,
                                                cursor: "not-allowed",
                                            }}
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Box>
            <CustomAlert
                showStatus={showStatus}
                onClose={() => {
                    setShowStatus(false);
                    setStatusInfo({
                        type: "loading",
                        title: "submitting vote",
                        desc: "awaiting tx approval",
                    }); //revert everything to default
                }}
                title={statusInfo.title}
                desc={statusInfo.desc}
                status={statusInfo.type}
                showClose={showClose}
            />
        </>
    );
};

export default ProposalDetail;
