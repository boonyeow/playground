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
import { AiOutlineSearch } from "react-icons/ai";
import PageHeader from "../../components/PageHeader";
import LaunchpadProject from "../LaunchpadProject";
import NextImage from "next/image";
import CreateProjectModal from "../CreateProjectModal";
import NewProjectModal from "./NewProjectModal";
import { useEffect, useState } from "react";
const LaunchpadContent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });

    useEffect(() => {
        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);
    }, []);

    let loggedOutView = (
        <Text fontWeight="bold" color="red.500">
            No projects found. Please login to continue
        </Text>
    );

    let loggedInView = (
        <SimpleGrid spacingX="25px" spacingY="25px" columns="3" mt="5px">
            <Flex
                mt="10px"
                borderRadius="15px"
                p="30px"
                bg="gray.900"
                _hover={{ cursor: "pointer" }}
                onClick={onOpen}
            >
                <Box color="gray.900">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Text
                            fontWeight="semibold"
                            fontSize="3xl"
                            color="white"
                        >
                            Start a project
                        </Text>
                    </Flex>
                </Box>
            </Flex>
            {userInfo.projectsDeployed.map((currentCollection, index) => (
                <LaunchpadProject
                    key={index}
                    title={currentCollection.name}
                    addr={currentCollection.contractAddress}
                    src={currentCollection.thumbnail}
                    actionLabel="View Project"
                />
            ))}
            <NewProjectModal
                onClose={onClose}
                isOpen={isOpen}
                userInfo={userInfo}
            />
        </SimpleGrid>
    );

    return (
        <Box width="100%" height="100%" ml="75px" p="1.5rem 3rem 3rem 3rem">
            <PageHeader
                title="Launchpad"
                userInfo={userInfo}
                setUserInfo={setUserInfo}
            />
            <Box w="100%" mt="15px">
                <Text color="gray.600" fontWeight="semibold">
                    My projects
                </Text>
                {userInfo.userAddress ? loggedInView : loggedOutView}
            </Box>
        </Box>
    );
};

export default LaunchpadContent;
