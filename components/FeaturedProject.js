import { Box, Text, VStack, Button, Flex } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";

const FeaturedProject = ({
    src,
    title,
    desc,
    price,
    fundingGoal,
    startTimestamp,
    addr,
    actionLabel,
}) => {
    src = src == "" ? "/../../4.avif" : src; // to remove;
    return (
        <Flex borderRadius="15px" p="30px" shadow="md" bg="#0e0e0e" w="100%">
            <Box color="white" w="100%">
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                >
                    <Box
                        minWidth="75px"
                        width="75px"
                        height="75px"
                        bg="#272727"
                        mr="30px"
                        // p="2px"
                        borderRadius={"50px"}
                    >
                        <NextImage
                            layout="responsive"
                            objectFit="contain"
                            width="100%"
                            height="100%"
                            src={src}
                            style={{ borderRadius: "50px" }}
                        />
                    </Box>
                    <NextLink href={`/governance/${addr}`}>
                        <Button borderRadius="50px" color="black" fontSize="sm">
                            {actionLabel}
                        </Button>
                    </NextLink>
                </Flex>
                <Box alignSelf="center" mt="10px">
                    <Text fontWeight="bold" fontSize="2xl">
                        {title}
                    </Text>
                    <Text color="#8e8e8e" mt="10px">
                        {desc}
                    </Text>
                </Box>
                <Box mt="15px">
                    <Box
                        bg="#1c1c1c"
                        display="inline-flex"
                        p="25px"
                        borderRadius="15px"
                    >
                        <VStack mr="30px" spacing="0">
                            <Text
                                color="white"
                                fontWeight="semibold"
                                alignSelf="self-start"
                                fontSize="sm"
                            >
                                Price per NFT
                            </Text>
                            <Text
                                fontSize="lg"
                                alignSelf="self-start"
                                color="#8e8e8e"
                            >
                                {price}
                            </Text>
                        </VStack>
                        <VStack mr="30px" spacing="0">
                            <Text
                                color="white"
                                fontWeight="semibold"
                                alignSelf="self-start"
                                fontSize="sm"
                            >
                                Funding goal
                            </Text>
                            <Text
                                fontSize="lg"
                                alignSelf="self-start"
                                color="#8e8e8e"
                            >
                                {fundingGoal}
                            </Text>
                        </VStack>
                        {!startTimestamp ? (
                            ""
                        ) : (
                            <VStack mr="30px" spacing="0">
                                <Text
                                    color="white"
                                    fontWeight="semibold"
                                    alignSelf="self-start"
                                    fontSize="sm"
                                >
                                    Starts in
                                </Text>
                                <Text
                                    fontSize="lg"
                                    alignSelf="self-start"
                                    color="#8e8e8e"
                                >
                                    {startTimestamp}
                                    {/* remember to update for realtime countdown  */}
                                </Text>
                            </VStack>
                        )}
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
};

export default FeaturedProject;
