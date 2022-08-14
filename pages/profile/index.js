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
    useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";
import SingleListing from "../../components/SingleListing";
import axios from "axios";
import cfg from "../../util/config";
import IconService from "icon-sdk-js";
import ICONexConnection from "../../util/interact";
import SkeletonProject from "../../components/SkeletonProject";


const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });
    const connection = new ICONexConnection();
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
            <Box maxWidth={"8xl"} width="100%" m="auto" h="150vh" pt="2.5vh">
                <Sidebar />
                <Box
                    width="100%"
                    height="100%"
                    ml="75px"
                    p="1.5rem 3rem 3rem 3rem"
                >
                    <PageHeader
                        title="Profile"
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                    />
                    <Box w="100%" mt="15px">
                        <Text color="gray.600" fontWeight="semibold">
                            Participating DAOs
                        </Text>
                        <SimpleGrid
                            columns="5"
                            spacingX="25px"
                            mt="15px"
                            width="100%"
                            spacingY="20px"
                        >
                            {involvedProjects.length > 0 &&
                                involvedProjects.map(
                                    (currentProject, index) => {
                                        return (
                                            <SingleListing
                                                key={index}
                                                title={currentProject.name}
                                                src={
                                                    currentProject.thumbnailSrc
                                                }
                                                seed={
                                                    currentProject.contractAddress
                                                }
                                            />
                                        );
                                    }
                                )}
                            {involvedProjects.length == 0 &&
                                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((n) => (
                                    <SkeletonProject key={n} />
                                ))}
                        </SimpleGrid>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Profile;
