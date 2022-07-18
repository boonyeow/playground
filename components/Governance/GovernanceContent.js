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
import Project from "../Project";
const GovernanceContent = () => {
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
                    <Text color="gray.600" fontWeight="semibold">
                        Participating DAOs
                    </Text>
                    <SimpleGrid spacingX="25px" spacingY="25px" columns="3">
                        <Project
                            title="Project Name"
                            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"
                            src="/../public/unnamed.jpg"
                            actionLabel="View Activity"
                        />
                    </SimpleGrid>
                </Box>
                <Box w="100%" mt="15px">
                    <Text color="gray.600" fontWeight="semibold">
                        Explore DAOs
                    </Text>
                    <SimpleGrid spacingX="25px" spacingY="25px" columns="3">
                        <Project
                            title="Project Name"
                            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"
                            src="/../public/unnamed.jpg"
                            actionLabel="View Activity"
                        />
                        <Project
                            title="Project Name"
                            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"
                            src="/../public/unnamed.jpg"
                            actionLabel="View Activity"
                        />
                        <Project
                            title="Project Name"
                            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"
                            src="/../public/unnamed.jpg"
                            actionLabel="View Activity"
                        />
                    </SimpleGrid>
                </Box>
            </Box>
        </>
    );
};

export default GovernanceContent;
