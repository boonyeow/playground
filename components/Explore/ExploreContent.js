import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    VStack,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import Project from "../Project";
const ExploreContent = () => {
    return (
        <>
            <Box width="100%" height="100%" ml="75px" p="1.5rem 3rem 3rem 3rem">
                <Flex alignItems="center" justifyContent="space-between">
                    <Text fontSize="4xl" fontWeight="bold">
                        Explore
                    </Text>
                    <Button bg="primary" color="white">
                        Sign in
                    </Button>
                </Flex>
                <Box w="100%" mt="15px">
                    <Box display="inline-flex">
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<AiOutlineSearch color="gray.300" />}
                            />
                            <Input
                                placeholder="Search a project"
                                borderRadius="15px"
                            />
                        </InputGroup>
                    </Box>
                    <SimpleGrid
                        spacingX="25px"
                        spacingY="25px"
                        columns="3"
                        mt="5px"
                    >
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

export default ExploreContent;
