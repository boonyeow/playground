import { ButtonGroup, IconButton, Stack, Heading, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <Box as="footer" margin="0 auto" maxWidth={"8xl"} w="100%">
            <Box w="100%" ml="75px">
                <Box
                    mx="3rem"
                    bg="#0f1419"
                    py={{ base: "10", md: "10" }}
                    borderTopRadius="15px"
                >
                    <Heading
                        my="auto"
                        color="white"
                        size="xl"
                        textAlign={"center"}
                    >
                        <NextLink href="/">crowd9.</NextLink>
                    </Heading>
                    <Stack spacing={{ base: "4", md: "5" }}>
                        <Stack
                            justify="space-between"
                            direction="row"
                            align="center"
                            justifyContent="center"
                        >
                            <ButtonGroup variant="white" color="white">
                                <IconButton
                                    as="a"
                                    href="#"
                                    aria-label="LinkedIn"
                                    icon={<FaLinkedin fontSize="1.25rem" />}
                                />
                                <IconButton
                                    as="a"
                                    href="#"
                                    aria-label="GitHub"
                                    icon={<FaGithub fontSize="1.25rem" />}
                                />
                                <IconButton
                                    as="a"
                                    href="#"
                                    aria-label="Twitter"
                                    icon={<FaTwitter fontSize="1.25rem" />}
                                />
                            </ButtonGroup>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
