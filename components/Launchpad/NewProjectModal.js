import React, { useEffect, useRef, useState } from "react";
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
    Spinner,
} from "@chakra-ui/react";
import ICONexConnection, { sleep } from "../../util/interact";
import CustomAlert from "../CustomAlert";
import cfg from "../../util/config";
const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const connection = new ICONexConnection();

const NewProjectModal = ({ onClose, isOpen }) => {
    const { statusIsOpen, statusOnOpen, statusOnClose } = useDisclosure();
    const [showStatus, setShowStatus] = useState(false);
    const [statusType, setStatusType] = useState("loading");
    const [statusTitle, setStatusTitle] = useState("deploying contract");
    const [statusDesc, setStatusDesc] = useState("awaiting tx approval..");

    const tbProjectName = useRef(null);
    const createProject = async () => {
        if (tbProjectName.current.value == "") {
            alert("cannot be empty");
            return;
        }
        onClose();
        setShowStatus(true);
        let contractContent = cfg.CONTRACT_CONTENT;
        let signerAddress = "hx1f199d7b495ebb2ce3cf704a5dc3c2ac584b6cd3"; // note: to hardcode in contract
        // deploy contract
        const txObj = new IconBuilder.DeployTransactionBuilder()
            .nid(cfg.NID)
            .from(localStorage.getItem("USER_WALLET_ADDRESS"))
            .to(cfg.SCORE_INSTALL_ADDRESS)
            .version(IconConverter.toBigNumber(3))
            .timestamp(Date.now() * 1000)
            .contentType("application/java")
            .content(contractContent)
            .params({
                _name: tbProjectName.current.value,
                _signerAddress: signerAddress,
            })
            .nonce(IconConverter.toBigNumber(1))
            .build();

        const estimatedSteps = IconConverter.toBigNumber(
            await connection.debugService.estimateStep(txObj).execute()
        );

        txObj.stepLimit = IconService.IconConverter.toHex(
            estimatedSteps.plus(IconConverter.toBigNumber(10000)) // prevent out of step
        );

        const payload = {
            jsonrpc: "2.0",
            method: "icx_sendTransaction",
            id: 6639,
            params: IconConverter.toRawTransaction(txObj),
        };

        try {
            let rpcResponse = await connection.ICONexRequest(
                "REQUEST_JSON-RPC",
                payload
            );
            console.log(rpcResponse);
            console.log(typeof rpcResponse);
            if (rpcResponse.error) {
                setStatusType("failure");
                setStatusTitle("ooops");
                setStatusDesc("your transaction was not approved");
            } else {
                await sleep(5000);
                setStatusType("success");
                setStatusTitle("success");
                setStatusDesc("your contract has been deployed!");

                //callback to get txObject until response
                // const txObject = await iconService
                //     .getTransactionResult(txHash)
                //     .execute();
            }
        } catch (err) {}

        // if (rpcResponse === undefined) {
        //     console.log("dude cancelled transaction");
        //     alert("user cancelled transaction; failed to create new project");
        //     return;
        // }

        // const txHash = rpcResponse.result;
        // await sleep(5000);
        // console.log(rpcResponse);
        return;
    };

    return (
        <>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
                size="md"
                autoFocus={false}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent borderRadius={"xl"}>
                    <ModalCloseButton />
                    <ModalHeader
                        fontWeight="bold"
                        pb={2}
                        fontSize={"3xl"}
                        pt={8}
                        px={10}
                    >
                        Start a project
                    </ModalHeader>
                    <ModalBody px={10} pb={6}>
                        <VStack>
                            <Text alignSelf="baseline">Project Name</Text>
                            <Input
                                ref={tbProjectName}
                                placeholder="Enter your project name"
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
            <CustomAlert
                showStatus={showStatus}
                onClose={() => {
                    setShowStatus(false);
                    setStatusType("loading");
                    setStatusTitle("deploying contract");
                    setStatusDesc("awaiting tx approval"); //revert everything to default
                }}
                title={statusTitle}
                desc={statusDesc}
                status={statusType}
            />
        </>
    );
};

export default NewProjectModal;
