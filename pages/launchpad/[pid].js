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
    HStack,
    Button,
    NumberInput,
    NumberInputField,
    VisuallyHiddenInput,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/PageHeader";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/router";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Project from "../../components/Project";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import NextLink from "next/link";
import DatePicker from "../../components/DatePicker";

const Editor = dynamic(() => import("../../components/MyEditor"), {
    ssr: false,
});

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
        shortDesc: "",
    });

    // my editor settings
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");

    useEffect(() => {
        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);
        setEditorLoaded(true);
        // add check if user is not deployer, not allowed to view

        //
    }, []);

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
        // setThumbnailSrc(objectURL);
        setPreviewInfo({
            thumbnailSrc: objectURL,
            shortDesc: previewInfo.shortDesc,
        });

        return () => URL.revokeObjectURL(objectURL);
    };

    const handleUpdateDesc = (e) => {
        console.log(e.target.value);
        setPreviewInfo({
            thumbnailSrc: previewInfo.thumbnailSrc,
            shortDesc: e.target.value,
        });
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
                            <Flex>
                                <Box
                                    width="100%"
                                    maxWidth="calc(100% / 3 * 2 - 12.5px)"
                                    mr="25px"
                                >
                                    <FormControl>
                                        <Flex>
                                            <Box
                                                minWidth="75px"
                                                width="75px"
                                                height="75px"
                                                bg="#272727"
                                                mr="30px"
                                                borderRadius={"50px"}
                                            >
                                                <NextImage
                                                    layout="responsive"
                                                    objectFit="contain"
                                                    width="100%"
                                                    height="100%"
                                                    src={
                                                        previewInfo.thumbnailSrc
                                                    }
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
                                        <Input
                                            type="text"
                                            bg="white"
                                            onChange={handleUpdateDesc}
                                            value={previewInfo.shortDesc}
                                        ></Input>
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
                                            <NumberInput min={100}>
                                                <NumberInputField bg="white" />
                                            </NumberInput>
                                            <FormHelperText>
                                                Minimum price per NFT fixed at
                                                100 ICX.
                                            </FormHelperText>
                                        </FormControl>
                                    </HStack>
                                    <Box mt="25px">
                                        <FormControl alignSelf="baseline">
                                            <FormLabel>
                                                Campaign Duration
                                            </FormLabel>
                                            <DatePicker />
                                        </FormControl>
                                    </Box>
                                    <FormControl mt="25px">
                                        <FormLabel>Project Overview</FormLabel>
                                        <Editor
                                            value={"Foo"}
                                            onChange={(v) => console.log(v)}
                                        />

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
                                </Box>
                                <Box
                                    maxWidth="calc(100% / 3 - 12.5px)"
                                    width="100%"
                                >
                                    <FormControl>
                                        <FormLabel>Preview</FormLabel>
                                        <Project
                                            src={previewInfo.thumbnailSrc}
                                            title="hello"
                                            desc={previewInfo.shortDesc}
                                            actionLabel="View Project"
                                        />
                                    </FormControl>
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
export default ProjectDetails;
