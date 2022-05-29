import React, { useEffect, useRef } from "react";
import IconService from "icon-sdk-js";
import {
    Box,
    Heading,
    Button,
    CloseButton,
    Text,
    Divider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Stack,
    HStack,
    useToast,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Avatar,
    Icon,
    Link,
    Input,
    VStack,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";
import fetchContractContent from "../util/fetchContractContent";
import cfg from "../util/config";
import ICONexConnection, { sleep } from "../util/interact";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const connection = new ICONexConnection();
const CreateProjectModal = (props) => {
    const tbProjectName = useRef(null);
    const tbProjectSymbol = useRef(null);

    const deployContract = async (name, symbol, signerAddress) => {
        // Deploy Contract

        //httpProvider & iconService for debug endpoint
        const contractContent = cfg.CONTRACT_CONTENT;

        // Construct deploy transaction;
        const txObj = new IconBuilder.DeployTransactionBuilder()
            .nid(cfg.NID)
            .from(localStorage.getItem("USER_WALLET_ADDRESS"))
            .to(cfg.SCORE_INSTALL_ADDRESS)
            .version(IconConverter.toBigNumber(3))
            .timestamp(Date.now() * 1000)
            .contentType("application/java")
            .content(contractContent)
            .params({
                _name: name,
                _symbol: symbol,
                _signerAddress: signerAddress,
            })
            .nonce(IconConverter.toBigNumber(1))
            .build();

        const estimatedSteps = IconConverter.toBigNumber(
            await connection.debugService.estimateStep(txObj).execute()
        );

        const margin = IconConverter.toBigNumber(10000);

        // Add step limit property to transaction with margin to prevent out of step
        txObj.stepLimit = IconService.IconConverter.toHex(
            estimatedSteps.plus(margin)
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
        console.log(rpcResponse);

        if (rpcResponse === undefined) {
            console.log("dude cancelled transaction");
            alert("user cancelled transaction; failed to create new project");
            return;
        }

        const txHash = rpcResponse.result;
        await sleep(5000);
        console.log(rpcResponse);
        return;
    };

    const createProject = () => {
        // perform check on tbProjectName & tbProjectSymbol
        if (
            tbProjectName.current.value == "" ||
            tbProjectSymbol.current.value == ""
        ) {
        } else {
            deployContract(
                tbProjectName.current.value,
                tbProjectSymbol.current.value,
                "hx1f199d7b495ebb2ce3cf704a5dc3c2ac584b6cd3"
            );
            // get transaction result <insert code>

            //
            console.log("success");
        }
    };

    return (
        <>
            <Modal
                isCentered
                onClose={props.onClose}
                isOpen={props.isOpen}
                motionPreset="slideInBottom"
                size="sm"
            >
                <ModalOverlay />
                <ModalContent borderRadius={"xl"}>
                    <ModalCloseButton />
                    <ModalHeader
                        textAlign={"center"}
                        fontWeight="bold"
                        pb={2}
                        fontSize={"3xl"}
                        pt={8}
                    >
                        New Project
                    </ModalHeader>
                    <ModalBody px={10} pb={6}>
                        <VStack>
                            <Text alignSelf="baseline">Project Name</Text>
                            <Input
                                ref={tbProjectName}
                                placeholder="Enter Project Name"
                            ></Input>
                            <Text alignSelf="baseline">Token Symbol</Text>
                            <Input
                                ref={tbProjectSymbol}
                                placeholder="Enter Token Symbol"
                            ></Input>
                        </VStack>
                    </ModalBody>
                    <ModalFooter
                        textAlign={"center"}
                        fontWeight="500"
                        px={10}
                        pt="0"
                        pb="6"
                    >
                        <Button
                            variant="homepage-button"
                            onClick={createProject}
                        >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateProjectModal;
