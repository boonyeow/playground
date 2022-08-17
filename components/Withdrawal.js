import {
    Box,
    Button,
    Flex,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import IconService from "icon-sdk-js";
import ICONexConnection from "../util/interact";
import cfg from "../util/config";
import CustomAlert from "./CustomAlert";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const AdditionalInfo = ({ title, color }) => {
    return (
        <VStack mr="30px" spacing="0">
            <Flex alignItems="center">
                <Box
                    w="10px"
                    h="10px"
                    bg={color}
                    mr="10px"
                    borderRadius="2px"
                ></Box>
                <Text
                    color="black"
                    fontWeight="semibold"
                    alignSelf="self-start"
                    fontSize="sm"
                >
                    {title}
                </Text>
            </Flex>
        </VStack>
    );
};

const Withdrawal = ({ userInfo, projectInfo, contractBalance, addr }) => {
    const connection = new ICONexConnection();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [withdrawalAmount, setWithdrawalAmount] = useState();

    const [showStatus, setShowStatus] = useState(false);
    const [statusInfo, setStatusInfo] = useState({
        type: "loading",
        title: "Withdrawing funds",
        desc: "awaiting tx approval...",
    });

    const [showClose, setShowClose] = useState(true);

    const handleWithdrawal = async () => {
        setShowStatus(true);
        const currentTimestamp = new Date().getTime() * 1000;
        const txObj = new IconBuilder.CallTransactionBuilder()
            .from(userInfo.userAddress)
            .to(addr)
            .nid(cfg.NID)
            .nonce(IconConverter.toBigNumber(1))
            .version(IconConverter.toBigNumber(3))
            .timestamp(currentTimestamp)
            .method("withdraw")
            .params({
                amount: IconConverter.toHexNumber(withdrawalAmount),
                lastWithdrawn: IconConverter.toHexNumber(currentTimestamp),
            })
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
                    setShowClose(true);
                    setStatusInfo({
                        type: "success",
                        title: "success",
                        desc: "you have successfully withdrawn funds",
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
        <Box
            borderRadius="15px"
            p="30px"
            bg="white"
            border="1px solid var(--chakra-colors-blackAlpha-50);"
            shadow="sm"
            display="inline-block"
            w="100%"
            minHeight="300px"
        >
            <Flex justifyContent="space-between">
                <Text fontWeight="bold" fontSize="2xl">
                    Treasury
                </Text>
                <Box
                    as="button"
                    onClick={onOpen}
                    fontWeight="semibold"
                    color="#3D5CC3"
                    alignSelf="center"
                >
                    Withdraw Funds
                </Box>
            </Flex>

            <Box mt="25px">
                <Box px="25px">
                    <Flex>
                        <Text fontWeight="semibold" color="#8e8e8e">
                            Project Balance
                        </Text>
                    </Flex>
                    <VStack>
                        <Box
                            w="100%"
                            h="15px"
                            bg="gray.100"
                            borderRadius="25px"
                            mt="10px"
                        >
                            <Box
                                w="50%"
                                h="15px"
                                bg="black"
                                borderRadius="25px"
                            ></Box>
                        </Box>
                        <Flex
                            mt="10px"
                            fontSize="sm"
                            fontWeight="semibold"
                            color="#8e8e8e"
                            w="100%"
                            justifyContent="space-between"
                        >
                            <Text>50 ICX</Text>
                            <Text>50 ICX</Text>
                        </Flex>
                    </VStack>
                </Box>
                <Flex p="5px" borderRadius="15px" justifyContent={"center"}>
                    <AdditionalInfo
                        title="Unlocked Balance"
                        value="50 ICX"
                        color="black"
                    />
                    <AdditionalInfo
                        title="Locked Balance"
                        value="50 ICX"
                        color="gray.100"
                    />
                </Flex>
            </Box>
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
                        Treasury
                    </ModalHeader>
                    <ModalBody px={10} pb={6}>
                        <InputGroup>
                            <Input
                                type="number"
                                placeholder="Enter withdrawal amount"
                                onChange={(e) => {
                                    setWithdrawalAmount(
                                        e.target.value * 10 ** 18
                                    );
                                }}
                            />
                            <InputRightElement w="4.5rem">
                                <Button h="1.75rem" size="sm">
                                    Max
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter
                        textAlign={"center"}
                        fontWeight="500"
                        px={10}
                        pt="0"
                        pb="6"
                    >
                        <Button
                            variant="outside-button"
                            onClick={handleWithdrawal}
                        >
                            Withdraw
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
                        title: "Withdrawing funds",
                        desc: "awaiting tx approval",
                    }); //revert everything to default
                }}
                title={statusInfo.title}
                desc={statusInfo.desc}
                status={statusInfo.type}
                showClose={showClose}
            />
        </Box>
    );
};
export default Withdrawal;
