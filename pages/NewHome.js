import {
    Box,
    Button,
    Heading,
    IconButton,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { AiFillHome, AiOutlineFileSearch } from "react-icons/ai";
import { MdHowToVote, MdExplore } from "react-icons/md";

const SideNav = () => {
    return (
        <Box
            bgColor="white"
            height="calc(100vh - 50px)"
            width="120px"
            margin="25px"
            overflowX="hidden"
            position="fixed"
            zIndex="1"
            padding="15px"
            rounded="2xl"
            shadow={"md"}
        >
            <Text fontWeight="bold" textAlign={"center"} mb="25px">
                CROWD9
            </Text>
            <SimpleGrid columns={1} spacingY="15px">
                <IconButton
                    icon={<AiFillHome />}
                    width="2.5rem"
                    height="2.5rem"
                ></IconButton>
                <IconButton
                    icon={<AiOutlineFileSearch />}
                    size="lg"
                ></IconButton>
                <IconButton icon={<MdHowToVote />} size="lg"></IconButton>
            </SimpleGrid>
        </Box>
    );
};

const NewHome = () => {
    return (
        <Box bg="gray.50">
            <SideNav></SideNav>
            <Box ml="180px" p="25px" height="150vh">
                <Heading>Home</Heading>
            </Box>
        </Box>
    );
};

export default NewHome;
