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
    Tbody,
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
import IconService from "icon-sdk-js";
import ICONexConnection, { sleep } from "../../util/interact";
import cfg from "../../util/config";
import CustomAlert from "../../components/CustomAlert";
import axios from "axios";

const Editor = dynamic(() => import("../../components/MyEditor"), {
    ssr: false,
});

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const ProjectDetails = () => {
    const connection = new ICONexConnection();
    const hiddenUploadFile = useRef(null);
    const tbDescription = useRef(null);
    const tbFundingGoal = useRef(null);
    const tbPricePerNFT = useRef(null);

    const router = useRouter();
    const { pid } = router.query;

    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });

    const [previewInfo, setPreviewInfo] = useState({
        thumbnailSrc: "/../../4.avif",
        shortDesc: "",
    });

    // datepicker state
    const [selectedRange, setSelectedRange] = useState({
        from: "",
        to: "",
    });

    // my editor settings
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");

    const [projectInfo, setProjectInfo] = useState({
        name: "",
        thumbnailSrc: "",
        description: "",
        details: "",
        fundingGoal: "",
        pricePerNFT: "",
        startTimestamp: "",
        endTimestamp: "",
    });

    const [showStatus, setShowStatus] = useState(false);
    const [statusType, setStatusType] = useState("loading");
    const [statusTitle, setStatusTitle] = useState("updating contract");
    const [statusDesc, setStatusDesc] = useState("awaiting tx approval..");

    useEffect(() => {
        const fetchProjectInfo = async () => {
            const call = new IconBuilder.CallBuilder()
                .from(null)
                .to(pid)
                .method("getProjectInfo")
                .build();
            let res = await connection.iconService.call(call).execute();
            console.log("res", res);
            let pi = {
                name: res.name,
                thumbnailSrc: res.thumbnailSrc,
                description: res.description,
                details: res.details,
                fundingGoal: IconConverter.toUtf8(res.fundingGoal),
                pricePerNFT: IconConverter.toUtf8(res.pricePerNFT),
                startTimestamp: IconConverter.toNumber(res.startTimestamp),
                endTimestamp: IconConverter.toNumber(res.endTimestamp),
            };
            console.log("pi", pi);
            setProjectInfo(pi);

            let range = {};
            range.from =
                pi.startTimestamp == "" ? "" : new Date(pi.startTimestamp);
            range.to = pi.endTimestamp == "" ? "" : new Date(pi.endTimestamp);

            setSelectedRange(range);
        };

        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);
        setEditorLoaded(true);
        // add check if user is not deployer, not allowed to view
        //
        if (router.isReady) {
            // fetch project info
            fetchProjectInfo();
        }
    }, [router.isReady]);

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
        setProjectInfo({
            name: projectInfo.name,
            thumbnailSrc: projectInfo.thumbnailSrc,
            description: e.target.value,
            details: projectInfo.details,
            fundingGoal: projectInfo.fundingGoal,
            pricePerNFT: projectInfo.pricePerNFT,
            startTimestamp: projectInfo.startTimestamp,
            endTimestamp: projectInfo.endTimestamp,
        });
    };

    const handleUpdateGoal = (e) => {
        setProjectInfo({
            name: projectInfo.name,
            thumbnailSrc: projectInfo.thumbnailSrc,
            description: projectInfo.description,
            details: projectInfo.details,
            fundingGoal: e.target.value,
            pricePerNFT: projectInfo.pricePerNFT,
            startTimestamp: projectInfo.startTimestamp,
            endTimestamp: projectInfo.endTimestamp,
        });
    };

    const handleUpdatePrice = (e) => {
        setProjectInfo({
            name: projectInfo.name,
            thumbnailSrc: projectInfo.thumbnailSrc,
            description: projectInfo.description,
            details: projectInfo.details,
            fundingGoal: projectInfo.fundingGoal,
            pricePerNFT: e.target.value,
            startTimestamp: projectInfo.startTimestamp,
            endTimestamp: projectInfo.endTimestamp,
        });
    };

    const handleSave = async () => {
        const fundingGoal = tbFundingGoal.current.value;
        const pricePerNFT = tbPricePerNFT.current.value;

        if (fundingGoal.length == 0 || pricePerNFT.length == 0) {
            alert("not allowed");
            return;
        }

        setShowStatus(true);

        const data = {
            name: projectInfo.name,
            thumbnailSrc: projectInfo.thumbnailSrc,
            description: projectInfo.description,
            details: projectInfo.details,
            fundingGoal: IconConverter.toHex(fundingGoal),
            pricePerNFT: IconConverter.toHex(pricePerNFT),
            startTimestamp: IconConverter.toHex(
                new Date(selectedRange.from).getTime()
            ),
            endTimestamp: IconConverter.toHex(
                new Date(selectedRange.to).getTime()
            ),
        };

        const txObj = new IconBuilder.CallTransactionBuilder()
            .from(userInfo.userAddress)
            .to(pid)
            .nid(cfg.NID)
            .nonce(IconConverter.toBigNumber(1))
            .version(IconConverter.toBigNumber(3))
            .timestamp(new Date().getTime() * 1000)
            .method("updateProjectInfo")
            .params(data)
            .build();
        console.log("txobj", txObj);
        const estimatedSteps = IconConverter.toBigNumber(
            await connection.debugService.estimateStep(txObj).execute()
        );
        console.log("estimatedSteps", estimatedSteps);

        txObj.stepLimit = IconService.IconConverter.toHex(
            estimatedSteps.plus(IconConverter.toBigNumber(10000)) // prevent out of step
        );

        const payload = {
            jsonrpc: "2.0",
            method: "icx_sendTransaction",
            id: 6639,
            params: IconConverter.toRawTransaction(txObj),
        };

        try {
            let rpcResponse = await connection.ICONexRequest(
                "REQUEST_JSON-RPC",
                payload
            );
            if (rpcResponse.error) {
                setStatusType("failure");
                setStatusTitle("ooops");
                setStatusDesc("your transaction was not approved");
            } else {
                // success
                console.log(rpcResponse);
                await sleep(5000);

                //callback to get txResult until response
                const txResult = await connection.iconService
                    .getTransactionResult(rpcResponse.result)
                    .execute();
                await sleep(5000);

                let params = {
                    userAddress: userInfo.userAddress,
                    contractAddress: pid,
                    name: projectInfo.name,
                    description: projectInfo.description,
                    details: projectInfo.details,
                    thumbnailSrc: projectInfo.thumbnailSrc,
                    fundingGoal: fundingGoal,
                    pricePerNFT: pricePerNFT,
                    startTimestamp: new Date(selectedRange.from).getTime(),
                    endTimestamp: new Date(selectedRange.to).getTime(),
                };
                let response = await axios.post(
                    "http://localhost:3000/api/projects/add", //change it to {endpoint}/api/projects/add
                    params
                );

                setStatusType("success");
                setStatusTitle("success");
                setStatusDesc("your contract has been updated!");

                let projectsDeployed = userInfo.projectsDeployed;
                let contractIndex;
                for (let i = 0; i < projectsDeployed.length; i++) {
                    if (projectsDeployed[i].contractAddress == pid) {
                        contractIndex = i;
                        break;
                    }
                }
                projectsDeployed[contractIndex] = params;
                localStorage.setItem(
                    "_persist",
                    JSON.stringify({
                        userAddress: userInfo.userAddress,
                        projectsDeployed: projectsDeployed,
                    })
                );
            }
        } catch (err) {
            console.log(err);
            setStatusType("failure");
            setStatusTitle("ooops");
            setStatusDesc("your transaction has failed, please try again");
        }
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
                                            ref={tbDescription}
                                            type="text"
                                            bg="white"
                                            onChange={handleUpdateDesc}
                                            value={projectInfo.description}
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
                                                ref={tbFundingGoal}
                                                type="number"
                                                bg="white"
                                                onChange={handleUpdateGoal}
                                                value={projectInfo.fundingGoal}
                                            ></Input>
                                            <FormHelperText>
                                                Upon reaching funding goal,
                                                subsequent mints are priced at a
                                                50% premium.
                                            </FormHelperText>
                                        </FormControl>
                                        <FormControl alignSelf="baseline">
                                            <FormLabel>Price per NFT</FormLabel>
                                            <Input
                                                ref={tbPricePerNFT}
                                                type="number"
                                                bg="white"
                                                onChange={handleUpdatePrice}
                                                value={projectInfo.pricePerNFT}
                                                min={100}
                                            ></Input>
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
                                            <DatePicker
                                                selectedRange={selectedRange}
                                                setSelectedRange={
                                                    setSelectedRange
                                                }
                                            />
                                        </FormControl>
                                    </Box>
                                    <FormControl mt="25px">
                                        <FormLabel>Project Overview</FormLabel>

                                        <Editor
                                            value=""
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
                                        <Button
                                            variant="action-button"
                                            onClick={handleSave}
                                        >
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
                                            src={projectInfo.thumbnailSrc}
                                            title={projectInfo.name}
                                            desc={projectInfo.description}
                                            actionLabel="View Project"
                                        />
                                    </FormControl>
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <CustomAlert
                showStatus={showStatus}
                onClose={() => {
                    setShowStatus(false);
                    setStatusType("loading");
                    setStatusTitle("updating contract");
                    setStatusDesc("awaiting tx approval"); //revert everything to default
                }}
                title={statusTitle}
                desc={statusDesc}
                status={statusType}
            />
        </>
    );
};
export default ProjectDetails;
