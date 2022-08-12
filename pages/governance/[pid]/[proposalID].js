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

const RadioCard = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    let theme =
        input.value == "Approve"
            ? {
                  color: "#2F855A",
                  bg: "#C6F6D5",
              }
            : {
                  bg: "#FED7D7",
                  color: "#C53030",
              };

    return (
        <Box as="label" w="125px">
            <input {...input} />
            <Flex
                {...checkbox}
                cursor="pointer"
                borderRadius="15px"
                _checked={{
                    bg: `${theme.color}`,
                    color: "white",
                    fontWeight: "bold",
                }}
                px={5}
                py={3}
                fontSize="sm"
                textAlign="center"
                color={theme.color}
                bg={theme.bg}
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
    const router = useRouter();
    const { pid, proposalID } = router.query;
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });

    const [proposalInfo, setProposalInfo] = useState({});

    useEffect(() => {
        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);

        const getProposalInfo = (proposalID) => {};
        if (router.isReady) {
        }
    }, [router.isReady]);

    const options = ["Approve", "Reject"];
    const { getRootProps, getRadioProps } = useRadioGroup();

    const group = getRootProps();

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
                                        <Text
                                            fontWeight="bold"
                                            fontSize="3xl"
                                            mt="10px"
                                        >
                                            Adjust Withdrawal Rate
                                        </Text>
                                        <Flex
                                            fontFamily="mono"
                                            lineHeight={1}
                                            color="#686868"
                                        >
                                            <Text>proposed by</Text>&nbsp;
                                            <NextLink href={"google.com"}>
                                                <Link color="#1e86ff">
                                                    {pid}
                                                </Link>
                                            </NextLink>
                                        </Flex>
                                        <Text color="#8e8e8e" mt="25px">
                                            This is an initial funding proposal
                                            for the Gitcoin Product Collective
                                            (GPC) Workstream requesting
                                            ratification as a structured
                                            workstream and budgetary funds for
                                            Season 15 (1 August 2022 through 31
                                            October 2022). The full governance
                                            post can be found here:
                                            https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
                                        </Text>
                                        <Text textAlign="center">See more</Text>

                                        <Box borderRadius="15px" mt="25px">
                                            <Text fontWeight={"semibold"}>
                                                Additional Information
                                            </Text>
                                            <Text color="#8e8e8e">
                                                Start Block
                                            </Text>
                                            <Text color="#8e8e8e">
                                                End Block
                                            </Text>
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
                                    border="1px solid var(--chakra-colors-blackAlpha-200);"
                                    shadow="sm"
                                    display="inline-block"
                                >
                                    <FormLabel color="white">
                                        Cast your vote
                                    </FormLabel>
                                    <HStack spacing="25px" mt="25px" px="15px">
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
                                    </HStack>
                                    <Box
                                        width="100%"
                                        textAlign="right"
                                        mt="25px"
                                        px="15px"
                                    >
                                        <Button
                                            variant="outside-button-rev"
                                            w="100%"
                                        >
                                            Submit Vote
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ProposalDetail;
