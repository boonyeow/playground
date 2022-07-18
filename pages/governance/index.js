import { Box, Flex } from "@chakra-ui/react";
import "../../styles/Home.module.css";
import HomeContent from "../../components/Home/HomeContent";
import Sidebar from "../../components/Sidebar";
import GovernanceContent from "../../components/Governance/GovernanceContent";
export default function Governance() {
    return (
        <>
            {/* <Navbar /> */}
            <Flex></Flex>
            <Box maxWidth={"6xl"} width="100%" m="auto" h="150vh" pt="2.5vh">
                <Sidebar active="Governance"/>
                <GovernanceContent />
            </Box>
            {/* <Footer /> */}
        </>
    );
}
