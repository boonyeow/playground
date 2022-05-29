import { Box, Flex, Text, Progress } from "@chakra-ui/react";

const SalesProgress = (props) => {
    return (
        <Box mt={props.mt} width={props.width}>
            <Progress
                colorScheme="green"
                size="sm"
                value={props.value}
                rounded="2xl"
            />
            <Flex
                justifyContent={"space-between"}
                pt="0.25rem"
                fontWeight={"bold"}
            >
                <Text as="span">{props.value}% minted</Text>
                <Text as="span">{props.status}</Text>
            </Flex>
        </Box>
    );
};

export default SalesProgress;
