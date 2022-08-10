import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import "../../styles/Home.module.css";
import Sidebar from "../../components/Sidebar";
import Project from "../../components/Project";
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonProject from "../../components/SkeletonProject";
import Footer from "../../components/Footer";
const Governance = () => {
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            let res = await axios.get(
                "http://localhost:3000/api/projects/fetch"
            );
            setProjectList(res.data);
        };
        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);
        fetchProjects();
    }, []);

    return (
        <>
            <Box
                maxWidth={"6xl"}
                width="100%"
                m="auto"
                minHeight="100vh"
                py="2.5vh"
            >
                <Sidebar active="Governance" />
                <Box
                    width="100%"
                    height="100%"
                    ml="75px"
                    p="1.5rem 3rem 3rem 3rem"
                >
                    <PageHeader
                        title="Governance"
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                    />
                    <Box w="100%" mt="15px">
                        <Text color="gray.600" fontWeight="semibold">
                            Participating DAOs
                        </Text>
                        <SimpleGrid spacingX="25px" spacingY="25px" columns="3">
                            <Project
                                title="Project Name"
                                desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"
                                src="/../public/unnamed.jpg"
                                actionLabel="View Activity"
                                href={""}
                                contractAdd=""
                            />
                        </SimpleGrid>
                    </Box>
                    <Box w="100%" mt="15px">
                        <Text color="gray.600" fontWeight="semibold">
                            Explore DAOs
                        </Text>
                        <SimpleGrid spacingX="25px" spacingY="25px" columns="3">
                            {projectList.length > 0 &&
                                projectList.map((currentProject, index) => (
                                    <Project
                                        key={index}
                                        title={currentProject.name}
                                        desc={currentProject.description}
                                        src={currentProject.thumbnailSrc}
                                        actionLabel="View Activity"
                                        href={`governance/${currentProject.contractAddress}`}
                                        contractAdd={currentProject.contractAddress}
                                    />
                                ))}
                            {projectList.length === 0 &&
                                [0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                    <SkeletonProject key={n} />
                                ))}
                        </SimpleGrid>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default Governance;
