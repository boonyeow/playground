import { Box, Heading, Text, VStack, Button, Flex } from "@chakra-ui/react";
import NextImage from "next/image";

const SingleCollection = (props) => {
    return (
        <>
            <Box
                height={props.height}
                width={props.width}
                margin="1rem"
                rounded="1rem"
                position="relative"
                boxShadow={"lg"}
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
                    <VStack alignItems={"start"} width={"100%"}>
                        <Heading
                            fontSize="lg"
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
                            fontSize="md"
                        >
                            {props.collectionOwner}
                        </Text>
                    </VStack>
                </Flex>
            </Box>
        </>
    );
};

export default SingleCollection;
