import { Box, Text, Flex } from "@chakra-ui/react";
import NextImage from "next/image";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const SingleListing = ({ title, src, seed }) => {
    return (
        <>
            <Flex w="full" alignItems="center" justifyContent="center">
                <Box
                    w="100%"
                    borderRadius="1rem"
                    shadow="lg"
                    py="0.75rem"
                    bg="white"
                >
                    <Box
                        borderRadius="1rem"
                        position="relative"
                        w="90%"
                        margin="0 auto"
                    >
                        {src ? (
                            <NextImage
                                layout="responsive"
                                width="100%"
                                height="100%"
                                src={src}
                                style={{ borderRadius: "1rem" }}
                            />
                        ) : (
                            <Box>
                                <Jazzicon
                                    diameter={200}
                                    seed={jsNumberForAddress(seed || "")}
                                    paperStyles={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "1rem",
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                    <Box pt="1rem" pb="0.5rem" px="10%">
                        <Text noOfLines={1} fontWeight="semibold">
                            {title}
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default SingleListing;
