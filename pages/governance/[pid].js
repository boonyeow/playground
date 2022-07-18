import { Box } from "@chakra-ui/react";
import GovernanceInfo from "../../components/Governance/GovernanceInfo";
import Sidebar from "../../components/Sidebar";

const ProjectGovernance = () => {
    return (
        <>
            <Box maxWidth={"6xl"} width="100%" m="auto" h="150vh" pt="2.5vh">
                <Sidebar />
                <GovernanceInfo />
            </Box>
        </>
    );
};

export default ProjectGovernance;
