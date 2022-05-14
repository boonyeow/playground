import { Box, SimpleGrid } from "@chakra-ui/react";
import FeaturedCollection from "./FeaturedCollection";
const CollectionGrid = () => {
    return (
        <SimpleGrid columns={[2, 2, 2, 3, 4]} spacing={10}>
            <Box
                w={{
                    base: "100%",
                    sm: "100%",
                    md: "90%",
                    lg: "100%",
                    xl: "100%",
                }}
                h={"80%"}
                mb={{ base: 12, md: 0 }}
                borderRadius="1rem"
            >
                <FeaturedCollection
                    height={["30rem", "30rem", "20rem", "15rem", "15rem"]}
                    src="/../public/6.avif"
                    collectionLabel="Featured"
                    collectionTitle="Bored Ape Yacht ClubBored Ape Yacht ClubBored Ape Yacht Club"
                    collectionOwner="@bytan"
                    mintPrice="150"
                />
            </Box>
            <Box
                w={{
                    base: "100%",
                    sm: "100%",
                    md: "90%",
                    lg: "100%",
                    xl: "100%",
                }}
                h={"80%"}
                mb={{ base: 12, md: 0 }}
                borderRadius="1rem"
            >
                <FeaturedCollection
                    height={["30rem", "30rem", "20rem", "15rem", "15rem"]}
                    src="/../public/5.avif"
                    collectionLabel="Featured"
                    collectionTitle="Bored Ape Yacht ClubBored Ape Yacht ClubBored Ape Yacht Club"
                    collectionOwner="@bytan"
                    mintPrice="150"
                />
            </Box>
            <Box
                w={{
                    base: "100%",
                    sm: "100%",
                    md: "90%",
                    lg: "100%",
                    xl: "100%",
                }}
                h={"80%"}
                mb={{ base: 12, md: 0 }}
                borderRadius="1rem"
            >
                <FeaturedCollection
                    height={["30rem", "30rem", "20rem", "15rem", "15rem"]}
                    src="/../public/4.avif"
                    collectionLabel="Featured"
                    collectionTitle="Bored Ape Yacht ClubBored Ape Yacht ClubBored Ape Yacht Club"
                    collectionOwner="@bytan"
                    mintPrice="150"
                />
            </Box>
            <Box
                display={["none", "none", "block", "none", "block"]}
                w={{
                    base: "100%",
                    sm: "100%",
                    md: "90%",
                    lg: "35%",
                    xl: "100%",
                }}
                h={"80%"}
                mb={{ base: 12, md: 0 }}
                borderRadius="1rem"
            >
                <FeaturedCollection
                    height={["30rem", "30rem", "20rem", "15rem", "15rem"]}
                    src="/../public/3.avif"
                    collectionLabel="Featured"
                    collectionTitle="Bored Ape Yacht ClubBored Ape Yacht ClubBored Ape Yacht Club"
                    collectionOwner="@bytan"
                    mintPrice="150"
                />
            </Box>
        </SimpleGrid>
    );
};

export default CollectionGrid;
