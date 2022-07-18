import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    VStack,
} from "@chakra-ui/react";
import FeaturedProject from "../FeaturedProject";
import Project from "../Project";
const GovernanceInfo = () => {
    return (
        <>
            <Box width="100%" height="100%" ml="75px" p="1.5rem 3rem 3rem 3rem">
                <Flex alignItems="center" justifyContent="space-between">
                    <Text fontSize="4xl" fontWeight="bold">
                        Governance
                    </Text>
                    <Button bg="primary" color="white">
                        Sign in
                    </Button>
                </Flex>
                <Box w="100%" mt="15px">
                    <SimpleGrid columns="2" spacingX="25px">
                        <FeaturedProject
                            src="/../public/unnamed.jpg"
                            title="Project Name"
                            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"
                            price="100 ICX"
                            fundingRequested="20,000 ICX"
                            launchTimestamp="18 July 2022"
                        />
                        <Box
                            width="100%"
                            mt="10px"
                            borderRadius="15px"
                            p="30px"
                            border="1px solid #f1f1f1"
                        >
                            <Text>Top Addresses by Voting Power</Text>
                        </Box>
                    </SimpleGrid>
                    <Box
                        width="100%"
                        mt="25px"
                        borderRadius="15px"
                        p="30px"
                        border="1px solid #f1f1f1"
                    >
                        <Text>Most Active Address, Delegate, </Text>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default GovernanceInfo;
