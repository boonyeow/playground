import {
    Flex,
    FormLabel,
    Icon,
    Stack,
    VisuallyHidden,
    Text,
    Input,
    Box,
} from "@chakra-ui/react";
import { useRef } from "react";

const UploadFileComponent = (props) => {
    const inputUploadFile = useRef(null);

    const callback = (e) => {
        props.callbackHandler();
    };

    return (
        <Box width="100%">
            <FormLabel fontSize="lg" fontWeight="bold" color="#3d3d3d">
                {props.title}
            </FormLabel>
            <Flex
                onClick={() => inputUploadFile.current.click()}
                mt={1}
                justify="center"
                px={6}
                pt={5}
                pb={6}
                borderWidth={2}
                borderColor={"gray.500"}
                borderStyle="dashed"
                rounded="md"
                height="200px"
                alignItems="center"
                transition="transform 0.2s"
                _hover={{
                    cursor: "pointer",
                    bgColor: "#f5f8fc",
                    borderColor: "#619ef1",
                }}
                role="group"
            >
                <Stack spacing={1}>
                    <Icon
                        mx="auto"
                        boxSize={12}
                        stroke={"gray.500"}
                        _groupHover={{ stroke: "#619ef1" }}
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Icon>
                    <Flex
                        fontSize="sm"
                        color={"gray.400"}
                        alignSelf="center"
                        rounded="md"
                        pos="relative"
                    >
                        <VisuallyHidden>
                            <Input
                                type="file"
                                ref={inputUploadFile}
                                onChange={callback}
                            />
                        </VisuallyHidden>
                        <Text
                            fontWeight="semibold"
                            color="gray.600"
                            _groupHover={{ color: "#619ef1" }}
                        >
                            Upload a file
                        </Text>
                    </Flex>
                    <Text
                        fontSize="xs"
                        color={"gray.500"}
                        _groupHover={{ color: "#619ef1" }}
                    >
                        PNG, JPG, GIF up to 10MB
                    </Text>
                </Stack>
            </Flex>
        </Box>
    );
};

export default UploadFileComponent;
