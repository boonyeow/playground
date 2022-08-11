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
import CustomAlert from "./CustomAlert";
import ICONexConnection from "../util/interact";
import IconService from "icon-sdk-js";
import { useEffect, useRef, useState } from "react";
import { Formik, Field, form, useFormik, ErrorMessage } from "formik";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const TapProposal = () => {
    const connection = new ICONexConnection();
    const [showStatus, setShowStatus] = useState(false);
    const [statusInfo, setStatusInfo] = useState({
        type: "loading",
        title: "updating contract",
        desc: "awaiting tx approval...",
    });
    const [showClose, setShowClose] = useState(true);
    const [remainingChar, setRemainingChar] = useState(50);

    // const validateTitle = (value) => {
    //     let error
    //     setRemainingChar(50 - value.length)
    //     if (value.length > 50) {
    //         error = "Maximum character limit exceeded"
    //     }
    //     return error
    // }
    const validate = (values) => {
        const errors = {};
        setRemainingChar(50 - values.title.length);
        if (values.title.length > 50) {
            errors.title = "Maximum character limit exceeded";
        }
        if (values.tapRate < 0) {
            errors.tapRate = "Tap Rate cannot be less than Zero";
        }
        console.log(errors);
        return errors;
    };
    // useEffect(() => {
    //     const fetchProjectInfo = async () => {
    //         const call = new IconBuilder.CallBuilder()
    //             .to(pid)
    //             .method("getProjectInfo")
    //             .build();
    //         let res = await connection.iconService.call(call).execute();
    //         console.log("res", res);
    //         // let pi = {
    //         //     name: res.name,
    //         //     thumbnailSrc: res.thumbnailSrc,
    //         //     description: res.description,
    //         //     details: res.details,
    //         //     fundingGoal: IconConverter.toNumber(res.fundingGoal),
    //         //     pricePerNFT: IconConverter.toNumber(res.pricePerNFT),
    //         //     startTimestamp: IconConverter.toNumber(res.startTimestamp),
    //         //     endTimestamp: IconConverter.toNumber(res.endTimestamp),
    //         //     withdrawalRate: IconConverter.toNumber(res.withdrawalRate),
    //         // };
    //         // setProjectInfo(pi);
    //     };
    //     fetchProjectInfo();
    // }, []);

    const handleSave = async () => {
        setShowStatus(true);
        setShowClose(true);
        setStatusInfo({
            type: "success",
            title: "success",
            desc: "your contract has been updated!",
        });
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            forumLink: "",
            tapRate: "",
        },
        validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            // call the proposal collection
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Box mt="25px">
                    <FormControl isRequired>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input
                            bg="white"
                            id="title"
                            name="title"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                        ></Input>
                        <Flex>
                            <FormHelperText paddingRight="10px">
                                Character limit: {remainingChar}
                            </FormHelperText>

                            {formik.errors.title ? (
                                <FormHelperText color={"red"}>
                                    ({formik.errors.title})
                                </FormHelperText>
                            ) : null}
                        </Flex>
                    </FormControl>
                </Box>
                <Box mt="25px">
                    <FormControl isRequired>
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <Textarea
                            bg="white"
                            id="description"
                            name="description"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        ></Textarea>
                    </FormControl>
                </Box>
                <Box mt="25px">
                    <FormControl isRequired>
                        <FormLabel htmlFor="forumLink">Forum Link</FormLabel>
                        <Input
                            bg="white"
                            id="forumLink"
                            name="forumLink"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.forumLink}
                        ></Input>
                        <Flex>
                            <FormHelperText paddingRight="10px">
                                {" "}
                                Optional: You can include a link for discussions
                                to be held.
                            </FormHelperText>
                        </Flex>
                    </FormControl>
                </Box>

                <HStack spacing="25px" mt="30px">
                    <FormControl alignSelf="baseline">
                        <FormLabel>Current Tap Rate Limit</FormLabel>
                        <Input value="200"></Input>
                        <FormHelperText>Unit: ICX / sec.</FormHelperText>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel htmlFor="tapRate">New Tap Rate</FormLabel>
                        <Input
                            bg="white"
                            id="tapRate"
                            name="tapRate"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.tapRate}
                        ></Input>

                        <Flex>
                            <FormHelperText paddingRight="10px">
                                Set a new Tap Rate Limit (unit: ICX / sec).
                            </FormHelperText>
                        </Flex>
                        {formik.errors.tapRate ? (
                            <FormHelperText color={"red"}>
                                ({formik.errors.tapRate})
                            </FormHelperText>
                        ) : null}
                    </FormControl>
                </HStack>
                <Box mt="25px" width="100%" textAlign="right">
                    {/* <Button type="submit" variant="action-button" */}
                    <Button
                        type="submit"
                        // onClick={handleSave}
                    >
                        Submit
                    </Button>
                </Box>

                {/* 
                <CustomAlert
                    showStatus={showStatus}
                    onClose={() => {
                        setShowStatus(false);
                        setStatusInfo({
                            type: "loading",
                            title: "updating contract",
                            desc: "awaiting tx approval",
                        }); //revert everything to default
                    }}
                    title={statusInfo.title}
                    desc={statusInfo.desc}
                    status={statusInfo.type}
                    showClose={showClose}
                /> */}
            </form>
        </div>
    );
};

export default TapProposal;
