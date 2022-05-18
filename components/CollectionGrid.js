import {
    Box,
    Button,
    Heading,
    IconButton,
    SimpleGrid,
    Text,
    VStack,
    HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import NextImage from "next/image";
import { FaTelegramPlane, FaDiscord, FaTwitter } from "react-icons/fa";

const CollectionGrid = (props) => {
    const collectionList = props.data;
    return (
        <SimpleGrid columns={[1, 1, 2, 3, 3]} spacing={25} padding="2rem">
            {collectionList.map((currentCollection, index) => (
                <Box
                    shadow="2xl"
                    borderRadius="0.5rem"
                    key={index}
                    transition="transform .2s"
                    _hover={{
                        transform: "scale(1.05)",
                        zIndex: "1",
                    }}
                >
                    <NextLink
                        href={{
                            pathname: "/collection/[cid]",
                            query: {
                                cid: currentCollection.contractAddress,
                            },
                        }}
                    >
                        <Box
                            height="15rem"
                            position="relative"
                            _hover={{ cursor: "pointer" }}
                        >
                            <NextImage
                                src={currentCollection.src}
                                layout="fill"
                                objectFit="cover"
                                style={{
                                    borderRadius: "0.5rem 0.5rem 0 0",
                                }}
                            ></NextImage>
                        </Box>
                    </NextLink>

                    <VStack padding="1rem 2rem 1.5rem 2rem">
                        <NextLink
                            href={{
                                pathname: "/collection/[cid]",
                                query: {
                                    cid: currentCollection.contractAddress,
                                },
                            }}
                        >
                            <Heading
                                noOfLines={1}
                                as="h1"
                                fontSize="2xl"
                                alignSelf="start"
                                _hover={{ cursor: "pointer" }}
                            >
                                {currentCollection.collectionTitle}
                            </Heading>
                        </NextLink>

                        <HStack
                            alignSelf="baseline"
                            color="gray.500"
                            pb="0.5rem"
                        >
                            <FaTwitter />
                            <FaDiscord />
                            <FaTelegramPlane />
                        </HStack>
                        <Text noOfLines={3} margin="0.5rem" px="0.5rem">
                            {currentCollection.shortDesc}
                        </Text>
                        <HStack
                            width="100%"
                            pt="0.5rem"
                            justifyContent={"space-between"}
                        >
                            <NextLink
                                href={{
                                    pathname: "/collection/[cid]",
                                    query: {
                                        cid: currentCollection.contractAddress,
                                    },
                                }}
                            >
                                <Button
                                    width="100%"
                                    padding="1rem"
                                    bgColor="black"
                                    color="white"
                                    alignSelf={"baseline"}
                                    borderRadius="0.5rem"
                                    variant="homepage-button"
                                    size="lg"
                                >
                                    More Details
                                </Button>
                            </NextLink>
                        </HStack>
                    </VStack>
                </Box>
            ))}
        </SimpleGrid>
    );
};

export default CollectionGrid;
