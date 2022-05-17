import { Box } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CollectionCarousel from "../../components/CollectionCarousel";

const Collection = () => {
    return (
        <>
            <Navbar />
            <CollectionCarousel />
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
