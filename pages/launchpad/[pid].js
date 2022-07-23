import {
    Box,
    Text,
    Flex,
    Icon,
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    Textarea,
    Select,
    HStack,
    Grid,
    GridItem,
    Button,
    Stack,
    VisuallyHidden,
    NumberInput,
    NumberInputField,
    VisuallyHiddenInput,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/PageHeader";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/router";
import { BsChevronLeft } from "react-icons/bs";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import UploadFileComponent from "../../components/UploadFileComponent";
import Project from "../../components/Project";
import NextImage from "next/image";
// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { Calendar } from "react-date-range";

const ProjectDetails = () => {
    const router = useRouter();
    const hiddenUploadFile = useRef(null);
    const { pid } = router.query;
    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });

    const [previewInfo, setPreviewInfo] = useState({
        thumbnailSrc: "/../../4.avif",
        shortDesc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    });
    const [thumbnailSrc, setThumbnailSrc] = useState("/../../4.avif");

    useEffect(() => {
        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);
        // add check if user is not deployer, not allowed to view
    }, []);

    const handleSelect = (date) => {
        console.log(date);
    };

    const handleUploadFile = (e) => {
        if (e.target.files.length != 1) {
            console.log("invalid length");
            return;
        }

        var re = new RegExp("image/*");
        const uploadedFile = e.target.files[0];
        if (!re.test(uploadedFile.type)) {
            console.log("invalid file type");
            return;
        }

        // https://stackoverflow.com/questions/38049966/get-image-preview-before-uploading-in-react
        const objectURL = URL.createObjectURL(uploadedFile);
        setThumbnailSrc(objectURL);
        return () => URL.revokeObjectURL(objectURL);
    };

    return (
        <>
            <Box maxWidth={"6xl"} width="100%" m="auto" h="150vh" pt="2.5vh">
                <Sidebar active="Launchpad" />
                <Box
                    width="100%"
                    height="100%"
                    ml="75px"
                    p="1.5rem 3rem 3rem 3rem"
                >
                    <PageHeader
                        title="Configure project"
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                    />
                    <Box w="100%" mt="15px">
                        <Flex>
                            <NextLink href="/launchpad" color="gray.600">
                                My projects
                            </NextLink>
                            <ChevronRightIcon alignSelf="center" mx="10px" />
                            <Text color="gray.600" fontWeight="semibold">
                                {pid}
                            </Text>
                        </Flex>

                        <Box mt="25px">
                            <Flex></Flex>

                            <Grid templateColumns="repeat(3,1fr)" gap="25px">
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <Flex>
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
                                                    src={thumbnailSrc}
                                                    style={{
                                                        borderRadius: "50px",
                                                    }}
                                                />
                                            </Box>
                                            <Box>
                                                <FormLabel>
                                                    Upload project thumbnail
                                                </FormLabel>
                                                <Button
                                                    variant="action-button"
                                                    onClick={() => {
                                                        hiddenUploadFile.current.click();
                                                    }}
                                                >
                                                    Change thumbnail
                                                </Button>
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    ref={hiddenUploadFile}
                                                    accept="image/*"
                                                    onChange={handleUploadFile}
                                                />
                                            </Box>
                                        </Flex>
                                        <FormHelperText>
                                            1:1 aspect ratio recommended.
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl mt="25px">
                                        <FormLabel>Description</FormLabel>
                                        <Input type="text" bg="white"></Input>
                                        <FormHelperText>
                                            Tell us about your project in a
                                            sentence.
                                        </FormHelperText>
                                    </FormControl>
                                    <HStack spacing="25px" mt="25px">
                                        <FormControl alignSelf="baseline">
                                            <FormLabel>Funding goal</FormLabel>
                                            <Input
                                                type="number"
                                                bg="white"
                                            ></Input>
                                            <FormHelperText>
                                                Upon reaching funding goal,
                                                subsequent mints are priced at a
                                                50% premium.
                                            </FormHelperText>
                                        </FormControl>
                                        <FormControl alignSelf="baseline">
                                            <FormLabel>Price per NFT</FormLabel>
                                            {/* <Input
                                                type="number"
                                                defaultValue={100}
                                                bg="white"
                                                min={100}
                                            ></Input> */}
                                            <NumberInput min={100}>
                                                <NumberInputField bg="white" />
                                            </NumberInput>
                                            <FormHelperText>
                                                Minimum price per NFT fixed at
                                                100 ICX.
                                            </FormHelperText>
                                        </FormControl>
                                    </HStack>
                                    <HStack spacing="25px" mt="25px">
                                        <FormControl alignSelf="baseline">
                                            <FormLabel>Start date</FormLabel>
                                            <Input
                                                type="date"
                                                bg="white"
                                            ></Input>
                                        </FormControl>
                                        <FormControl alignSelf="baseline">
                                            <FormLabel>End date</FormLabel>
                                            <Input
                                                type="date"
                                                bg="white"
                                            ></Input>
                                        </FormControl>
                                    </HStack>

                                    <FormControl mt="25px">
                                        <FormLabel>Long Description</FormLabel>
                                        <Textarea
                                            type="text"
                                            noOfLines={5}
                                            placeholder="Enter a detailed description of your project"
                                            bg="white"
                                        ></Textarea>
                                        <FormHelperText>
                                            Tell us about your project, team,
                                            and milestones you intend to achieve
                                            with the funding.
                                        </FormHelperText>
                                    </FormControl>
                                    <Box
                                        mt="25px"
                                        width="100%"
                                        textAlign="right"
                                    >
                                        <Button variant="action-button">
                                            Save Changes
                                        </Button>
                                    </Box>
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <FormControl>
                                        <FormLabel>Preview</FormLabel>
                                        <Project
                                            src={thumbnailSrc}
                                            title="hello"
                                            desc="hello world"
                                            actionLabel="View Project"
                                        />
                                    </FormControl>
                                </GridItem>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
export default ProjectDetails;
