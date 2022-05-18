import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CollectionCarousel from "../../components/CollectionCarousel";
import CollectionGrid from "../../components/CollectionGrid";
import { Box, Stack } from "@chakra-ui/react";
// import Footer from "../../components/Footer";

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
            <Box maxWidth={"8xl"} m="auto">
                <Stack
                    direction={["column", "column", "column", "row", "row"]}
                    minHeight={"80vh"}
                    alignItems="center"
                    justifyContent={"center"}
                    my="1rem"
                >
                    <CollectionGrid data={collectionList} />
                </Stack>
            </Box>
            {/* <Footer /> */}
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
