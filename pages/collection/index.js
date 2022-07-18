import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
    Box,
    Heading,
    HStack,
    Select,
    SimpleGrid,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import Footer from "../../components/Footer";
import SingleCollection from "../../components/SingleCollection";

const Collection = () => {
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
    return (
        <>
            <Navbar />
            <Box maxWidth={"8xl"} m="auto" mt="4.5rem">
                <Box padding="5rem" width="100%" height="100%">
                    <Heading as="h1">Explore Projects</Heading>
                    <Tabs variant="unstyled" pt="1rem">
                        <TabList>
                            <Tab
                                borderRadius="2rem"
                                _selected={{
                                    color: "white",
                                    bg: "gray.700",
                                    fontWeight: "500",
                                }}
                            >
                                Ongoing
                            </Tab>
                            <Tab
                                borderRadius="2rem"
                                _selected={{
                                    color: "white",
                                    bg: "gray.700",
                                    fontWeight: "500",
                                }}
                            >
                                Upcoming
                            </Tab>
                            <Tab
                                borderRadius="2rem"
                                _selected={{
                                    color: "white",
                                    bg: "gray.700",
                                    fontWeight: "500",
                                }}
                            >
                                Ended
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
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
                                        spacing={[5, 5, 5, 10, 10]}
                                        py="2rem"
                                    >
                                        {collectionList.map(
                                            (currentCollection, index) => (
                                                <SingleCollection
                                                    path="collection"
                                                    asNextLink={true}
                                                    data={currentCollection}
                                                    key={index}
                                                    _hover={{
                                                        cursor: "pointer",
                                                        transform:
                                                            "scale(1.05)",
                                                        boxShadow:
                                                            "var(--chakra-shadows-2xl)",
                                                    }}
                                                />
                                            )
                                        )}
                                    </SimpleGrid>
                                </Stack>
                            </TabPanel>
                            <TabPanel>
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
                                        spacing={[5, 5, 5, 10, 10]}
                                        py="2rem"
                                    >
                                        {collectionList
                                            .slice(0, 1)
                                            .map((currentCollection, index) => (
                                                <SingleCollection
                                                    path="collection"
                                                    asNextLink={true}
                                                    data={currentCollection}
                                                    key={index}
                                                    _hover={{
                                                        cursor: "pointer",
                                                        transform:
                                                            "scale(1.05)",
                                                        boxShadow:
                                                            "var(--chakra-shadows-2xl)",
                                                    }}
                                                />
                                            ))}
                                    </SimpleGrid>
                                </Stack>
                            </TabPanel>

                            <TabPanel>
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
                                        spacing={[5, 5, 5, 10, 10]}
                                        py="2rem"
                                    >
                                        {collectionList
                                            .slice(0, 2)
                                            .map((currentCollection, index) => (
                                                <SingleCollection
                                                    path="collection"
                                                    asNextLink={true}
                                                    data={currentCollection}
                                                    key={index}
                                                    _hover={{
                                                        cursor: "pointer",
                                                        transform:
                                                            "scale(1.05)",
                                                        boxShadow:
                                                            "var(--chakra-shadows-2xl)",
                                                    }}
                                                />
                                            ))}
                                    </SimpleGrid>
                                </Stack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
            <Footer />
        </>
    );

    // const { query } = useRouter();

    // useEffect(() => {
    //     console.log(query);
    //     // Check if Collection deployed through Launchpad
    //     if (query.cx != "cx23902903999") {
    //         return "go away";
    //     }
    // }, []);

    // let collectionNotFound = <>not found bro</>;
    // return <>{query.cx == "cx23902903999" ? <Navbar /> : collectionNotFound}</>;
};

export default Collection;
