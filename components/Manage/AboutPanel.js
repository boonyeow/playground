import {
    Box,
    Button,
    HStack,
    TabPanel,
    VStack,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    InputGroup,
    InputRightAddon,
    InputRightElement,
    Text,
    FormErrorMessage,
    NumberInput,
    NumberInputField,
    Textarea,
} from "@chakra-ui/react";
import { Formik, useFormik } from "formik";

import { useEffect, useRef, useState } from "react";
import { BsPercent } from "react-icons/bs";
import Editor from "../Editor";
import MarkdownEditor from "../MarkdownEditor";
import SingleCollection from "../SingleCollection";
import UploadFileComponent from "../UploadFileComponent";

const AboutPanel = () => {
    const [value, setValue] = useState("**Hello world!!!**");
    const onSubmit = (values) => {
        console.log("onsubmit", values);
        // alert(JSON.stringify(values));
        // //perform validation & save project data
        // console.log("save event");

        // // Convert datetime to UNIX timestamp
        // const launchDatetime = new Date(values.launchDatetime);
        // launchDatetime = launchDatetime.getTime();
        // console.log("unix timestamp", launchDatetime);

        // proceed to send data
    };

    const validate = (values) => {
        console.log("validating...", values);
        let errors = {};
        if (!values.price) {
            errors.price = "Required field";
        }

        if (!values.totalSupply) {
            errors.totalSupply = "Required field";
        }

        if (!values.launchDatetime) {
            errors.launchDatetime = "Required field";
        }

        if (!values.royalties) {
            errors.royalties = "Required field";
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            price: "",
            totalSupply: "",
            launchDatetime: "",
            royalties: "",
        },
        onSubmit,
        validate,
    });

    return (
        <>
            <Box as="form" onSubmit={formik.handleSubmit}>
                <VStack spacing="5" px="5">
                    <HStack width="100%" spacing="10">
                        <VStack width="50%" spacing="5" alignSelf={"baseline"}>
                            <UploadFileComponent title="Cover Image" />
                            <HStack w="100%" spacing="10">
                                <FormControl
                                    isInvalid={
                                        !!formik.errors.price &&
                                        formik.touched.price
                                    }
                                    alignSelf="baseline"
                                >
                                    <FormLabel
                                        fontSize="lg"
                                        fontWeight="bold"
                                        color="#3d3d3d"
                                    >
                                        Price
                                    </FormLabel>

                                    <InputGroup>
                                        <NumberInput min={1} step={1}>
                                            <NumberInputField
                                                id="price"
                                                name="price"
                                                placeholder="Enter mint price"
                                                fontSize="sm"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.price}
                                                borderRightRadius={0}
                                            />
                                        </NumberInput>

                                        <InputRightAddon
                                            fontSize="sm"
                                            fontWeight="semibold"
                                            color="#3d3d3d"
                                        >
                                            ICX
                                        </InputRightAddon>
                                    </InputGroup>

                                    {formik.errors.price ? (
                                        <FormErrorMessage>
                                            {formik.errors.price}
                                        </FormErrorMessage>
                                    ) : null}
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!formik.errors.totalSupply &&
                                        formik.touched.totalSupply
                                    }
                                    alignSelf="baseline"
                                >
                                    <FormLabel
                                        fontSize="lg"
                                        fontWeight="bold"
                                        color="#3d3d3d"
                                    >
                                        Supply
                                    </FormLabel>
                                    <NumberInput min={1} step={1}>
                                        <NumberInputField
                                            id="totalSupply"
                                            name="totalSupply"
                                            placeholder="Enter total supply"
                                            fontSize="sm"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.totalSupply}
                                        />
                                    </NumberInput>

                                    {formik.errors.totalSupply ? (
                                        <FormErrorMessage>
                                            {formik.errors.totalSupply}
                                        </FormErrorMessage>
                                    ) : null}
                                </FormControl>
                            </HStack>
                            <FormControl
                                isInvalid={
                                    !!formik.errors.launchDatetime &&
                                    formik.touched.launchDatetime
                                }
                                alignSelf="baseline"
                            >
                                <FormLabel
                                    fontSize="lg"
                                    fontWeight="bold"
                                    color="#3d3d3d"
                                >
                                    Launch Date
                                </FormLabel>

                                <Input
                                    id="launchDatetime"
                                    name="launchDatetime"
                                    type="datetime-local"
                                    fontSize="sm"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.launchDatetime}
                                />
                                {formik.errors.launchDatetime ? (
                                    <FormErrorMessage>
                                        {formik.errors.launchDatetime}
                                    </FormErrorMessage>
                                ) : null}
                            </FormControl>
                            <FormControl
                                isInvalid={
                                    !!formik.errors.royalties &&
                                    formik.touched.royalties
                                }
                                alignSelf="baseline"
                            >
                                <FormLabel
                                    fontSize="lg"
                                    fontWeight="bold"
                                    color="#3d3d3d"
                                >
                                    Royalties
                                </FormLabel>

                                <NumberInput
                                    min={1}
                                    max={25}
                                    step={1}
                                    precision={2}
                                >
                                    <NumberInputField
                                        id="royalties"
                                        name="royalties"
                                        placeholder="Enter royalties"
                                        fontSize="sm"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.royalties}
                                    />
                                    <InputRightElement pr="3">
                                        <BsPercent />
                                    </InputRightElement>
                                </NumberInput>
                                {formik.errors.royalties ? (
                                    <FormErrorMessage>
                                        {formik.errors.royalties}
                                    </FormErrorMessage>
                                ) : (
                                    <FormHelperText>
                                        Royalties for every sales in the
                                        secondary market.
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </VStack>
                        <VStack width="50%" spacing="5">
                            <SingleCollection src="" />
                        </VStack>
                    </HStack>
                    <FormControl>
                        <FormLabel
                            fontSize="lg"
                            fontWeight="bold"
                            color="#3d3d3d"
                        >
                            Short Description
                        </FormLabel>
                        <Textarea
                            placeholder="Enter a short description of your project"
                            fontSize="sm"
                        ></Textarea>
                    </FormControl>
                    <FormControl width="100%">
                        <FormLabel
                            fontSize="lg"
                            fontWeight="bold"
                            color="#3d3d3d"
                        >
                            Detailed Description
                        </FormLabel>
                        <Editor value={value} setValue={setValue} />
                    </FormControl>
                </VStack>

                <VStack spacing="5" px="5">
                    <Button
                        variant="homepage-button"
                        alignSelf="end"
                        type="submit"
                    >
                        Save
                    </Button>
                </VStack>
            </Box>
        </>
    );
};

export default AboutPanel;
