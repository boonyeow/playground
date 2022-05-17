import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function Explore() {
    return (
        <>
            <Navbar />
            <Box maxWidth={"8xl"} m="auto" pt="3rem">
                <Heading px="3rem">Explore Projects</Heading>
                <VStack>
                    <HStack py="2rem" spacing={8}>
                        <Box
                            height="20rem"
                            width="20rem"
                            bgGradient="linear-gradient(to right top, #b0ceff, #c7c5fb, #dfbbf0, #f2b2dd, #ffacc5)"
                            rounded="1rem"
                            shadow="2xl"
                        ></Box>
                        <Box
                            height="20rem"
                            width="20rem"
                            bgGradient="linear-gradient(to right top, #b0ceff, #c7c5fb, #dfbbf0, #f2b2dd, #ffacc5)"
                            rounded="1rem"
                            shadow="2xl"
                        ></Box>
                        <Box
                            height="20rem"
                            width="20rem"
                            bgGradient="linear-gradient(to right top, #b0ceff, #c7c5fb, #dfbbf0, #f2b2dd, #ffacc5)"
                            rounded="1rem"
                            shadow="2xl"
                        ></Box>
                        <Box
                            height="20rem"
                            width="20rem"
                            bgGradient="linear-gradient(to right top, #b0ceff, #c7c5fb, #dfbbf0, #f2b2dd, #ffacc5)"
                            rounded="1rem"
                            shadow="2xl"
                        ></Box>
                    </HStack>
                </VStack>
            </Box>
        </>
    );
}
