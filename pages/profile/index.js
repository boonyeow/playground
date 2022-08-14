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

        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);
        fetchProjects();

        const getBalance = async (contractAddress) => {
            const call = new IconBuilder.CallBuilder()
                .method("balanceOf")
                .to(contractAddress)
                .params({ _owner: userInfo.userAddress })
                .build();
            return await connection.iconService.call(call).execute();
        };

        if (projectList.length != 0) {
            let counter = 0;
            const involvedProjectsData = [];

            projectList.map((currentProject, index) => {
                if (index != 0) {
                    getBalance(currentProject.contractAddress).then((res) => {
                        if (IconConverter.toNumber(res) > 0) {
                            involvedProjectsData[counter] = JSON.parse(JSON.stringify(currentProject));
                            counter++;
                        }
                    });
                }
            });
            setInvolvedList(involvedProjectsData);
        };
    }, []);

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
                            Owned NFTs
                        </Text>
                        <SimpleGrid
                            columns="4"
                            spacingX="25px"
                            mt="15px"
                            width="100%"
                            spacingY="20px"
                        >
                            {involvedProjects.length > 0 &&
                                involvedProjects.map((currentProject, index) => {
                                    return (
                                        <>
                                            <SingleListing
                                                title={currentProject.name}
                                                src={currentProject.thumbnailSrc}
                                                seed={currentProject.contractAddress}
                                            />
                                        </>
                                    )
                                })
                            }
                        </SimpleGrid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Profile