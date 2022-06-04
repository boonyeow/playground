import {
    Avatar,
    AvatarBadge,
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Link,
    Select,
    SimpleGrid,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Textarea,
    VisuallyHidden,
    VStack,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import Navbar from "../../../components/Navbar";
import NextLink from "next/link";
import SingleCollection from "../../../components/SingleCollection";
import { BsPercent } from "react-icons/bs";
import Footer from "../../../components/Footer";
import UploadFileComponent from "../../../components/UploadFileComponent";
import AboutPanel from "../../../components/Manage/AboutPanel";
import UploadAssetPanel from "../../../components/Manage/UploadAssetPanel";
import AllowlistPanel from "../../../components/Manage/AllowlistPanel";
import { ArrowBackIcon } from "@chakra-ui/icons";
const ManageProjectPage = () => {
    const collectionData = {
        contractAddress: "cx23902903999",
        src: "/../public/unnamed.jpg",
        collectionLabel: "Featured",
        collectionTitle: "Jan Protocol",
        collectionOwner: "@bytan",
        mintPrice: "150",
        currency: "ICX",
        totalSupply: "1000",
        shortDesc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    };
    return (
        <>
            <Navbar />

            <Box maxWidth={"8xl"} m="auto">
                <Box padding="5rem" width="100%" height="100%">
                    <Heading as="h1" color="#3d3d3d">
                        Jan Protocol
                    </Heading>
                    <NextLink href={"/manage"}>
                        <Flex alignItems={"center"}>
                            <ArrowBackIcon color="gray.400" mr="0.5rem" />
                            <Link color="gray.500" fontWeight={"500"}>
                                back to manage project
                            </Link>
                        </Flex>
                    </NextLink>
                    <Tabs
                        pt="2rem"
                        variant="unstyled"
                        orientation="vertical"
                        isLazy={true}
                    >
                        <TabList minW="200px">
                            <Tab
                                color="gray.500"
                                fontWeight={"normal"}
                                _selected={{
                                    color: "#198BFF",
                                    fontWeight: "semibold",
                                    borderColor: "#3d3d3d",
                                    bgColor: "#e9f1fb",
                                    borderRadius: "0.5rem",
                                }}
                                _focus={{ boxShadow: "unset" }}
                                alignSelf="baseline"
                                textTransform={"lowercase"}
                                fontSize="sm"
                            >
                                About Project
                            </Tab>
                            <Tab
                                color="gray.500"
                                fontWeight={"normal"}
                                _selected={{
                                    color: "#198BFF",
                                    fontWeight: "semibold",
                                    borderColor: "#3d3d3d",
                                    bgColor: "#e9f1fb",
                                    borderRadius: "0.5rem",
                                }}
                                _focus={{ boxShadow: "unset" }}
                                alignSelf="baseline"
                                textTransform={"lowercase"}
                                fontSize="sm"
                            >
                                Upload Assets
                            </Tab>
                            <Tab
                                color="gray.500"
                                fontWeight={"normal"}
                                _selected={{
                                    color: "#198BFF",
                                    fontWeight: "semibold",
                                    borderColor: "#3d3d3d",
                                    bgColor: "#e9f1fb",
                                    borderRadius: "0.5rem",
                                }}
                                _focus={{ boxShadow: "unset" }}
                                alignSelf="baseline"
                                textTransform={"lowercase"}
                                fontSize="sm"
                            >
                                Allowlist
                            </Tab>
                        </TabList>
                        <TabPanels
                            // border="3px solid #f9f8f9"
                            borderRadius="1rem"
                        >
                            <TabPanel p="0">
                                <AboutPanel />
                            </TabPanel>
                            <TabPanel p="0">
                                <UploadAssetPanel />
                            </TabPanel>
                            <TabPanel p="0">
                                <AllowlistPanel />
                            </TabPanel>
                            <TabPanel p="0">
                                <VStack spacing="5" px="5">
                                    <HStack width="100%" spacing="10">
                                        <VStack
                                            width="50%"
                                            spacing="5"
                                            alignSelf={"baseline"}
                                        >
                                            <UploadFileComponent title="Cover Image" />
                                            <HStack width="100%" spacing="10">
                                                <FormControl id="mintPrice">
                                                    <FormLabel
                                                        fontSize="lg"
                                                        fontWeight="bold"
                                                        color="#3d3d3d"
                                                    >
                                                        Price
                                                    </FormLabel>
                                                    <Input
                                                        placeholder="Enter mint price"
                                                        fontSize="sm"
                                                    />
                                                </FormControl>
                                                <FormControl id="totalSupply">
                                                    <FormLabel
                                                        fontSize="lg"
                                                        fontWeight="bold"
                                                        color="#3d3d3d"
                                                    >
                                                        Supply
                                                    </FormLabel>
                                                    <Input
                                                        placeholder="Enter total supply"
                                                        fontSize="sm"
                                                    />
                                                </FormControl>
                                            </HStack>
                                            <FormControl id="launchDate">
                                                <FormLabel
                                                    fontSize="lg"
                                                    fontWeight="bold"
                                                    color="#3d3d3d"
                                                >
                                                    Launch Date
                                                </FormLabel>
                                                <Input
                                                    type="datetime-local"
                                                    fontSize="sm"
                                                />
                                            </FormControl>
                                            <FormControl id="launchDate">
                                                <FormLabel
                                                    fontSize="lg"
                                                    fontWeight="bold"
                                                    color="#3d3d3d"
                                                >
                                                    Fund Lockup
                                                </FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter lock up percentage"
                                                        fontSize="sm"
                                                    />
                                                    <InputRightElement
                                                        children={
                                                            <BsPercent color="var(--chakra-colors-gray-500)" />
                                                        }
                                                    />
                                                </InputGroup>
                                                <FormHelperText>
                                                    A portion of the crowdfund
                                                    will be locked for
                                                    milestone-based release.
                                                </FormHelperText>
                                            </FormControl>
                                            <FormControl id="royalties">
                                                <FormLabel
                                                    fontSize="lg"
                                                    fontWeight="bold"
                                                    color="#3d3d3d"
                                                >
                                                    Royalties
                                                </FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter royalties percentage"
                                                        fontSize="sm"
                                                    />
                                                    <InputRightElement
                                                        children={
                                                            <BsPercent color="var(--chakra-colors-gray-500)" />
                                                        }
                                                    />
                                                </InputGroup>
                                                <FormHelperText>
                                                    Royalties for every
                                                    subsequent sales in the
                                                    secondary market.
                                                </FormHelperText>
                                            </FormControl>
                                        </VStack>
                                        <VStack
                                            width="50%"
                                            alignSelf="baseline"
                                        >
                                            <FormControl>
                                                <FormLabel
                                                    fontSize="lg"
                                                    fontWeight="bold"
                                                    color="#3d3d3d"
                                                >
                                                    Preview
                                                </FormLabel>
                                                <SingleCollection
                                                    data={collectionData}
                                                />
                                            </FormControl>
                                        </VStack>
                                    </HStack>
                                </VStack>
                                <VStack spacing="5" px="5">
                                    <HStack width="100%" spacing="10"></HStack>

                                    <FormControl id="shortDesc">
                                        <FormLabel
                                            fontSize="lg"
                                            fontWeight="bold"
                                            color="#3d3d3d"
                                        >
                                            Short Description
                                        </FormLabel>
                                        <Textarea
                                            placeholder="Enter a short description of your project"
                                            mt={1}
                                            rows={3}
                                            shadow="sm"
                                            focusBorderColor="brand.400"
                                            fontSize={{ sm: "sm" }}
                                        />
                                        <FormHelperText>
                                            300 characters left
                                        </FormHelperText>
                                    </FormControl>

                                    <FormControl id="longDesc" mt={1}>
                                        <FormLabel
                                            fontSize="lg"
                                            fontWeight="bold"
                                            color="#3d3d3d"
                                        >
                                            Detailed Description
                                        </FormLabel>
                                        <Textarea
                                            placeholder="Enter a detailed description of your project."
                                            mt={1}
                                            rows={3}
                                            shadow="sm"
                                            focusBorderColor="brand.400"
                                            fontSize={{ sm: "sm" }}
                                        />
                                        <FormHelperText>
                                            300 characters left
                                        </FormHelperText>
                                    </FormControl>
                                    <Button
                                        variant="homepage-button"
                                        alignSelf="end"
                                    >
                                        Save
                                    </Button>
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default ManageProjectPage;
