import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import CreateProjectModal from "../../components/CreateProjectModal";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import SingleCollection from "../../components/SingleCollection";

const ManageCollection = () => {
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
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
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
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
        },
    ];

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Navbar />
            <Box maxWidth={"8xl"} m="auto">
                <Box padding="5rem" width="100%" height="100%">
                    <Flex justifyContent={"space-between"} alignItems="center">
                        <Heading textAlign={"left"}>Manage Projects</Heading>

                        <Heading
                            textAlign={"right"}
                            fontSize="md"
                            alignItems={"center"}
                            fontWeight="500"
                            color="gray.500"
                            onClick={onOpen}
                            _hover={{
                                cursor: "pointer",
                            }}
                        >
                            Create project
                        </Heading>
                    </Flex>
                    <Box padding="1rem">
                        <Stack
                            direction={[
                                "column",
                                "column",
                                "column",
                                "row",
                                "row",
                            ]}
                            alignItems="center"
                            justifyContent={"center"}
                        >
                            <SimpleGrid
                                columns={[1, 1, 1, 3, 3]}
                                spacing={[5, 5, 5, 5, 5]}
                                py="2rem"
                            >
                                {collectionList.map(
                                    (currentCollection, index) => (
                                        <SingleCollection
                                            asNextLink={true}
                                            path="manage"
                                            data={currentCollection}
                                            key={index}
                                            _hover={{
                                                cursor: "pointer",
                                                transform: "scale(1.05)",
                                                boxShadow:
                                                    "var(--chakra-shadows-2xl)",
                                            }}
                                        />
                                    )
                                )}
                            </SimpleGrid>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <CreateProjectModal onClose={onClose} isOpen={isOpen} />
            <Footer />
        </>
    );
};

export default ManageCollection;
