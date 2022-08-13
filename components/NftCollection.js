import { Box, Text, Button, Flex, Center, Image, VStack } from "@chakra-ui/react";
import NextImage from "next/image";


const NftCollection = () => {
    return (
        <>
            <Flex w="full" alignItems="center" justifyContent="center">
                <Box
                    w="100%"
                    borderRadius="1rem"
                    shadow="lg"
                    py="0.75rem"
                    bg="white"
                >
                    <Box
                        borderRadius="1rem"
                        position="relative"
                        w="90%"
                        margin="0 auto"
                    >
                        <NextImage
                            layout="responsive"
                            width="100%"
                            height="100%"
                            src="/../public/0.avif"
                            style={{ borderRadius: "1rem" }}
                        />
                    </Box>
                    <Box pt="1rem" pb="0.5rem">
                        <Box maxW={[80, 80, 80, 64, 72]} margin="auto">
                            <Text noOfLines={1} fontWeight="semibold">
                                Unnamed Project #13
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </>
    )
}

export default NftCollection