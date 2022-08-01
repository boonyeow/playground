import { Box, Text, VStack, Button, Flex } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";

const FeaturedProject = ({ projectInfo, addr, actionLabel }) => {
    const [endDifference, setEndDifference] = useState(
        projectInfo.endTimestamp - new Date().getTime()
    );
    const [startDifference, setStartDifference] = useState(
        projectInfo.startTimestamp - new Date().getTime()
    );
    useEffect(() => {
        if (projectInfo) {
            if (
                currentTimestamp > projectInfo.startTimestamp &&
                currentTimestamp < projectInfo.endTimestamp
            ) {
                const intervalId = setInterval(() => {
                    updateEndDifference();
                }, 1000);
                return () => clearTimeout(intervalId);
            } else {
                const intervalId = setInterval(() => {
                    updateStartDifference();
                }, 1000);
                return () => clearTimeout(intervalId);
            }
        }
    }, [projectInfo]);

    const updateEndDifference = () => {
        setEndDifference(projectInfo.endTimestamp - new Date().getTime());
    };

    const updateStartDifference = () => {
        setStartDifference(projectInfo.startTimestamp - new Date().getTime());
    };

    const formatTimestamp = (difference) => {
        var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24); // returns 1
        difference -= daysDifference * 1000 * 60 * 60 * 24;

        var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
        difference -= hoursDifference * 1000 * 60 * 60;

        var minutesDifference = Math.floor(difference / 1000 / 60);
        difference -= minutesDifference * 1000 * 60;

        var secondsDifference = Math.floor(difference / 1000);
        return `${daysDifference}D ${hoursDifference}H ${minutesDifference}m ${secondsDifference}s`;
    };

    const src =
        projectInfo.thumbnailSrc == ""
            ? "/../../4.avif"
            : projectInfo.thumbnailSrc; // to remove;

    const currentTimestamp = new Date().getTime();
    const priceComponent = (
        <VStack mr="30px" spacing="0">
            <Text
                color="white"
                fontWeight="semibold"
                alignSelf="self-start"
                fontSize="sm"
            >
                Price per NFT
            </Text>
            <Text fontSize="lg" alignSelf="self-start" color="#8e8e8e">
                {projectInfo.pricePerNFT} ICX
            </Text>
        </VStack>
    );

    const fundingGoalComponent = (
        <VStack mr="30px" spacing="0">
            <Text
                color="white"
                fontWeight="semibold"
                alignSelf="self-start"
                fontSize="sm"
            >
                Funding goal
            </Text>
            <Text fontSize="lg" alignSelf="self-start" color="#8e8e8e">
                {projectInfo.fundingGoal} ICX
            </Text>
        </VStack>
    );

    const startsInComponent = (
        <VStack mr="30px" spacing="0">
            <Text
                color="white"
                fontWeight="semibold"
                alignSelf="self-start"
                fontSize="sm"
            >
                Starts in
            </Text>
            <Text fontSize="lg" alignSelf="self-start" color="#8e8e8e">
                {formatTimestamp(startDifference)}
            </Text>
        </VStack>
    );

    const endsInComponent = (
        <VStack mr="30px" spacing="0">
            <Text
                color="white"
                fontWeight="semibold"
                alignSelf="self-start"
                fontSize="sm"
            >
                Ends in
            </Text>
            <Text fontSize="lg" alignSelf="self-start" color="#8e8e8e">
                {formatTimestamp(endDifference)}
            </Text>
        </VStack>
    );

    return (
        <Flex borderRadius="15px" p="30px" shadow="md" bg="#0e0e0e" w="100%">
            <Box color="white" w="100%">
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                >
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
                            src={src}
                            style={{ borderRadius: "50px" }}
                        />
                    </Box>
                    <NextLink href={`/governance/${addr}`}>
                        <Button borderRadius="50px" color="black" fontSize="sm">
                            {actionLabel}
                        </Button>
                    </NextLink>
                </Flex>
                <Box alignSelf="center" mt="10px">
                    <Text fontWeight="bold" fontSize="2xl">
                        {projectInfo.name}
                    </Text>
                    <Text color="#8e8e8e" mt="10px">
                        {projectInfo.description}
                    </Text>
                </Box>
                <Box mt="15px">
                    <Box
                        bg="#1c1c1c"
                        display="inline-flex"
                        p="25px"
                        borderRadius="15px"
                    >
                        {priceComponent}
                        {fundingGoalComponent}

                        {currentTimestamp - projectInfo.startTimestamp <= 0
                            ? startsInComponent
                            : projectInfo.endTimestamp - currentTimestamp >= 0
                            ? endsInComponent
                            : ""}
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
};

export default FeaturedProject;
