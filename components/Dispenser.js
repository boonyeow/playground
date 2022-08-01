import {
    Box,
    Button,
    Heading,
    HStack,
    Input,
    Text,
    useNumberInput,
    VStack,
    Flex,
    NumberInput,
    NumberInputField,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import IconService from "icon-sdk-js";
import ICONexConnection, { numberWithCommas, sleep } from "../util/interact";
import cfg from "../util/config";

const {
    IconConverter,
    IconBuilder,
    HttpProvider,
    SignedTransaction,
    IconWallet,
} = IconService;

const Dispenser = ({ projectInfo, contractBalance, pid }) => {
    const connection = new ICONexConnection();
    const tbQuantity = useRef(null);
    let [campaignProgress, setCampaignProgress] = useState(0);
    let [totalPrice, setTotalPrice] = useState(0);

    const [userInfo, setUserInfo] = useState({
        userAddress: 0,
        projectsDeployed: [],
    });

    useEffect(() => {
        const temp = localStorage.getItem("_persist");
        temp = temp == null ? userInfo : JSON.parse(temp);
        setUserInfo(temp);
        setCampaignProgress(contractBalance / projectInfo.fundingGoal);
    }, []);

    const handleUpdatePrice = (e) => {
        setTotalPrice(projectInfo.pricePerNFT * e.target.value);
    };

    const handleMint = async () => {
        const quantity = tbQuantity.current.value;
        if (quantity == "") {
            alert("invalid quantity");
            return;
        }

        const txObj = new IconBuilder.CallTransactionBuilder()
            .from(userInfo.userAddress)
            .to(pid)
            .nid(cfg.NID)
            .nonce(IconConverter.toBigNumber(1))
            .version(IconConverter.toBigNumber(3))
            .timestamp(new Date().getTime() * 1000)
            .method("test1")
            .params({
                quantity: IconConverter.toHexNumber(quantity),
            })
            .value(
                IconConverter.toHexNumber(
                    quantity * projectInfo.pricePerNFT * 10 ** 18
                )
            )
            .build();

        const estimatedSteps = IconConverter.toBigNumber(
            await connection.debugService.estimateStep(txObj).execute()
        );

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
    };

    return (
        <Box
            borderRadius="15px"
            p="30px"
            bg="white"
            border="1px solid var(--chakra-colors-blackAlpha-200);"
        >
            <Box>
                <Text fontWeight="semibold" fontSize="sm">
                    Total raised
                </Text>
                <Text fontWeight="bold" fontSize="4xl" lineHeight={1.2}>
                    {numberWithCommas(contractBalance)} ICX
                </Text>
                <Text color="gray.500" fontSize="sm">
                    campaign has reached {campaignProgress}% of funding goal
                </Text>

                <Box mt="15px">
                    <Text fontWeight="semibold" fontSize="sm">
                        Participate offering
                    </Text>
                    <Flex mt="10px">
                        <NumberInput w="100%">
                            <NumberInputField
                                placeholder="Enter the quantity"
                                fontSize="sm"
                                min={1}
                                onChange={handleUpdatePrice}
                                ref={tbQuantity}
                            />
                        </NumberInput>
                    </Flex>
                    <Flex
                        justifyContent="space-between"
                        mt="10px"
                        fontSize="sm"
                    >
                        <Text color="gray.500">Total price</Text>
                        <Text fontWeight="semibold">
                            {numberWithCommas(totalPrice)} ICX
                        </Text>
                    </Flex>
                    <Button
                        width="100%"
                        borderRadius="5px"
                        mt="15px"
                        variant="action-button"
                        onClick={handleMint}
                    >
                        Mint Now
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Dispenser;
