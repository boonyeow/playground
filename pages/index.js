import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import Landing from "../components/landing";
import "../styles/Home.module.css";
import Image from "next/image";
export default function Home() {
    return (
        <>
            <Navbar />
            <Box maxWidth={"8xl"} m="auto">
                <Landing />

                <Heading px="3rem">Upcoming Projects</Heading>
                <VStack>
                    <HStack py="2rem" spacing={8}>
                        <Box
                            height="20rem"
                            width="20rem"
                            // bgGradient="linear-gradient(to right top, #b0ceff, #c7c5fb, #dfbbf0, #f2b2dd, #ffacc5)"
                            rounded="1rem"
                            shadow="2xl"
                        >
                            <Image
                                src="/../public/0.avif"
                                height="100%"
                                width="100%"
                                layout="responsive"
                                objectFit="contain"
                            ></Image>
                        </Box>
                        <Box
                            height="20rem"
                            width="20rem"
                            bgGradient="linear-gradient(to right top, #b0ceff, #c7c5fb, #dfbbf0, #f2b2dd, #ffacc5)"
                            rounded="1rem"
                            shadow="2xl"
                        >
                            <Image
                                src="/../public/1.avif"
                                height="100%"
                                width="100%"
                                layout="responsive"
                                objectFit="contain"
                                style={{
                                    borderRadius: "1rem",
                                    border: "1px solid black",
                                }}
                            ></Image>
                        </Box>
                        <Box
                            height="20rem"
                            width="20rem"
                            bgGradient="linear-gradient(to right top, #b0ceff, #c7c5fb, #dfbbf0, #f2b2dd, #ffacc5)"
                            rounded="1rem"
                            shadow="2xl"
                        >
                            <Image
                                src="/../public/2.avif"
                                height="100%"
                                width="100%"
                                layout="responsive"
                                objectFit="contain"
                            ></Image>
                        </Box>
                        <Box
                            height="20rem"
                            width="20rem"
                            bgGradient="linear-gradient(to right top, #b0ceff, #c7c5fb, #dfbbf0, #f2b2dd, #ffacc5)"
                            rounded="1rem"
                            shadow="2xl"
                        >
                            <Image
                                src="/../public/3.avif"
                                height="100%"
                                width="100%"
                                layout="responsive"
                                objectFit="contain"
                            ></Image>
                        </Box>
                    </HStack>
                </VStack>

                <Heading px="3rem">Active Projects</Heading>
                <VStack>
                    <HStack py="2rem" spacing={8}>
                        <Box
                            height="20rem"
                            width="20rem"
                            bgGradient="linear-gradient(to right top, #b0ceff, #c7c5fb, #dfbbf0, #f2b2dd, #ffacc5)"
                            rounded="1rem"
                            shadow="2xl"
                        >
                            <Image
                                src="/../public/4.avif"
                                height="100%"
                                width="100%"
                                layout="responsive"
                                objectFit="contain"
                            ></Image>
                        </Box>
                        <Box
                            height="20rem"
                            width="20rem"
                            bgGradient="linear-gradient(to right top, #b0ceff, #c7c5fb, #dfbbf0, #f2b2dd, #ffacc5)"
                            rounded="1rem"
                            shadow="2xl"
                        >
                            <Image
                                src="/../public/5.avif"
                                height="100%"
                                width="100%"
                                layout="responsive"
                                objectFit="contain"
                            ></Image>
                        </Box>
                        <Box
                            height="20rem"
                            width="20rem"
                            bgGradient="linear-gradient(to right top, #b0ceff, #c7c5fb, #dfbbf0, #f2b2dd, #ffacc5)"
                            rounded="1rem"
                            shadow="2xl"
                        >
                            <Image
                                src="/../public/6.avif"
                                height="100%"
                                width="100%"
                                layout="responsive"
                                objectFit="contain"
                            ></Image>
                        </Box>
                        <Box
                            height="20rem"
                            width="20rem"
                            bgGradient="linear-gradient(to right top, #b0ceff, #c7c5fb, #dfbbf0, #f2b2dd, #ffacc5)"
                            rounded="1rem"
                            shadow="2xl"
                        >
                            <Image
                                src="/../public/7.avif"
                                height="100%"
                                width="100%"
                                layout="responsive"
                                objectFit="contain"
                            ></Image>
                        </Box>
                    </HStack>
                </VStack>
                <Heading px="3rem">How does Launchpad work?</Heading>
            </Box>
        </>
    );
}
