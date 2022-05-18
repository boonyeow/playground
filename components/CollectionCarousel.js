import { Box, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { SingleCollection, SingleCollectionv2 } from "./SingleCollection";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/CollectionCarousel.module.css";
import { ArrowForwardIcon, ArrowRightIcon } from "@chakra-ui/icons";

const CollectionCarousel = () => {
    const collectionList = [
        {
            contractAddress: "cx23902903999",
            src: "/../public/4.avif",
            collectionLabel: "Featured",
            collectionTitle:
                "Bored Ape Yacht ClubBored Ape Yacht ClubBored Ape Yacht Club",
            collectionOwner: "@bytan",
            mintPrice: "150",
        },
        {
            contractAddress: "cx23902903998",
            src: "/../public/5.avif",
            collectionLabel: "Featured",
            collectionTitle:
                "Bored Ape Yacht ClubBored Ape Yacht ClubBored Ape Yacht Club",
            collectionOwner: "@bytan",
            mintPrice: "150",
        },

        {
            contractAddress: "cx23902903997",
            src: "/../public/6.avif",
            collectionLabel: "Featured",
            collectionTitle:
                "Bored Ape Yacht ClubBored Ape Yacht ClubBored Ape Yacht Club",
            collectionOwner: "@bytan",
            mintPrice: "150",
        },

        {
            contractAddress: "cx23902903996",
            src: "/../public/7.avif",
            collectionLabel: "Featured",
            collectionTitle:
                "Bored Ape Yacht ClubBored Ape Yacht ClubBored Ape Yacht Club",
            collectionOwner: "@bytan",
            mintPrice: "150",
        },
    ];

    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <Box
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            ></Box>
        );
    };

    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <Box
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    };

    const settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        nextArrow: <NextArrow className={styles.nextArrow} />,
        prevArrow: <PrevArrow className={styles.prevArrow} />,
        responsive: [
            {
                breakpoint: "62em",
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true,
                },
            },
        ],
    };

    return (
        <Box padding="1rem">
            <Slider {...settings}>
                {collectionList.map((currentCollection, index) => (
                    <NextLink
                        key={index}
                        href={{
                            pathname: "/collection/[cid]",
                            query: { cid: currentCollection.contractAddress },
                        }}
                    >
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
                            <SingleCollectionv2
                                height={[
                                    "15rem",
                                    "25rem",
                                    "25rem",
                                    "15rem",
                                    "15rem",
                                ]}
                                width={[
                                    "15rem",
                                    "25rem",
                                    "25rem",
                                    "15rem",
                                    "15rem",
                                ]}
                                src={currentCollection.src}
                                collectionLabel={
                                    currentCollection.collectionLabel
                                }
                                collectionTitle={
                                    currentCollection.collectionTitle
                                }
                                collectionOwner={
                                    currentCollection.collectionOwner
                                }
                                mintPrice={currentCollection.mintPrice}
                            />
                            {/* <SingleCollection
                                height={[
                                    "15rem",
                                    "25rem",
                                    "25rem",
                                    "15rem",
                                    "15rem",
                                ]}
                                width={[
                                    "15rem",
                                    "25rem",
                                    "25rem",
                                    "15rem",
                                    "15rem",
                                ]}
                                src={currentCollection.src}
                                collectionLabel={
                                    currentCollection.collectionLabel
                                }
                                collectionTitle={
                                    currentCollection.collectionTitle
                                }
                                collectionOwner={
                                    currentCollection.collectionOwner
                                }
                                mintPrice={currentCollection.mintPrice}
                            /> */}
                        </Box>
                    </NextLink>
                ))}
            </Slider>
        </Box>
    );
};

export default CollectionCarousel;
