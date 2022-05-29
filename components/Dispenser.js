import {
    Box,
    Button,
    Heading,
    HStack,
    Input,
    Text,
    useNumberInput,
    VStack,
} from "@chakra-ui/react";

const Dispenser = (props) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 1,
            min: 1,
            max: 5,
        });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    return (
        <Box
            background="radial-gradient(circle, #181818, black)"
            borderRadius="1rem"
            padding="1rem"
            mt={props.mt}
            color="white"
            display="inline-block"
            width={props.width}
        >
            <Box bgColor="White"></Box>
            <Heading fontSize="2xl">NFT Dispenser</Heading>
            <HStack spacing="50" px="1rem" pt="0.5rem">
                <VStack>
                    <Text color="#979797">Collection</Text>
                    <Text>Jan Protocol</Text>
                </VStack>
                <VStack>
                    <Text color="#979797">Quantity</Text>
                    <HStack maxW="150px">
                        <Button
                            {...inc}
                            padding={"0"}
                            height="auto"
                            bgColor="transparent"
                            _active={{ bgColor: "transparent" }}
                            _hover={{ bgColor: "transparent" }}
                        >
                            +
                        </Button>
                        <Input
                            {...input}
                            textAlign="center"
                            border="0"
                            padding={"0"}
                            height="auto"
                            _focus={{ border: "0" }}
                        />
                        <Button
                            {...dec}
                            padding={"0"}
                            height="auto"
                            bgColor="transparent"
                            _active={{ bgColor: "transparent" }}
                            _hover={{ bgColor: "transparent" }}
                        >
                            -
                        </Button>
                    </HStack>
                </VStack>
                <VStack>
                    <Text color="#979797">Total</Text>
                    <Text>150 ICX</Text>
                </VStack>
            </HStack>
            <Box width="100%" textAlign={"right"} mt="1rem">
                <Button borderRadius="2rem" color="black">
                    Mint NFT
                </Button>
            </Box>
        </Box>
    );
};

export default Dispenser;
