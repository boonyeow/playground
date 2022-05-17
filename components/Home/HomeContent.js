import {
    Box,
    Text,
    HStack,
    VStack,
    Stack,
    Button,
    Heading,
    Flex,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import FeaturedCollection from "../FeaturedCollection";
import CollectionCarousel from "../CollectionCarousel";
import NextLink from "next/link";

const HomeContent = () => {
    return (
        <>
            <Stack
                direction={["column", "column", "column", "row", "row"]}
                minHeight={"80vh"}
                alignItems="center"
                justifyContent={"center"}
                my="1rem"
            >
                <Stack
                    w={{ base: "90%", md: "90%", lg: "50%", xl: "50%" }}
                    h={["35vh", "55vh", "55vh", "auto", "auto"]}
                    padding={[, "1rem", "1rem", "0", "0"]}
                    alignItems={["center", "center", "center", "initial"]}
                    justifyContent="center"
                >
                    <Box
                        lineHeight={"default"}
                        textAlign={[
                            "center",
                            "center",
                            "center",
                            "inherit",
                            "inherit",
                        ]}
                        fontSize={["10vw", "10vw", "9vw", "6.5vw", "6rem"]}
                        fontWeight="bold"
                        color="#0f1419"
                        bgGradient="linear(to-l, #FFC856, #FF9465, #FF618C, #F747BB, #9C55E3)"
                        bgClip="text"
                    >
                        <Text>Kickstart your</Text>
                        <Text mt={["-6vw", "-6vw", "-5.5vw", "-4vw", "-16"]}>
                            project now.
                        </Text>
                    </Box>
                    <Text
                        w={[, "80%", "60%", "100%", "100%"]}
                        textAlign={[
                            "center",
                            "center",
                            "center",
                            "inherit",
                            "inherit",
                        ]}
                        pt="0.5rem"
                        fontSize={["sm", "md", "md", "lg", "xl"]}
                        color="gray.500"
                        lineHeight={1}
                    >
                        Launchpad is an NFT-based crowdfunding platform for
                        content creators and entrepreneurs.
                    </Text>
                    <HStack display="block" spacing={8} pt={8}>
                        <Button
                            size="xl"
                            variant="homepage-button"
                            leftIcon={<AddIcon />}
                        >
                            Create
                        </Button>
                        <Button size="xl">Learn More</Button>
                    </HStack>
                </Stack>

                <Box
                    w={{
                        base: "90%",
                        sm: "90%",
                        md: "90%",
                        lg: "35%",
                        xl: "40%",
                    }}
                    h={"80%"}
                    mb={{ base: 12, md: 0 }}
                    borderRadius="1rem"
                >
                    <FeaturedCollection
                        height={["20rem", "25rem", "30rem", "25rem", "30rem"]}
                        src="/../public/7.avif"
                        collectionLabel="Featured"
                        collectionTitle="Bored Ape Yacht ClubBored Ape Yacht ClubBored Ape Yacht Club  Ape Yacht Club  Ape Yacht Club  Ape Yacht Club  Ape Yacht Club"
                        collectionOwner="@bytan"
                        mintPrice="150"
                    />
                </Box>
            </Stack>

            <Box padding="5rem">
                <Flex justifyContent={"space-between"} alignItems="center">
                    <Heading textAlign={"left"}>Upcoming Projects</Heading>

                    <Heading
                        textAlign={"right"}
                        fontSize="md"
                        alignItems={"center"}
                        fontWeight="500"
                        color="gray.500"
                    >
                        <NextLink href="/collection">View all</NextLink>
                    </Heading>
                </Flex>
                <CollectionCarousel />
            </Box>
        </>
    );
};

export default HomeContent;
