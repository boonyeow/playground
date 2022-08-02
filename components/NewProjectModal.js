import React, { useEffect, useRef, useState } from "react";
import IconService from "icon-sdk-js";
import {
    Button,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    VStack,
} from "@chakra-ui/react";
import axios from "axios";
import ICONexConnection from "../util/interact";
import CustomAlert from "./CustomAlert";
import cfg from "../util/config";
const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const connection = new ICONexConnection();

const NewProjectModal = ({ onClose, isOpen, userInfo, setUserInfo }) => {
    const [showStatus, setShowStatus] = useState(false);
    const [statusInfo, setStatusInfo] = useState({
        type: "loading",
        title: "deploying contract",
        desc: "awaiting tx approval...",
    });
    const [showClose, setShowClose] = useState(true);
    const [projectName, setProjectName] = useState("");

    const createProject = async () => {
        if (projectName == "") {
            alert("cannot be empty");
            return;
        }
        onClose();
        setShowStatus(true);
        setShowClose(false);
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

        let rpcResponse = await connection.ICONexRequest(
            "REQUEST_JSON-RPC",
            payload
        );

        getTransactionResult(rpcResponse, 5);
    };

    const getTransactionResult = async (rpcResponse, maxRetry) => {
        console.log("trying...", maxRetry);
        if (rpcResponse.error) {
            setShowClose(true);
            setStatusInfo({
                type: "failure",
                title: "ooops",
                desc: "your transaction was not approved",
            });
        } else {
            try {
                const txResult = await connection.iconService
                    .getTransactionResult(rpcResponse.result)
                    .execute();
                if (txResult.status === 1) {
                    let params = {
                        userAddress: userInfo.userAddress,
                        contractAddress: txResult.scoreAddress,
                        name: projectName,
                        description: "",
                        details: "",
                        thumbnailSrc: "",
                        fundingGoal: "",
                        pricePerNFT: "",
                        startTimestamp: "",
                        endTimestamp: "",
                    };
                    let response = await axios.post(
                        "http://localhost:3000/api/projects/add", //change it to {endpoint}/api/projects/add
                        params
                    );
                    console.log("res", response);
                    setShowClose(true);
                    setStatusInfo({
                        type: "success",
                        title: "success",
                        desc: "your contract has been deployed!",
                    });

                    let projectsDeployed = userInfo.projectsDeployed;
                    projectsDeployed.push(params);
                    localStorage.setItem(
                        "_persist",
                        JSON.stringify({
                            userAddress: userInfo.userAddress,
                            projectsDeployed: projectsDeployed,
                        })
                    );

                    setUserInfo({
                        userAddress: userInfo.userAddress,
                        projectsDeployed: projectsDeployed,
                    });
                } else {
                    console.log("FAILED BOI", txResult);
                    setShowClose(true);
                    setStatusInfo({
                        type: "failure",
                        title: "ooops",
                        desc: "your transaction has failed, please try again",
                    });
                }
            } catch (err) {
                if (maxRetry > 0) {
                    setTimeout(
                        () => getTransactionResult(rpcResponse, maxRetry - 1),
                        2200
                    );
                } else {
                    console.log(err);
                    setShowClose(true);
                    setStatusInfo({
                        type: "failure",
                        title: "ooops",
                        desc: "your transaction has failed, please try again",
                    });
                }
            }
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
                                placeholder="Enter your project name"
                                onChange={(e) => {
                                    setProjectName(e.target.value);
                                }}
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
                    setStatusInfo({
                        type: "loading",
                        title: "deploying contract",
                        desc: "awaiting tx approval",
                    }); //revert everything to default
                }}
                title={statusInfo.title}
                desc={statusInfo.desc}
                status={statusInfo.type}
                showClose={showClose}
            />
        </>
    );
};

export default NewProjectModal;
