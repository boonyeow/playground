import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import "../../styles/Home.module.css";
import Sidebar from "../../components/Sidebar";
import Project from "../../components/Project";
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonProject from "../../components/SkeletonProject";
import Footer from "../../components/Footer";
import cfg from "../../util/config";
import IconService from "icon-sdk-js";
import ICONexConnection from "../../util/interact";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const Governance = () => {
    const connection = new ICONexConnection();
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });
    const [projectList, setProjectList] = useState([]);
    const [involvedProjects, setInvolvedList] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            let res = await axios.get(`${cfg.BASE_URL}/api/projects/fetch`);
            setProjectList(res.data);
        };

        const getBalance = async (contractAddress) => {
            const call = new IconBuilder.CallBuilder()
                .method("balanceOf")
                .to(contractAddress)
                .params({ _owner: userInfo.userAddress })
                .build();
            return await connection.iconService.call(call).execute();
        };

        if (userInfo.userAddress === 0) {
            const temp = localStorage.getItem("_persist");
            temp = temp == null ? userInfo : JSON.parse(temp);
            setUserInfo(temp);
            fetchProjects();
        }

        if (projectList.length > 0) {
            const involvedProjectsData = [];
            let promises = [];
            for (var i = 0; i < projectList.length; i++) {
                promises.push(getBalance(projectList[i].contractAddress));
            }
            Promise.all(promises).then((res) => {
                for (var j = 0; j < res.length; j++) {
                    if (IconConverter.toNumber(res[j]) > 0) {
                        involvedProjectsData.push(projectList[j]);
                    }
                }
                setInvolvedList(involvedProjectsData);
            });
        }
    }, [projectList]);

    return (
        <>
            <Box
                maxWidth={"8xl"}
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
                            {involvedProjects.length > 0 &&
                                involvedProjects.map(
                                    (currentProject, index) => {
                                        return (
                                            <Project
                                                key={index}
                                                title={currentProject.name}
                                                desc={
                                                    currentProject.description
                                                }
                                                src={
                                                    currentProject.thumbnailSrc
                                                }
                                                actionLabel="View Activity"
                                                href={`governance/${currentProject.contractAddress}`}
                                                contractAddr={
                                                    currentProject.contractAddress
                                                }
                                            />
                                        );
                                    }
                                )}
                            {involvedProjects.length == 0 &&
                                [0, 1, 2].map((n) => (
                                    <SkeletonProject key={n} />
                                ))}
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
                                        contractAddr={
                                            currentProject.contractAddress
                                        }
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
