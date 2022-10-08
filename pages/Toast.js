import {
    Box,
    Button,
    CloseButton,
    Flex,
    HStack,
    IconButton,
    Link,
    Text,
    useDisclosure,
    VStack,
    Image,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    Stack,
    Divider,
    ModalFooter,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlinePlus, AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import NextLink from "next/link";
import { useRouter } from "next/router";
import ICONexConnection from "../util/interact.js";
import axios from "axios";
import IconService from "icon-sdk-js";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

function Headers() {
    const connection = new ICONexConnection();
    const toast = useToast();
    const router = useRouter();

    const mobileNav = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [walletAddress, setWalletAddress] = useState(0);

    useEffect(() => {
        setWalletAddress(localStorage.getItem("USER_WALLET_ADDRESS"));
    }, []);

    const connectWallet = async () => {
        let userAddress = await connection.ICONexRequest("REQUEST_ADDRESS");

        // Retrieve record with userAddress from DynamoDB
        let res = await axios.get(
            `${cfg.BASE_URL}/api/users?userAddress=${userAddress}`
        );

        // Check if user is registered. If not, onboard them
        if (res.data === "") {
            res = await axios.post(`${cfg.BASE_URL}/api/users`, {
                userAddress: userAddress,
            });
            console.log("not found hehe", res);
        }

        // Proceed to build MessageTransaction instance
        let nonce = res.data.nonce;
        const txObj = new IconBuilder.MessageTransactionBuilder()
            .from(userAddress)
            .to(userAddress)
            .stepLimit(IconConverter.toBigNumber(100000))
            .nid(IconConverter.toBigNumber(3))
            .nonce(IconConverter.toBigNumber(nonce))
            .version(IconConverter.toBigNumber(3))
            .build();

        const rawTransaction = IconConverter.toRawTransaction(txObj);
        const txHash = IconService.IconUtil.serialize(rawTransaction);
        console.log(txHash);
        const payload = {
            id: "1234",
            jsonrpc: "2.0",
            method: "icx_sendTransaction",
            hash: txHash,
        };
        let rpcResponse = await connection.ICONexRequest(
            "REQUEST_SIGNING",
            payload
        );

        if (rpcResponse.hasOwnProperty("error")) {
            alert("user cancelled signing request");
            return;
        }

        // Proceed to retrieve signature, txhash, address and send POST to /auth
        let authRes = await axios.post(`${cfg.BASE_URL}/api/auth`, {
            userAddress: userAddress,
            signature: rpcResponse,
            txHash: txHash,
        });
        console.log(authRes);
        localStorage.setItem("accessToken", authRes.data.token);
        setWalletAddress(userAddress);
        isOpen = false;
        onClose();
        toast({
            id: "test-toast",
            title: "Connected to wallet!",
            position: "bottom-right",
            status: "success",
            duration: 1000,
            isClosable: true,
        });
    };

    const disconnectWallet = () => {
        setWalletAddress(0);
        localStorage.removeItem("accessToken");
    };
    const mobileView = (
        <VStack
            pos="fixed"
            top={0}
            left={0}
            right={0}
            display={mobileNav.isOpen ? "flex" : "none"}
            flexDirection="column"
            p={2}
            pb={4}
            m={2}
            bg="white"
            spacing={3}
            rounded="sm"
            shadow="sm"
        >
            <CloseButton
                aria-label="Close menu"
                alignSelf={"end"}
                onClick={mobileNav.onClose}
            />
            <Button
                w="full"
                variant="homepage-button"
                onClick={walletAddress ? disconnectWallet : onOpen}
            >
                {walletAddress ? "Disconnect" : "Sign In"}
            </Button>
            <Button w="full" leftIcon={<AiOutlineHome />}>
                Homepage
            </Button>
            <Button
                w="full"
                leftIcon={<MdOutlineExplore style={{ marginTop: "0.1rem" }} />}
            >
                Explore projects
            </Button>
            <Button w="full" leftIcon={<AiOutlinePlus />}>
                Start a project
            </Button>
        </VStack>
    );

    return (
        <>
            <Box
                pos="fixed"
                as="header"
                bgColor="rgba(255,255,255,0.9)"
                backdropFilter={"blur(5px)"}
                transition="box-shadow 0.2s"
                w="full"
                overflowY="hidden"
                boxShadow="inset 0px -1px 0px #f3f3f4"
                zIndex="1"
                top={0}
            >
                <Box maxWidth="90rem" h="4.5rem" mx="auto">
                    <Flex
                        w="full"
                        h="full"
                        px="6"
                        align="center"
                        justify="space-between"
                    >
                        <Flex align="center">
                            <Link href="/Toast">
                                <HStack>
                                    <Image src="/logo.png" width="150px" />
                                </HStack>
                            </Link>
                        </Flex>

                        <Flex
                            justify="flex-end"
                            w="full"
                            maxW="60rem"
                            align="center"
                            color="gray.400"
                        >
                            <HStack
                                spacing="2"
                                display={{ base: "none", md: "flex" }}
                                color="gray.600"
                            >
                                <NextLink href="/Toast">
                                    <Button
                                        variant="ghost"
                                        fontWeight={
                                            router.pathname === "/Toast"
                                                ? "bold"
                                                : "unset"
                                        }
                                    >
                                        Home
                                    </Button>
                                </NextLink>
                                <NextLink href="/collection">
                                    <Button
                                        variant="ghost"
                                        fontWeight={
                                            router.pathname === "/collection"
                                                ? "bold"
                                                : "unset"
                                        }
                                    >
                                        Explore
                                    </Button>
                                </NextLink>
                                <NextLink href="/collection">
                                    <Button
                                        variant="ghost"
                                        fontWeight={
                                            router.pathname === "/collection"
                                                ? "bold"
                                                : "unset"
                                        }
                                    >
                                        Start a project
                                    </Button>
                                </NextLink>
                            </HStack>
                            <Button
                                size="md"
                                ml={10}
                                onClick={
                                    walletAddress ? disconnectWallet : onOpen
                                }
                                variant="homepage-button"
                                display={[
                                    "none",
                                    "none",
                                    "flex",
                                    "flex",
                                    "flex",
                                ]}
                            >
                                {walletAddress ? "Disconnect" : "Sign In"}
                            </Button>
                            <IconButton
                                display={{ base: "flex", md: "none" }}
                                aria-label="Open menu"
                                fontSize="20px"
                                color="gray.800"
                                variant="ghost"
                                icon={<AiOutlineMenu />}
                                onClick={mobileNav.onOpen}
                            />
                        </Flex>
                    </Flex>
                </Box>
            </Box>
            {mobileView}
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
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
                        Sign In
                    </ModalHeader>
                    <ModalBody px={10} pb={6}>
                        <Stack spacing={3}>
                            <Button variant="cw-button" onClick={connectWallet}>
                                ICONex / Hana
                            </Button>
                            <Button variant="cw-button">Bridge</Button>
                        </Stack>
                    </ModalBody>
                    <Divider width="80%" margin="auto" />
                    <ModalFooter
                        textAlign={"center"}
                        fontWeight="500"
                        px={10}
                        pb={12}
                    >
                        <Stack w="100%">
                            <Text>Don&apos;t have a wallet?</Text>
                            <Button
                                variant="homepage-button"
                                onClick={() => {
                                    window.open(
                                        "https://www.icondev.io/getting-started/how-to-create-an-icon-account",
                                        "_blank"
                                    );
                                }}
                            >
                                Get started here
                            </Button>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box
                as="section"
                bgColor="gray.50"
                w="full"
                minHeight="calc(150vh - 4.5rem)"
            ></Box>
        </>
    );
}
export default function Toast() {
    return (
        <>
            <Headers />
        </>
    );
}
