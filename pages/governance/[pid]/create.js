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
    FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import PageHeader from "../../../components/PageHeader";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

const Proposal = () => {
    const router = useRouter();
    const { pid } = router.query;
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });

    useEffect(() => {
        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);
    }, [router.isReady]);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            discussionUrl: "",
            proposalType: "",
            withdrawalRate: "",
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(50, "Must be 50 characters or less")
                .required("Required field"),
            description: Yup.string().required("Required field"),
            withdrawalRate: Yup.number().when("proposalType", {
                is: "tap",
                then: Yup.number()
                    .required("Required field")
                    .min(0, "Minimum withdrawal rate must be 0"),
            }),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            // call the proposal collection
        },
    });

    const isInvalid = (key) => {
        if (key == "title") {
            return formik.touched.title && formik.errors.title;
        } else if (key == "description") {
            return formik.touched.description && formik.errors.description;
        } else if (key == "withdrawalRate") {
            return (
                formik.touched.withdrawalRate && formik.errors.withdrawalRate
            );
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
                            <NextLink
                                href={`/governance/${pid}`}
                                color="gray.600"
                            >
                                {router.isReady ? pid : ""}
                            </NextLink>
                            <ChevronRightIcon alignSelf="center" mx="10px" />
                            <Text color="gray.600" fontWeight="semibold">
                                Create Proposal
                            </Text>
                        </Flex>

                        <Box
                            width="100%"
                            maxWidth="calc(100% / 3 * 2 - 12.5px)"
                            mr="25px"
                            mt="25px"
                        >
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl
                                    isInvalid={
                                        isInvalid("title") ? true : false
                                    }
                                >
                                    <FormLabel htmlFor="title">Title</FormLabel>
                                    <Input
                                        bg="white"
                                        id="title"
                                        name="title"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.title}
                                    />
                                    {isInvalid("title") ? (
                                        <FormErrorMessage>
                                            {formik.errors.title}
                                        </FormErrorMessage>
                                    ) : (
                                        <FormHelperText>
                                            Enter the title of your proposal.
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl
                                    mt="25px"
                                    isInvalid={
                                        isInvalid("description") ? true : false
                                    }
                                >
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        bg="white"
                                        id="description"
                                        name="description"
                                        height="150px"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.onChange}
                                    />
                                    {isInvalid("description") ? (
                                        <FormErrorMessage>
                                            {formik.errors.description}
                                        </FormErrorMessage>
                                    ) : (
                                        <FormHelperText>
                                            Tell us about your proposal.
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl mt="25px">
                                    <FormLabel>Proposal Type</FormLabel>
                                    <Select
                                        name="proposalType"
                                        id="proposalType"
                                        value={formik.values.proposalType}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        bg="white"
                                    >
                                        <option selected value="refund">
                                            Initiate Refund
                                        </option>
                                        <option value="tap">
                                            Adjust Withdrawal Rate
                                        </option>
                                    </Select>
                                </FormControl>

                                {formik.values.proposalType == "tap" ? (
                                    <HStack mt="15px" spacing="25px">
                                        <FormControl>
                                            <FormLabel>Current Rate</FormLabel>
                                            <Input
                                                bg="white"
                                                isDisabled
                                            ></Input>
                                            <FormHelperText>
                                                ICX / second
                                            </FormHelperText>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={
                                                isInvalid("withdrawalRate")
                                                    ? true
                                                    : false
                                            }
                                        >
                                            <FormLabel>Proposed Rate</FormLabel>
                                            <Input
                                                id="withdrawalRate"
                                                name="withdrawalRate"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                bg="white"
                                                type="number"
                                            ></Input>
                                            {isInvalid("withdrawalRate") ? (
                                                <FormErrorMessage>
                                                    {
                                                        formik.errors
                                                            .withdrawalRate
                                                    }
                                                </FormErrorMessage>
                                            ) : (
                                                <FormHelperText>
                                                    ICX / second
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </HStack>
                                ) : (
                                    ""
                                )}

                                <FormControl mt="25px">
                                    <FormLabel>Discussion</FormLabel>
                                    <Input
                                        bg="white"
                                        id="discussionUrl"
                                        name="discussionUrl"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.discussionUrl}
                                        placeholder="https://c9.app/discussion/2okao"
                                    />
                                    <FormHelperText>
                                        Share your discussion URL here.
                                        Optional.
                                    </FormHelperText>
                                </FormControl>

                                <Box mt="25px" width="100%" textAlign="right">
                                    <Button
                                        type="submit"
                                        variant="action-button"
                                    >
                                        Publish
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Proposal;
