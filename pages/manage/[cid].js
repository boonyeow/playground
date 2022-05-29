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
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import NextLink from "next/link";
import { SmallCloseIcon } from "@chakra-ui/icons";
import SingleCollection from "../../components/SingleCollection";

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
                        <Link fontWeight="semibold" color="#198BFF">
                            back to manage project
                        </Link>
                    </NextLink>
                    <Tabs pt="1rem" variant="unstyled" orientation="vertical">
                        <TabList minW="200px">
                            <Tab
                                color="gray.500"
                                fontWeight={"normal"}
                                _selected={{
                                    color: "#3d3d3d",
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
                                    color: "#3d3d3d",
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
                                    color: "#3d3d3d",
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
                                Vesting Period
                            </Tab>
                            <Tab
                                color="gray.500"
                                fontWeight={"normal"}
                                _selected={{
                                    color: "#3d3d3d",
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
                                Whitelist
                            </Tab>
                        </TabList>
                        <TabPanels
                            // border="3px solid #f9f8f9"
                            borderRadius="1rem"
                        >
                            <TabPanel p="0">
                                <VStack spacing="5" px="5">
                                    <HStack width="100%" spacing="10">
                                        <VStack width="50%" spacing="5">
                                            <FormControl>
                                                <FormLabel
                                                    fontSize="2xl"
                                                    fontWeight="bold"
                                                    color="#3d3d3d"
                                                >
                                                    Cover Image
                                                </FormLabel>
                                                <Flex
                                                    mt={1}
                                                    justify="center"
                                                    px={6}
                                                    pt={5}
                                                    pb={6}
                                                    borderWidth={2}
                                                    borderColor={"gray.500"}
                                                    borderStyle="dashed"
                                                    rounded="md"
                                                    height="200px"
                                                >
                                                    <Stack
                                                        spacing={1}
                                                        textAlign="center"
                                                    >
                                                        <Icon
                                                            mx="auto"
                                                            boxSize={12}
                                                            color={"gray.500"}
                                                            stroke="currentColor"
                                                            fill="none"
                                                            viewBox="0 0 48 48"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </Icon>
                                                        <Flex
                                                            fontSize="sm"
                                                            color={"gray.400"}
                                                            alignItems="baseline"
                                                        >
                                                            <Text
                                                                htmlFor="file-upload"
                                                                cursor="pointer"
                                                                rounded="md"
                                                                fontSize="md"
                                                                color={
                                                                    "brand.200"
                                                                }
                                                                pos="relative"
                                                                _hover={{
                                                                    color: "brand.300",
                                                                }}
                                                            >
                                                                <span>
                                                                    Upload a
                                                                    file
                                                                </span>
                                                                <VisuallyHidden>
                                                                    <input
                                                                        id="file-upload"
                                                                        name="file-upload"
                                                                        type="file"
                                                                    />
                                                                </VisuallyHidden>
                                                            </Text>
                                                            <Text pl={1}>
                                                                or drag and drop
                                                            </Text>
                                                        </Flex>
                                                        <Text
                                                            fontSize="xs"
                                                            color={"gray.50"}
                                                        >
                                                            PNG, JPG, GIF up to
                                                            10MB
                                                        </Text>
                                                    </Stack>
                                                </Flex>
                                            </FormControl>
                                            <HStack width="100%" spacing="10">
                                                <VStack width="50%" spacing="5">
                                                    <FormControl id="mintPrice">
                                                        <FormLabel
                                                            fontSize="2xl"
                                                            fontWeight="bold"
                                                            color="#3d3d3d"
                                                        >
                                                            Price
                                                        </FormLabel>
                                                        <Input placeholder="Enter mint price" />
                                                    </FormControl>
                                                    <FormControl id="totalSupply">
                                                        <FormLabel
                                                            fontSize="2xl"
                                                            fontWeight="bold"
                                                            color="#3d3d3d"
                                                        >
                                                            Supply
                                                        </FormLabel>
                                                        <Input placeholder="Enter total supply" />
                                                    </FormControl>
                                                </VStack>
                                                <VStack width="50%" spacing="5">
                                                    <FormControl id="currency">
                                                        <FormLabel
                                                            fontSize="2xl"
                                                            fontWeight="bold"
                                                            color="#3d3d3d"
                                                        >
                                                            Currency
                                                        </FormLabel>
                                                        <Select>
                                                            <option>
                                                                bnUSD
                                                            </option>
                                                            <option>ICX</option>
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl id="launchDate">
                                                        <FormLabel
                                                            fontSize="2xl"
                                                            fontWeight="bold"
                                                            color="#3d3d3d"
                                                        >
                                                            Launch Date
                                                        </FormLabel>
                                                        <Input type="datetime-local" />
                                                    </FormControl>
                                                </VStack>
                                            </HStack>
                                        </VStack>

                                        <FormControl width="50%">
                                            <FormLabel
                                                fontSize="2xl"
                                                fontWeight="bold"
                                                color="#3d3d3d"
                                            >
                                                Preview
                                            </FormLabel>
                                            <SingleCollection
                                                data={collectionData}
                                            />
                                        </FormControl>
                                    </HStack>
                                </VStack>
                                <VStack spacing="5" px="5">
                                    <HStack width="100%" spacing="10"></HStack>

                                    <FormControl id="shortDesc">
                                        <FormLabel
                                            fontSize="2xl"
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
                                            fontSize="2xl"
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
        </>
    );
};

export default ManageProjectPage;
