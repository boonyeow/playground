import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import HomeContent from "../components/Home/HomeContent";
import "../styles/Home.module.css";
// import Footer from "../components/Footer";
export default function Home() {
    return (
        <>
            <Navbar />
            <Box maxWidth={"8xl"} m="auto">
                <HomeContent />

                <Heading px="3rem">How does Launchpad work?</Heading>
            </Box>
            {/* <Footer /> */}
        </>
    );
}
