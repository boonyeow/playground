import {
    Box,
    Button,
    Center,
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
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonProject from "../../components/SkeletonProject";
import React from 'react'

const Explore = () => {
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });
    const [projectList, setProjectList] = useState([]);
    const [lastKey, setLastKey] = useState([]);

    const fetchProjects = async () => {
        let res = await axios.get(
            `http://localhost:3000/api/projects/pagination?lastEvaluatedKey=${JSON.stringify(lastKey)}`
        );

        //Merge the new project list with the current project list
        var newProjectList = projectList;
        const data = res['data']['projects'];
        if (Object.keys(data).length > 0 && Object.keys(projectList).length > 0) {
            var startKey = Object.keys(newProjectList).length;
            for (var project in data) {
                newProjectList[startKey] = data[project];
                startKey = startKey + 1;
            }
        }

        setLastKey(res['data']['lastEvaluatedKey']);
        if (Object.keys(projectList).length == 0) {
            setProjectList(res['data']['projects']);
        } else {
            setProjectList(newProjectList);
        }
    };

    useEffect(() => {
        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);
        fetchProjects();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[lastKey])

    const handleScroll = () => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        if (bottom) {
          if (lastKey != undefined ) {
            fetchProjects()
          }
        }
    };

    return (
        <>
            <Box maxWidth={"6xl"} width="100%" m="auto" minH="110vh" pt="2.5vh">
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
                            {projectList.length > 0 &&
                                projectList.map((currentProject, index) => (
                                    <Project
                                        key={index}
                                        title={currentProject.name}
                                        desc={currentProject.description}
                                        src={currentProject.thumbnailSrc}
                                        actionLabel="View Project"
                                        href={`explore/${currentProject.contractAddress}`}
                                        contractAdd={currentProject.contractAddress}
                                    />
                                ))}
                            {projectList.length == 0 &&
                                [0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                    <SkeletonProject key={n} />
                                ))}
                            {!(lastKey == undefined || lastKey == []) ?
                                [0, 1, 2].map((n) => (
                                    <SkeletonProject key={n} />
                                )):<></>
                            }
                        </SimpleGrid >
                        {(lastKey == undefined || lastKey == []) ?
                            <Center w='100%' m='2.5rem'>
                                <Text fontWeight='semibold'>End of list! You've viewed {Object.keys(projectList).length} projects.</Text>
                            </Center>:<></>
                        }
                    </Box>
                </Box>
            </Box>
            {/* <Footer /> */}
        </>
    );
};
export default Explore;
