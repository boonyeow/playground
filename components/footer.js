import {
    ButtonGroup,
    Container,
    IconButton,
    Stack,
    Heading,
    Box,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <Box
            as="footer"
            py={{ base: "10", md: "10" }}
            px="10"
            bgColor="#0f1419"
            width={"100%"}
        >
            <Heading my="auto" color="white" size="xl" textAlign={"center"}>
                <NextLink href="/">launchpad.</NextLink>
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
    );
};

export default Footer;
