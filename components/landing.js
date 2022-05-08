import {
    Box,
    Container,
    Heading,
    Link,
    Text,
    HStack,
    Stack,
    Icon,
    Button,
    Center,
    Flex,
} from "@chakra-ui/react";
import Image from "next/image";
import { AddIcon, InfoOutlineIcon, PlusSquareIcon } from "@chakra-ui/icons";
const Landing = () => {
    return (
        <>
            <HStack justifyContent="center" minH={"80vh"}>
                <Stack
                    w={{ base: "100%", md: "50%" }}
                    align={["center", "center", "flex-start", "flex-start"]}
                >
                    <Heading
                        lineHeight={"default"}
                        fontSize={["6xl", "6xl", "6xl", "6xl", "8xl"]}
                        fontWeight="bold"
                        color="#0f1419"
                        bgGradient="linear(to-l, #FFC856, #FF9465, #FF618C, #F747BB, #9C55E3)"
                        bgClip="text"
                    >
                        <Text>Kickstart your</Text>
                        <Text mt="-16">project now.</Text>
                    </Heading>
                    <Text
                        pt="0.5rem"
                        fontSize="xl"
                        color="gray.500"
                        lineHeight={1}
                    >
                        Launchpad is an NFT-based crowdfunding platform for
                        content creators and entrepreneurs.
                    </Text>
                    <HStack display="block" spacing={8} pt={8}>
                        <Button
                            size="xl"
                            variant="homepage-button"
                            leftIcon={<AddIcon />}
                        >
                            Create
                        </Button>
                        <Button size="xl">Learn More</Button>
                    </HStack>
                </Stack>
                <Box
                    w={{ base: "80%", sm: "60%", md: "40%" }}
                    h={"80%"}
                    mb={{ base: 12, md: 0 }}
                >
                    <Box
                        height="540px"
                        bgGradient="linear-gradient(to right top, #b0ceff, #c7c5fb, #dfbbf0, #f2b2dd, #ffacc5)"
                        rounded="1rem"
                        shadow="2xl"
                    >
                        <Image
                            src="/../public/8.gif"
                            height="100%"
                            width="100%"
                            layout="responsive"
                            objectFit="contain"
                            rounded="1rem"
                        ></Image>
                    </Box>
                </Box>
            </HStack>
        </>
    );
};

export default Landing;
