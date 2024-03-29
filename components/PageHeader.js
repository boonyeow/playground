import {
    Box,
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
import { useEffect, useState } from "react";
import ICONexConnection from "../util/interact.js";
import NextLink from "next/link";
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
import axios from "axios";
import cfg from "../util/config.js";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const PageHeader = ({ title, userInfo, setUserInfo }) => {
    const connection = new ICONexConnection();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userAdd, setuserAdd] = useState("");

    const connectWallet = async () => {
        let userAddress = await connection.getWalletAddress();
        if (userAddress) {
            let res = await axios.get(
                `${cfg.BASE_URL}/api/projects?userAddress=${userAddress}`
            );

            const temp = {
                userAddress: userAddress,
                projectsDeployed: res.data,
            };
            setUserInfo(temp);

            localStorage.setItem("_persist", JSON.stringify(temp));
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
        setUserInfo({
            userAddress: 0,
            projectsDeployed: [],
        });

        localStorage.removeItem("USER_WALLET_ADDRESS");
        localStorage.removeItem("_persist");
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
        <Button bg="primary" color="white" onClick={onOpen}>
            Sign in
        </Button>
    );

    let loggedInView = (
        <Menu>
            <MenuButton my="auto">
                <Flex padding="2px" borderRadius="25px">
                    {/* <Avatar size={"sm"} bg="black" /> */}
                    {userInfo.userAddress && (
                        <Jazzicon
                            diameter={40}
                            seed={jsNumberForAddress(userInfo.userAddress)}
                        />
                    )}
                </Flex>
            </MenuButton>
            <Portal>
                <MenuList>
                    <NextLink href="/profile" passHref>
                        <MenuItem>
                            <Icon as={AiOutlineUser} mr="12px" />
                            Profile
                        </MenuItem>
                    </NextLink>

                    <NextLink href="/launchpad" passHref>
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

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize="4xl" fontWeight="bold">
                    {title}
                </Text>
                {userInfo.userAddress ? loggedInView : loggedOutView}
            </Flex>
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
        </>
    );
};

export default PageHeader;
