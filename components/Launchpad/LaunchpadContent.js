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
import LaunchpadProject from "../LaunchpadProject";
import NextImage from "next/image";

const LaunchpadContent = () => {
    const collectionList = [
        {
            contractAddress: "cx23902903999",
            src: "/../public/4.avif",
            collectionLabel: "Featured",
            collectionTitle: "Bored Ape Yacht ClubBored Ape",
            collectionOwner: "@bytan",
            mintPrice: "150",
            shortDesc:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
        },
        {
            contractAddress: "cx23902903998",
            src: "/../public/5.avif",
            collectionLabel: "Featured",
            collectionTitle: "Bored Ape Yacht Club",
            collectionOwner: "@bytan",
            mintPrice: "150",
            shortDesc:
                "inter took a galley of type and scrfive centuries, but also the leap into electronic",
        },

        {
            contractAddress: "cx23902903997",
            src: "/../public/6.avif",
            collectionLabel: "Featured",
            collectionTitle:
                "Bored Ape Yacht ClubBored Ape Yacht ClubBored Ape Yacht Club",
            collectionOwner: "@bytan",
            mintPrice: "150",
            shortDesc:
                "wn printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
        },
    ];
    
    return (
        <>
            <Box width="100%" height="100%" ml="75px" p="1.5rem 3rem 3rem 3rem">
                <Flex alignItems="center" justifyContent="space-between">
                    <Text fontSize="4xl" fontWeight="bold">
                        Launchpad
                    </Text>
                    <Button bg="primary" color="white">
                        Sign in
                    </Button>
                </Flex>
                <Box w="100%" mt="15px">
                    <SimpleGrid
                        spacingX="25px"
                        spacingY="25px"
                        columns="3"
                        mt="5px"
                    >
                        <Flex
                            mt="10px"
                            borderRadius="15px"
                            p="30px"
                            bg="gray.900"
                        >
                            <Box color="gray.900">
                                <Flex justifyContent="space-between" alignItems="center">
                                    <Text fontWeight="semibold" fontSize="xl" color="white">
                                        Create Project
                                    </Text>
                                </Flex>
                            </Box>
                        </Flex>
                        {collectionList.map(
                            (currentCollection, index) => (
                                <LaunchpadProject
                                    key={index}
                                    title={currentCollection.collectionTitle}
                                    addr={currentCollection.contractAddress}
                                    src={currentCollection.src}
                                    actionLabel="View Activity"
                                />
                            )
                        )}
                    </SimpleGrid>
                </Box>
            </Box>
        </>
    );
};

export default LaunchpadContent;