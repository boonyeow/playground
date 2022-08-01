import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    VStack,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import "../../styles/Home.module.css";
import Project from "../../components/Project";
import Sidebar from "../../components/Sidebar";
import ExploreContent from "../../components/Explore/ExploreContent";
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";
import axios from "axios";

const Explore = () => {
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
            {/* <Navbar /> */}
            <Flex></Flex>
            <Box maxWidth={"6xl"} width="100%" m="auto" h="150vh" pt="2.5vh">
                <Sidebar active="Explore" />
                <Box
                    width="100%"
                    height="100%"
                    ml="75px"
                    p="1.5rem 3rem 3rem 3rem"
                >
                    <PageHeader
                        title="Explore"
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                    />
                    <Box w="100%" mt="15px">
                        <Box display="inline-flex">
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={
                                        <AiOutlineSearch color="gray.300" />
                                    }
                                />
                                <Input
                                    placeholder="Search a project"
                                    borderRadius="15px"
                                />
                            </InputGroup>
                        </Box>
                        <SimpleGrid
                            spacingX="25px"
                            spacingY="25px"
                            columns="3"
                            mt="5px"
                        >
                            {projectList.map((currentProject, index) => (
                                <Project
                                    key={index}
                                    title={currentProject.name}
                                    desc={currentProject.description}
                                    src={currentProject.thumbnailSrc}
                                    actionLabel="View Project"
                                    href={`explore/${currentProject.contractAddress}`}
                                />
                            ))}
                        </SimpleGrid>
                    </Box>
                </Box>
                {/* <ExploreContent /> */}
            </Box>
            {/* <Footer /> */}
        </>
    );
};
export default Explore;
