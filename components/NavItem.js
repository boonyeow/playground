import React from "react";
import {
    Flex,
    Text,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

const NavItem = ({ icon, title, description, active, navSize, href }) => {
    return (
        <Flex
            mt={15}
            flexDir="column"
            w="100%"
            alignItems={navSize == "sm" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <NextLink href={href}>
                    <Link
                        color={active ? "primary" : "white"}
                        backgroundColor={active ? "white" : "none"}
                        p="0.75rem 0.75rem 0.5rem 0.75rem"
                        borderRadius={8}
                        _hover={{
                            textDecor: "none",
                            backgroundColor: "white",
                            color: "primary",
                        }}
                        w={navSize == "lg" && "100%"}
                    >
                        <MenuButton w="100%">
                            <Flex>
                                <Icon as={icon} fontSize="xl" mt="1px" />
                                <Text
                                    ml={5}
                                    display={navSize == "sm" ? "none" : "flex"}
                                >
                                    {title}
                                </Text>
                            </Flex>
                        </MenuButton>
                    </Link>
                </NextLink>
            </Menu>
        </Flex>
    );
};

export default NavItem;
