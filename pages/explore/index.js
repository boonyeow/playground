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
import "../../styles/Home.module.css";
import Sidebar from "../../components/Sidebar";
import ExploreContent from "../../components/Explore/ExploreContent";
export default function Home() {
    return (
        <>
            {/* <Navbar /> */}
            <Flex></Flex>
            <Box maxWidth={"6xl"} width="100%" m="auto" h="150vh" pt="2.5vh">
                <Sidebar />

                <ExploreContent />
            </Box>
            {/* <Footer /> */}
        </>
    );
}
