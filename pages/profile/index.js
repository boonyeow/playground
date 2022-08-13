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
    useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import PageHeader from "../../components/PageHeader";
import { useEffect, useState } from "react";
import NftCollection from "../../components/NftCollection";
import NextImage from "next/image";



const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });

    useEffect(() => {
        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);
    }, []);

    return (
        <>
            <Box maxWidth={"8xl"} width="100%" m="auto" h="150vh" pt="2.5vh">
                <Sidebar />
                <Box
                    width="100%"
                    height="100%"
                    ml="75px"
                    p="1.5rem 3rem 3rem 3rem"
                >
                    <PageHeader
                        title="Profile"
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                    />
                    <Box w="100%" mt="15px">
                        <Text color="gray.600" fontWeight="semibold">
                            Owned NFTs
                        </Text>
                        <SimpleGrid
                            columns="4"
                            spacingX="25px"
                            mt="15px"
                            width="100%"
                            spacingY="20px"
                        >
                            <NftCollection />
                            <NftCollection />
                            <NftCollection />
                            <NftCollection />
                            <NftCollection />
                        </SimpleGrid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Profile