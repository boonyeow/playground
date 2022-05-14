import { Box, Container } from "@chakra-ui/layout";
import {
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
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
    AiOutlineUser,
    AiOutlineSetting,
    AiOutlineQuestion,
    AiOutlineLogout,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import ICONexConnection from "../util/interact.js";

const Navbar = () => {
    const connection = new ICONexConnection();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const id = "test-toast";
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
                id,
                title: "Connected to wallet!",
                position: "top-right",
                status: "success",
                duration: 1000,
                isClosable: true,
            });
        }
    };

    const disconnectWallet = () => {
        setWalletAddress(0);
        localStorage.removeItem("USER_WALLET_ADDRESS");
    };

    let loggedOutView = (
        <Button variant="gs-button" my="auto" ml="auto" onClick={onOpen}>
            Sign In
        </Button>
    );

    let loggedInView = (
        <Menu>
            <MenuButton my="auto">
                <Avatar size={"sm"} />
            </MenuButton>
            <MenuList>
                <MenuItem>
                    <Icon as={AiOutlineUser} mr="12px" />
                    Profile
                </MenuItem>
                <MenuItem>
                    <Icon as={AiOutlineSetting} mr="12px" />
                    Settings
                </MenuItem>
                <MenuItem>
                    <Icon as={AiOutlineQuestion} mr="12px" />
                    FAQ
                </MenuItem>
                <MenuItem onClick={disconnectWallet}>
                    <Icon as={AiOutlineLogout} mr="12px" />
                    Sign Out
                </MenuItem>
            </MenuList>
        </Menu>
    );

    return (
        <>
            <Box
                maxW="100vw"
                h="72px"
                bgColor="white"
                boxShadow="rgb(4 17 29 / 25%) 0px 0px 8px 0px"
            >
                <Container
                    padding="0 20px"
                    maxW={"8xl"}
                    height="100%"
                    display="flex"
                >
                    <HStack>
                        <Heading my="auto" color="#383838" size="xl">
                            <NextLink href="/">launchpad.</NextLink>
                        </Heading>
                    </HStack>

                    <HStack my="auto" ml="auto">
                        <HStack spacing={10} mr={10}>
                            <NextLink href="/explore" passHref>
                                <Link fontWeight="500">Explore</Link>
                            </NextLink>
                            <NextLink href="/governance" passHref>
                                <Link fontWeight="500">Governance</Link>
                            </NextLink>
                            <NextLink href="/create" passHref>
                                <Link fontWeight="500">Create</Link>
                            </NextLink>
                        </HStack>
                        {walletAddress ? loggedInView : loggedOutView}
                    </HStack>
                </Container>
            </Box>
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
                                variant="gs-button"
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
