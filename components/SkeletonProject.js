import {
    Box,
    Button,
    Flex,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Text,
} from "@chakra-ui/react";

const SkeletonProject = () => {
    return (
        <Flex
            mt="10px"
            borderRadius="15px"
            p="30px"
            bg="white"
            border="1px solid var(--chakra-colors-blackAlpha-200);"
            shadow="sm"
        >
            <Box color="white" width="100%">
                <Flex justifyContent="space-between" alignItems="center">
                    <SkeletonCircle w="75px" h="75px">
                        <Box
                            minWidth="75px"
                            width="75px"
                            height="75px"
                            bg="#272727"
                            mr="30px"
                            borderRadius={"50px"}
                        ></Box>
                    </SkeletonCircle>
                    <Skeleton>
                        <Button variant="action-button">View Button</Button>
                    </Skeleton>
                </Flex>
                <Box alignSelf="center" mt="10px">
                    <Skeleton>
                        <Text fontWeight="bold" fontSize="xl" color="black">
                            Empty text
                        </Text>
                    </Skeleton>

                    <SkeletonText mt={4} noOfLines={3} />
                </Box>
            </Box>
        </Flex>
    );
};

export default SkeletonProject;
