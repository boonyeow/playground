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
    FormErrorMessage,
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
import { useFormik } from "formik";
import * as Yup from "yup";
import Footer from "../../components/Footer";

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

    const [projectOverview, setProjectOverview] = useState("");

    const [projectInfo, setProjectInfo] = useState({
        thumbnailSrc: "",
        name: "",
    });

    // thumbnail file upload state
    const [toUpload, setToUpload] = useState(null);

    const [showStatus, setShowStatus] = useState(false);
    const [statusInfo, setStatusInfo] = useState({
        type: "loading",
        title: "updating contract",
        desc: "awaiting tx approval...",
    });

    const [showClose, setShowClose] = useState(true);
    useEffect(() => {
        const fetchProjectInfo = async () => {
            const call = new IconBuilder.CallBuilder()
                .from(null)
                .to(pid)
                .method("getProjectInfo")
                .build();
            let res = await connection.iconService.call(call).execute();

            let startTimestamp = IconConverter.toNumber(res.startTimestamp);
            let endTimestamp = IconConverter.toNumber(res.endTimestamp);

            let range = {};
            range.from = startTimestamp == "" ? "" : new Date(startTimestamp);
            range.to = endTimestamp == "" ? "" : new Date(endTimestamp);
            setSelectedRange(range);
            setProjectInfo({
                thumbnailSrc: res.thumbnailSrc,
                name: res.name,
            });

            setProjectOverview(res.details);

            formik.setValues({
                description: res.description,
                fundingGoal: IconConverter.toNumber(res.fundingGoal) / 10 ** 18,
                pricePerNFT: IconConverter.toNumber(res.pricePerNFT) / 10 ** 18,
                withdrawalRate:
                    IconConverter.toNumber(res.withdrawalRate) / 10 ** 18,
                selectedRange: range,
            });
        };

        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);
        // add check if user is not deployer, not allowed to view
        if (router.isReady) {
            // fetch project info
            fetchProjectInfo();
        }
    }, [router.isReady]);

    const handleSave = async (v) => {
        setShowStatus(true);

        // Constructing params for call transaction
        let data = { ...projectInfo };
        data.details = projectOverview;
        data.description = v.description;
        data.fundingGoal = IconConverter.toHexNumber(v.fundingGoal * 10 ** 18);
        data.pricePerNFT = IconConverter.toHexNumber(v.pricePerNFT * 10 ** 18);
        data.startTimestamp = IconConverter.toHex(
            new Date(v.selectedRange.from).getTime()
        );
        data.endTimestamp = IconConverter.toHex(
            new Date(v.selectedRange.to).getTime()
        );
        data.withdrawalRate = IconConverter.toHexNumber(
            v.withdrawalRate * 10 ** 18
        );

        if (toUpload !== null) {
            // user has uploaded file, proceed to generate url
            const formData = new FormData();
            formData.append("upload", toUpload);
            let res = await axios.post(`${cfg.BASE_URL}/api/upload`, formData);
            data.thumbnailSrc = res.data.default;
        }

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

        let rpcResponse = await connection.ICONexRequest(
            "REQUEST_JSON-RPC",
            payload
        );

        getTransactionResult(rpcResponse, 5);
    };

    const getTransactionResult = async (rpcResponse, maxRetry) => {
        console.log("trying...", maxRetry);
        if (rpcResponse.error) {
            setShowClose(true);
            setStatusInfo({
                type: "failure",
                title: "ooops",
                desc: "your transaction was not approved",
            });
        } else {
            try {
                const txResult = await connection.iconService
                    .getTransactionResult(rpcResponse.result)
                    .execute();
                if (txResult.status === 1) {
                    let params = {
                        userAddress: userInfo.userAddress,
                        contractAddress: pid,
                        name: projectInfo.name,
                        description: formik.values.description,
                        thumbnailSrc: projectInfo.thumbnailSrc,
                    };
                    await axios.post(
                        `${cfg.BASE_URL}/api/projects/add`,
                        params
                    );

                    setShowClose(true);
                    setStatusInfo({
                        type: "success",
                        title: "success",
                        desc: "your contract has been updated!",
                    });

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
                } else {
                    console.log("FAILED BOI", txResult);
                    setShowClose(true);
                    setStatusInfo({
                        type: "failure",
                        title: "ooops",
                        desc: "your transaction has failed, please try again",
                    });
                }
            } catch (err) {
                if (maxRetry > 0) {
                    setTimeout(
                        () => getTransactionResult(rpcResponse, maxRetry - 1),
                        2200
                    );
                } else {
                    console.log(err);
                    setShowClose(true);
                    setStatusInfo({
                        type: "failure",
                        title: "ooops",
                        desc: "your transaction has failed, please try again",
                    });
                }
            }
        }
    };
    const formik = useFormik({
        initialValues: {
            description: "",
            fundingGoal: "",
            pricePerNFT: "",
            withdrawalRate: "",
            selectedRange: "",
        },
        validationSchema: Yup.object({
            description: Yup.string()
                .max(80, "Must be 80 characters or less")
                .required("Required field"),
            fundingGoal: Yup.number()
                .positive("Must be a positive number")
                .min(100, "Minimum funding goal is 100 ICX")
                .required("Required field"),
            pricePerNFT: Yup.number()
                .positive("Must be a positive number")
                .min(10, "Minimum price per NFT is 10 ICX")
                .required("Required field"),
            withdrawalRate: Yup.number().required("Required field"),
            selectedRange: Yup.object().shape({
                from: Yup.string().required("Required field"),
                to: Yup.string().required("Required field"),
            }),
        }),
        onSubmit: handleSave,
    });

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

        setToUpload(uploadedFile);
        return () => URL.revokeObjectURL(objectURL);
    };
    const isInvalid = (key) => {
        if (key == "description") {
            return formik.touched.description && formik.errors.description;
        } else if (key == "fundingGoal") {
            return formik.touched.fundingGoal && formik.errors.fundingGoal;
        } else if (key == "pricePerNFT") {
            return formik.touched.pricePerNFT && formik.errors.pricePerNFT;
        } else if (key == "withdrawalRate") {
            return (
                formik.touched.withdrawalRate && formik.errors.withdrawalRate
            );
        } else if (key == "selectedRange") {
            return formik.touched.selectedRange && formik.errors.selectedRange;
        }
    };
    return (
        <>
            <Box maxWidth={"8xl"} width="100%" m="auto" h="150vh" pt="2.5vh">
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
                                    <form onSubmit={formik.handleSubmit}>
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
                                                            borderRadius:
                                                                "50px",
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
                                                        onChange={
                                                            handleUploadFile
                                                        }
                                                    />
                                                </Box>
                                            </Flex>
                                            <FormHelperText>
                                                1:1 aspect ratio recommended.
                                            </FormHelperText>
                                        </FormControl>

                                        <FormControl
                                            mt="25px"
                                            isInvalid={
                                                isInvalid("description")
                                                    ? true
                                                    : false
                                            }
                                        >
                                            <FormLabel>Description</FormLabel>
                                            <Input
                                                name="description"
                                                id="description"
                                                type="text"
                                                bg="white"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values.description
                                                }
                                            ></Input>
                                            {isInvalid("description") ? (
                                                <FormErrorMessage>
                                                    {formik.errors.description}
                                                </FormErrorMessage>
                                            ) : (
                                                <FormHelperText>
                                                    Tell us about your project
                                                    in a sentence.
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                        <HStack spacing="25px" mt="25px">
                                            <FormControl
                                                alignSelf="baseline"
                                                isInvalid={
                                                    isInvalid("fundingGoal")
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <FormLabel>
                                                    Funding Goal
                                                </FormLabel>
                                                <Input
                                                    name="fundingGoal"
                                                    id="fundingGoal"
                                                    type="number"
                                                    bg="white"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .fundingGoal
                                                    }
                                                ></Input>
                                                {isInvalid("fundingGoal") ? (
                                                    <FormErrorMessage>
                                                        {
                                                            formik.errors
                                                                .fundingGoal
                                                        }
                                                    </FormErrorMessage>
                                                ) : (
                                                    <FormHelperText>
                                                        Upon reaching funding
                                                        goal, subsequent mints
                                                        are priced at a 50%
                                                        premium.
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                            <FormControl
                                                alignSelf="baseline"
                                                isInvalid={
                                                    isInvalid("pricePerNFT")
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <FormLabel>
                                                    Price per NFT
                                                </FormLabel>
                                                <Input
                                                    name="pricePerNFT"
                                                    id="pricePerNFT"
                                                    type="number"
                                                    bg="white"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .pricePerNFT
                                                    }
                                                ></Input>
                                                {isInvalid("pricePerNFT") ? (
                                                    <FormErrorMessage>
                                                        {
                                                            formik.errors
                                                                .pricePerNFT
                                                        }
                                                    </FormErrorMessage>
                                                ) : (
                                                    <FormHelperText>
                                                        Configure mint price for
                                                        initial offering.
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </HStack>

                                        <FormControl
                                            alignSelf="baseline"
                                            mt="25px"
                                            isInvalid={
                                                isInvalid("withdrawalRate")
                                                    ? true
                                                    : false
                                            }
                                        >
                                            <FormLabel>
                                                Withdrawal Rate
                                            </FormLabel>
                                            <Input
                                                name="withdrawalRate"
                                                id="withdrawalRate"
                                                type="number"
                                                bg="white"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values.withdrawalRate
                                                }
                                            ></Input>

                                            {isInvalid("withdrawalRate") ? (
                                                <FormErrorMessage>
                                                    {
                                                        formik.errors
                                                            .withdrawalRate
                                                    }
                                                </FormErrorMessage>
                                            ) : (
                                                <FormHelperText>
                                                    After campaign, withdrawals
                                                    are subjected to a rate
                                                    limit (unit: ICX / sec).
                                                </FormHelperText>
                                            )}
                                        </FormControl>

                                        <Box mt="25px">
                                            <FormControl
                                                alignSelf="baseline"
                                                isInvalid={
                                                    isInvalid("selectedRange")
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <FormLabel>
                                                    Campaign Duration
                                                </FormLabel>
                                                <DatePicker
                                                    selectedRange={
                                                        selectedRange
                                                    }
                                                    setSelectedRange={
                                                        setSelectedRange
                                                    }
                                                    formik={formik}
                                                />
                                                {isInvalid("selectedRange") ? (
                                                    <FormErrorMessage>
                                                        Required field
                                                    </FormErrorMessage>
                                                ) : (
                                                    ""
                                                )}
                                            </FormControl>
                                        </Box>
                                        <FormControl mt="25px">
                                            <FormLabel>
                                                Project Overview
                                            </FormLabel>

                                            <Editor
                                                value={projectOverview}
                                                onChange={(v) =>
                                                    setProjectOverview(v)
                                                }
                                            />

                                            <FormHelperText>
                                                Tell us about your project,
                                                team, and milestones you intend
                                                to achieve with the funding.
                                            </FormHelperText>
                                        </FormControl>
                                        <Box
                                            mt="25px"
                                            width="100%"
                                            textAlign="right"
                                        >
                                            <Button
                                                type="submit"
                                                variant="action-button"
                                            >
                                                Save Changes
                                            </Button>
                                        </Box>
                                    </form>
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
                                            desc={formik.values.description}
                                            actionLabel="View Project"
                                            href={""}
                                            contractAddr={pid || ""}
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
                    setStatusInfo({
                        type: "loading",
                        title: "updating contract",
                        desc: "awaiting tx approval",
                    }); //revert everything to default
                }}
                title={statusInfo.title}
                desc={statusInfo.desc}
                status={statusInfo.type}
                showClose={showClose}
            />
        </>
    );
};
export default ProjectDetails;
