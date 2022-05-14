import { Box, Heading, Text, VStack, Button, Flex } from "@chakra-ui/react";
import NextImage from "next/image";

const FeaturedCollection = (props) => {
    return (
        <>
            <Box
                height={props.height}
                margin="1rem"
                width="auto"
                rounded="1rem"
                position="relative"
                boxShadow={"2xl"}
            >
                <NextImage
                    src={props.src}
                    layout="fill"
                    objectFit="cover"
                    style={{
                        borderRadius: "1rem",
                    }}
                />
                <Box
                    position="absolute"
                    zIndex={1}
                    padding="0.5rem 1rem"
                    margin="1rem"
                    bgColor="rgb(0,0,0,0.2)"
                    backdropFilter="auto"
                    backdropBlur="sm"
                    color="white"
                    rounded="1rem"
                    fontWeight="semibold"
                >
                    {props.collectionLabel}
                </Box>
            </Box>
            <Box p="1rem 2rem">
                <Flex width="100%">
                    <VStack alignItems={"start"} width={["80%", "70%"]}>
                        <Heading
                            fontSize="xl"
                            lineHeight={"1"}
                            isTruncated
                            fontWeight="bold"
                            width="100%"
                        >
                            {props.collectionTitle}
                        </Heading>
                        <Text
                            lineHeight="1"
                            mt="0"
                            color="gray.500"
                            fontWeight="semibold"
                        >
                            Created by {props.collectionOwner}
                        </Text>
                    </VStack>
                    <Box width="100%" textAlign="end">
                        <Button
                            variant="homepage-button"
                            padding="0.5rem 1rem"
                            fontWeight="bold"
                            ml="auto"
                            size={"md"}
                            rounded="2rem"
                            marginLeft="auto"
                        >
                            {props.mintPrice} ICX
                        </Button>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default FeaturedCollection;
