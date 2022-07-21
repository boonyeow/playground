import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import {
    AiOutlineMenu,
    AiFillHome,
    AiFillSetting,
    AiFillCompass,
} from "react-icons/ai";
import { MdHowToVote } from "react-icons/md";
import { BiRocket } from "react-icons/bi";
import NavItem from "./NavItem.js";

const Sidebar = ({ active }) => {
    const [navSize, setNavSize] = useState("sm");
    const overlay = (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100%"
            zIndex="1"
            bg="rgba(255,255,255,0.2)"
            backdropFilter="blur(8px)"
            // transition="1s cubic-bezier(0.4, 0, 0.2, 1)"
        ></Box>
    );
    return (
        <>
            <Flex
                pos="fixed"
                h="95vh"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                borderRadius={navSize === "sm" ? "15px" : "30px"}
                w={navSize === "sm" ? "75px" : "200px"}
                flexDir="column"
                bg="primary"
                justifyContent="space-between"
                transition="0.2s ease"
                zIndex="2"
            >
                <Flex
                    p="15px"
                    px="5%"
                    flexDir="column"
                    alignItems={navSize === "sm" ? "center" : "flex-start"}
                    as="nav"
                >
                    <IconButton
                        color="white"
                        background="none"
                        mt={5}
                        _hover={{ background: "none" }}
                        icon={<AiOutlineMenu />}
                        onClick={() => {
                            if (navSize === "sm") setNavSize("lg");
                            else setNavSize("sm");
                        }}
                    ></IconButton>
                    <NavItem
                        navSize={navSize}
                        icon={AiFillHome}
                        title="Home"
                        href="/"
                        active={active === "Home" ? true : false}
                    ></NavItem>
                    <NavItem
                        navSize={navSize}
                        icon={AiFillCompass}
                        title="Explore"
                        href="/explore"
                        active={active === "Explore" ? true : false}
                    ></NavItem>
                    <NavItem
                        navSize={navSize}
                        icon={MdHowToVote}
                        title="Governance"
                        href="/governance"
                        active={active === "Governance" ? true : false}
                    ></NavItem>
                    <NavItem
                        navSize={navSize}
                        icon={BiRocket}
                        title="Launchpad"
                        href="/launchpad"
                        active={active === "Launchpad" ? true : false}
                    ></NavItem>
                </Flex>
                <Flex
                    p="15px"
                    px="5%"
                    flexDir="column"
                    alignItems={navSize == "sm" ? "center" : "flex-start"}
                    as="nav"
                >
                    <IconButton
                        color="white"
                        background="none"
                        mt={5}
                        _hover={{ background: "none" }}
                        icon={<AiFillSetting />}
                    ></IconButton>
                </Flex>
            </Flex>
            {navSize === "sm" ? "" : overlay}
        </>
    );
};

export default Sidebar;
