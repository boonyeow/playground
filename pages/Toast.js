import {
    Box,
    Button,
    CloseButton,
    Flex,
    Heading,
    HStack,
    Icon,
    IconButton,
    Link,
    Text,
    useColorMode,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import HomeContent from "../components/Home/HomeContent";
import "../styles/Home.module.css";
import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import { useViewportScroll } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import {
    AiFillGithub,
    AiFillHome,
    AiOutlineInbox,
    AiOutlineMenu,
} from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";

function Headers() {
    const mobileNav = useDisclosure();
    const text = "dark";

    const bg = "white";
    const ref = useRef();
    const [y, setY] = useState(0);
    const { height = 0 } = ref.current
        ? ref.current.getBoundingClientRect()
        : {};

    const { scrollY } = useViewportScroll();
    useEffect(() => {
        return scrollY.onChange(() => setY(scrollY.get()));
    }, [scrollY]);

    const MobileNavContent = (
        <VStack
            pos="absolute"
            top={0}
            left={0}
            right={0}
            display={mobileNav.isOpen ? "flex" : "none"}
            flexDirection="column"
            p={2}
            pb={4}
            m={2}
            bg={bg}
            spacing={3}
            rounded="sm"
            shadow="sm"
        >
            <CloseButton
                aria-label="Close menu"
                justifySelf="self-start"
                onClick={mobileNav.onClose}
            />
            <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
                Home
            </Button>
            <Button w="full" leftIcon={<AiFillHome />}>
                Explore
            </Button>
            <Button w="full" leftIcon={<AiFillHome />}>
                Governance
            </Button>
        </VStack>
    );
    return (
        <Box pos="relative">
            <Box
                as="header"
                ref={ref}
                shadow={y > height ? "sm" : undefined}
                transition="box-shadow 0.2s"
                bg={bg}
                w="full"
                overflowY="hidden"
                boxShadow="inset 0px -1px 0px #f3f3f4"
            >
                <Box h="4.5rem" mx="auto" maxW="1200px">
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
                                    <Text>launchpad.</Text>
                                </HStack>
                            </Link>
                        </Flex>

                        <Flex
                            justify="flex-end"
                            w="full"
                            maxW="824px"
                            align="center"
                            color="gray.400"
                        >
                            <HStack
                                spacing="5"
                                display={{ base: "none", md: "flex" }}
                            >
                                <Text>Home</Text>
                                <Text>Explore</Text>
                                <Text>Governance</Text>
                            </HStack>
                            <Button size="sm" ml={5}>
                                Sign in
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
                    {MobileNavContent}
                </Box>
            </Box>
        </Box>
    );
}
export default function Toast() {
    return (
        <>
            <Headers />
        </>
    );
}
