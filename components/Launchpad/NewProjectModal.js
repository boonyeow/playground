import React, { useEffect, useRef, useState } from "react";
import IconService from "icon-sdk-js";
import {
    Button,
    CloseButton,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    VStack,
} from "@chakra-ui/react";
import axios from "axios";
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

const NewProjectModal = ({ onClose, isOpen, userInfo }) => {
    const [showStatus, setShowStatus] = useState(false);
    const [statusType, setStatusType] = useState("loading");
    const [statusTitle, setStatusTitle] = useState("deploying contract");
    const [statusDesc, setStatusDesc] = useState("awaiting tx approval..");

    const tbProjectName = useRef(null);
    const createProject = async () => {
        const projectName = tbProjectName.current.value;
        if (projectName == "") {
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
            .from(userInfo.userAddress)
            .to(cfg.SCORE_INSTALL_ADDRESS)
            .version(IconConverter.toBigNumber(3))
            .timestamp(Date.now() * 1000)
            .contentType("application/java")
            .content(contractContent)
            .params({
                _name: projectName,
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
            if (rpcResponse.error) {
                setStatusType("failure");
                setStatusTitle("ooops");
                setStatusDesc("your transaction was not approved");
            } else {
                console.log(rpcResponse);
                await sleep(5000);

                //callback to get txResult until response
                const txResult = await connection.iconService
                    .getTransactionResult(rpcResponse.result)
                    .execute();
                await sleep(5000);

                let response = await axios.post(
                    "http://localhost:3000/api/projects/add", //change it to {endpoint}/api/projects/add
                    {
                        userAddress: userInfo.userAddress,
                        contractAddress: txResult.scoreAddress,
                        name: projectName,
                        shortDescription: "",
                        longDescription: "",
                        thumbnail: "",
                        fundingGoal: 0,
                        softCap: 0,
                    }
                );
                console.log("res", response);

                setStatusType("success");
                setStatusTitle("success");
                setStatusDesc("your contract has been deployed!");
            }
        } catch (err) {
            console.log(err);
            setStatusType("failure");
            setStatusTitle("ooops");
            setStatusDesc("your transaction has failed, please try again");
        }
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
