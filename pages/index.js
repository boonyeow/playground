import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    VStack,
} from "@chakra-ui/react";
import HomeContent from "../components/Home/HomeContent";
import "../styles/Home.module.css";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
export default function Home() {
    return (
        <>
            {/* <Navbar /> */}
            <Flex></Flex>
            <Box maxWidth={"6xl"} width="100%" m="auto" h="150vh" pt="2.5vh">
                <Sidebar active="Home"/>

                <HomeContent />
            </Box>
            {/* <Footer /> */}
        </>
    );
}
