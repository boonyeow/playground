import { SettingsIcon } from "@chakra-ui/icons";
import { Avatar, Divider, Flex, IconButton, MenuIcon } from "@chakra-ui/react";
import { useState } from "react";
import {
    AiOutlineMenu,
    AiFillHome,
    AiTwotoneBank,
    AiOutlineSearch,
    AiFillSetting,
} from "react-icons/ai";
import NavItem from "./NavItem.js";

export default function Sidebar() {
    const [navSize, setNavSize] = useState("sm");

    return (
        <Flex
            pos="fixed"
            h="95vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "sm" ? "15px" : "30px"}
            w={navSize == "sm" ? "75px" : "200px"}
            flexDir="column"
            bg="primary"
            justifyContent="space-between"
            transition="0.2s ease"
            zIndex="1"
        >
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
                    icon={<AiOutlineMenu />}
                    onClick={() => {
                        if (navSize == "sm") setNavSize("lg");
                        else setNavSize("sm");
                    }}
                ></IconButton>
                <NavItem
                    navSize={navSize}
                    icon={AiFillHome}
                    title="Home"
                ></NavItem>
                <NavItem
                    navSize={navSize}
                    icon={AiOutlineSearch}
                    title="Explore"
                ></NavItem>
                <NavItem
                    navSize={navSize}
                    icon={AiTwotoneBank}
                    title="Governance"
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
    );
}
