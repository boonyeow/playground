import { Box, Container } from "@chakra-ui/layout";
import {
    Heading,
    Button,
    CloseButton,
    Text,
    Flex,
    Image,
    IconButton,
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
    VStack,
    Portal,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
    AiOutlineUser,
    AiFillDatabase,
    AiOutlineSetting,
    AiOutlineQuestion,
    AiOutlineLogout,
    AiOutlineMenu,
    AiOutlinePlus,
    AiOutlineHome,
} from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { useEffect, useState } from "react";
import ICONexConnection from "../util/interact.js";

const Navbar = () => {
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
        let _walletAddress = await connection.getWalletAddress();
        if (_walletAddress) {
            setWalletAddress(_walletAddress);
            localStorage.setItem("USER_WALLET_ADDRESS", _walletAddress);
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
        }
    };

    const disconnectWallet = () => {
        setWalletAddress(0);
        localStorage.removeItem("USER_WALLET_ADDRESS");
        toast({
            id: "test-toast",
            title: "Disconnected from wallet!",
            position: "bottom-right",
            variant: "subtle",
            duration: 1000,
            isClosable: true,
        });
    };

    let loggedOutView = (
        <Button variant="homepage-button" my="auto" ml="auto" onClick={onOpen}>
            Sign In
        </Button>
    );
    let loggedInView = (
        <Menu>
            <MenuButton my="auto">
                <Avatar size={"sm"} />
            </MenuButton>
            <Portal>
                <MenuList>
                    <NextLink href="/profile" passHref>
                        <MenuItem>
                            <Icon as={AiOutlineUser} mr="12px" />
                            Profile
                        </MenuItem>
                    </NextLink>

                    <NextLink href="/manage" passHref>
                        <MenuItem>
                            <Icon as={AiFillDatabase} mr="12px" />
                            Manage Projects
                        </MenuItem>
                    </NextLink>
                    <MenuItem>
                        <Icon as={AiOutlineQuestion} mr="12px" />
                        FAQ
                    </MenuItem>
                    <MenuItem onClick={disconnectWallet}>
                        <Icon as={AiOutlineLogout} mr="12px" />
                        Sign Out
                    </MenuItem>
                </MenuList>
            </Portal>
        </Menu>
    );

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
            zIndex={1}
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
                backdropFilter={"saturate(180%) blur(5px)"}
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
                            <Link href="/">
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
                                <NextLink href="/">
                                    <Button
                                        variant="ghost"
                                        fontWeight={
                                            router.pathname === "/"
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
                                <NextLink href="/manage">
                                    <Button
                                        variant="ghost"
                                        fontWeight={
                                            router.pathname === "/manage"
                                                ? "bold"
                                                : "unset"
                                        }
                                    >
                                        Start a project
                                    </Button>
                                </NextLink>
                            </HStack>
                            <Box ml={5} mt="0.1rem">
                                {walletAddress ? loggedInView : loggedOutView}
                            </Box>
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
                            <Text>Don't have a wallet?</Text>
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
        </>
    );
};

export default Navbar;
