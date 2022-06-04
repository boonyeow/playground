import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";

const SingleCollection = (props) => {
    let data;
    if (props.data === undefined)
        data = {
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
    else {
        data = props.data;
    }
    const base = (
        <Flex w="full" alignItems="center" justifyContent="center" width="100%">
            <Box
                width={[96, 96, 96, "calc(100% - 1rem)", "calc(100% - 1rem)"]}
                borderRadius="1rem"
                shadow="lg"
                transition="transform 0.2s"
                _hover={props._hover}
            >
                <Box borderRadius="1rem" position="relative" margin="0.5rem">
                    <NextImage
                        layout="responsive"
                        minWidth={"20rem"}
                        minHeight="20rem"
                        width="20rem"
                        height="20rem"
                        objectFit="cover"
                        src={data.src}
                        style={{ borderRadius: "1rem" }}
                    ></NextImage>
                </Box>

                <Box px="6" pt="2" pb="4">
                    <Box maxW={[80, 80, 80, 64, 72]} margin="auto">
                        <Text variant="card-header" noOfLines={1}>
                            {data.collectionTitle}
                        </Text>
                    </Box>

                    <Box margin={2}>
                        <Flex justifyContent={"space-evenly"}>
                            <VStack alignItems="center" spacing="-0.5">
                                <Text variant="card-item-header">Price</Text>
                                <Text variant="card-item-value" noOfLines={1}>
                                    {data.mintPrice} {data.currency}
                                </Text>
                            </VStack>
                            <VStack alignItems="center" spacing="-0.5">
                                <Text variant="card-item-header">Supply</Text>
                                <Text variant="card-item-value" noOfLines={1}>
                                    {data.totalSupply}
                                </Text>
                            </VStack>
                            <VStack alignItems="center" spacing="-0.5">
                                <Text variant="card-item-header">
                                    Starts In
                                </Text>
                                <Text variant="card-item-value" noOfLines={1}>
                                    1d 5h 38m
                                </Text>
                            </VStack>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );

    if (props.asNextLink) {
        return (
            <NextLink
                href={{
                    pathname: `${props.path}/[cid]`,
                    query: {
                        cid: data.contractAddress,
                    },
                }}
            >
                {base}
            </NextLink>
        );
    } else {
        return base;
    }
};

export default SingleCollection;
