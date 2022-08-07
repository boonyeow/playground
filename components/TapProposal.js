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
import CustomAlert from "./CustomAlert";
import { useEffect, useRef, useState } from "react";


const TapProposal = () => {
    const [showStatus, setShowStatus] = useState(false);
    const [statusInfo, setStatusInfo] = useState({
        type: "loading",
        title: "updating contract",
        desc: "awaiting tx approval...",
    });
    const [showClose, setShowClose] = useState(true);


    const handleSave = async () => {
        setShowStatus(true);
        setShowClose(true);
        setStatusInfo({
            type: "success",
            title: "success",
            desc: "your contract has been updated!",
        });
    };

    return (
        <div>

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
            <HStack spacing="25px" mt="30px">
                <FormControl alignSelf="baseline">
                    <FormLabel>Current Tap Rate</FormLabel>
                    <Input
                        value='200'
                    >
                    </Input>
                    <FormHelperText>
                        Current Tap Rate (ICX) per Second
                    </FormHelperText>
                </FormControl>
                <FormControl alignSelf="baseline" isRequired>
                    <FormLabel>New Tap Rate</FormLabel>
                    <Input
                        type="number"
                        bg="white"
                    ></Input>
                    <FormHelperText>
                        Set a new Tap Rate (ICX) per Second
                    </FormHelperText>
                </FormControl>
            </HStack>
            <Box mt="25px" width="100%" textAlign="right">
                <Button type="submit" variant="action-button"
                    onClick={handleSave}
                >Submit</Button>
            </Box>



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
            />


        </div >
    );
};

export default TapProposal