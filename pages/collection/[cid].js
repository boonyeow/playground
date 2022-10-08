import {
    Box,
    Button,
    Grid,
    GridItem,
    Heading,
    HStack,
    IconButton,
    Progress,
    SimpleGrid,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import NextImage from "next/image";
import SingleCollection from "../../components/SingleCollection";
import { FaDiscord, FaTwitter, FaTelegramPlane } from "react-icons/fa";
import Dispenser from "../../components/Dispenser";
import SalesProgress from "../../components/SalesProgress";

const CollectionPage = () => {
    const collectionList = [
        {
            contractAddress: "cx23902903999",
            src: "/../public/unnamed.jpg",
            collectionLabel: "Featured",
            collectionTitle: "Jan Protocol",
            collectionOwner: "@bytan",
            mintPrice: "150",
            currency: "ICX",
            totalSupply: "1000",
            shortDesc:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
        },
    ];
    return (
        <>
            <Navbar />
            <Box maxWidth={"8xl"} m="auto">
                <Box padding="4rem" width="100%" height="100%">
                    <HStack>
                        <Box width={["40%", "40%", "40%", "100%", "40%"]}>
                            <SingleCollection data={collectionList[0]} />
                        </Box>
                        <Box width="60%" px="2rem">
                            <Heading color="#3D3D3D">
                                {collectionList[0].collectionTitle}
                            </Heading>
                            <Box mt="-0.5rem">
                                <Text as="span" color="#3d3d3d">
                                    created by{" "}
                                </Text>
                                <Text
                                    as="span"
                                    color="#198BFF"
                                    fontWeight="600"
                                >
                                    {collectionList[0].collectionOwner}
                                </Text>
                            </Box>
                            <Box mt="1rem">
                                <Heading
                                    textTransform={"uppercase"}
                                    fontSize="md"
                                    fontWeight="normal"
                                    color="#898989"
                                >
                                    early access
                                </Heading>
                                <Button
                                    variant="homepage-button"
                                    mt="0.5rem"
                                    display="none"
                                >
                                    Join Allowlist
                                </Button>
                                <SalesProgress
                                    value={80}
                                    status="Sold out"
                                    mt="0.5rem"
                                    width="600px"
                                />
                                <Dispenser mt="1rem" width="460px" />
                            </Box>
                            <Box mt="1rem">
                                <Heading
                                    textTransform={"uppercase"}
                                    fontSize="md"
                                    fontWeight="normal"
                                    color="#898989"
                                >
                                    description
                                </Heading>
                                <Text
                                    color="#3d3d3d"
                                    fontWeight="bold"
                                    mt="0.5rem"
                                    width="600px"
                                >
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry&apos;s standard
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry&apos;s standard
                                </Text>
                            </Box>
                            <Box mt="1rem">
                                <Heading
                                    textTransform={"uppercase"}
                                    fontSize="md"
                                    fontWeight="normal"
                                    color="#898989"
                                >
                                    social media
                                </Heading>
                                <HStack spacing="1rem" mt="0.5rem">
                                    <IconButton
                                        icon={<FaTwitter />}
                                        bgColor="white"
                                        border="1px solid #f2f2f2"
                                    />
                                    <IconButton
                                        icon={<FaDiscord />}
                                        bgColor="white"
                                        border="1px solid #f2f2f2"
                                    />
                                    <IconButton
                                        icon={<FaTelegramPlane />}
                                        bgColor="white"
                                        border="1px solid #f2f2f2"
                                    />
                                </HStack>
                            </Box>
                        </Box>
                    </HStack>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default CollectionPage;
