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
import { Form, Formik } from 'formik';

const RefundProposal = () => {
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     alert(`Email: ${Title} & Password: ${Description}`);
    // };
    return (
        <>
            <Formik
                initialValues={{ name: 'jared' }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}>
                <Form>
                    <Box mt="25px">
                        <FormControl alignSelf="baseline" isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input></Input>
                        </FormControl>
                    </Box>
                    <Box mt="25px">
                        <FormControl alignSelf="baseline" isRequired>
                            <FormLabel>Description</FormLabel>
                            <Textarea></Textarea>
                        </FormControl>
                    </Box>
                    <Box mt="25px">
                        <FormControl alignSelf="baseline">
                            <FormLabel>Forum Link</FormLabel>
                            <Input></Input>
                            <FormHelperText>
                                Optional: You can include a link for discussions to be held
                            </FormHelperText>
                        </FormControl>
                    </Box>
                    <Box mt="25px" width="100%" textAlign="right">
                        <Button type="submit">Submit</Button>
                    </Box>
                </Form>
            </Formik>
        </>
    );
};

export default RefundProposal