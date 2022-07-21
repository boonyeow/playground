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
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
const LaunchpadContent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [walletAddress, setWalletAddress] = useState(0);
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        const temp = localStorage.getItem("USER_WALLET_ADDRESS");
        setWalletAddress(temp);
        axios
            .get(`http://localhost:3000/api/projects?userAddress=${temp}`)
            .then((res) => setProjectList(res.data));
    }, []);

    // const collectionList = [
    //     {
    //         contractAddress: "cx23902903999",
    //         src: "/../public/4.avif",
    //         collectionLabel: "Featured",
    //         collectionTitle: "Bored Ape Yacht ClubBored Ape",
    //         collectionOwner: "@bytan",
    //         mintPrice: "150",
    //         shortDesc:
    //             "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    //     },
    //     {
    //         contractAddress: "cx23902903998",
    //         src: "/../public/5.avif",
    //         collectionLabel: "Featured",
    //         collectionTitle: "Bored Ape Yacht Club",
    //         collectionOwner: "@bytan",
    //         mintPrice: "150",
    //         shortDesc:
    //             "inter took a galley of type and scrfive centuries, but also the leap into electronic",
    //     },

    //     {
    //         contractAddress: "cx23902903997",
    //         src: "/../public/6.avif",
    //         collectionLabel: "Featured",
    //         collectionTitle:
    //             "Bored Ape Yacht ClubBored Ape Yacht ClubBored Ape Yacht Club",
    //         collectionOwner: "@bytan",
    //         mintPrice: "150",
    //         shortDesc:
    //             "wn printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    //     },
    // ];

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
            {projectList.map((currentCollection, index) => (
                <LaunchpadProject
                    key={index}
                    title={currentCollection.name}
                    addr={currentCollection.contractAddress}
                    src={currentCollection.thumbnail}
                    actionLabel="View Project"
                />
            ))}
            <NewProjectModal onClose={onClose} isOpen={isOpen} />
        </SimpleGrid>
    );

    return (
        <Box width="100%" height="100%" ml="75px" p="1.5rem 3rem 3rem 3rem">
            <PageHeader
                title="Launchpad"
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
            />
            <Box w="100%" mt="15px">
                <Text color="gray.600" fontWeight="semibold">
                    My projects
                </Text>
                {walletAddress ? loggedInView : loggedOutView}
            </Box>
        </Box>
    );
};

export default LaunchpadContent;
