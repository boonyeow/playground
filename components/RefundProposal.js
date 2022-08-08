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
import { useEffect, useRef, useState } from "react";
import { Formik, Field, Form } from 'formik';

const RefundProposal = ({ pid }) => {
    const [remainingChar, setRemainingChar] = useState(50);

    const validateTitle = (value) => {
        let error
        setRemainingChar(50 - value.length)
        if (value.length > 50) {
            error = "Maximum character limit exceeded"
        }
        return error
    }

    return (
        <>
            <Formik
                initialValues={{ title: '', description: '', forumLink: '' }}
                onSubmit={async (values, actions) => {
                    console.log('act', actions);
                    alert(values.title)
                    alert(JSON.stringify(values, null, 2))

                    // call the proposal collection

                }}
            >
                {(props) => {
                    return (
                        <Form>
                            <Box mt="25px">
                                <Field name='title' validate={validateTitle}>
                                    {({ field, form }) => {
                                        // console.log("test", { ...field })
                                        // console.log(field.onChange)
                                        return (
                                            < FormControl alignSelf="baseline" isInvalid={form.errors.title && form.touched.title} isRequired >
                                                <FormLabel>Title</FormLabel>
                                                <Input {...field}></Input>
                                                <Flex>
                                                    <FormHelperText paddingRight="20px">Character limit: {remainingChar}    </FormHelperText>
                                                    <FormErrorMessage>({form.errors.title})</FormErrorMessage>
                                                </Flex>
                                            </FormControl>
                                        )
                                    }}
                                </Field>
                            </Box>
                            <Box mt="25px">
                                <Field name='description'>
                                    {({ field, form }) => (
                                        <FormControl alignSelf="baseline" isRequired>
                                            <FormLabel>Description</FormLabel>
                                            <Textarea {...field}></Textarea>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box mt="25px">
                                <Field name='forumLink'>
                                    {({ field }) => (
                                        <FormControl alignSelf="baseline">
                                            <FormLabel>Forum Link</FormLabel>
                                            <Input {...field}></Input>
                                            <FormHelperText>
                                                Optional: You can include a link for discussions to be held
                                            </FormHelperText>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Box mt="25px" width="100%" textAlign="right">
                                <Button type="submit" variant="action-button">
                                    Submit
                                </Button>
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </>

    );
};

export default RefundProposal