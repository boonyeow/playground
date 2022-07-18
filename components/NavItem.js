import React from "react";
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList,
} from "@chakra-ui/react";

const NavItem = ({ icon, title, description, active, navSize }) => {
    return (
        <Flex
            mt={15}
            flexDir="column"
            w="100%"
            alignItems={navSize == "sm" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    color="white"
                    backgroundColor={active && "white"}
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
                <MenuList py={0} border="none" w={200} h={200} ml={5}>
                    {/* <NavHoverBox title={title} icon={icon} description={description} /> */}
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default NavItem;
