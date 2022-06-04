import { Box, HStack, VStack } from "@chakra-ui/react";
import UploadFileComponent from "../UploadFileComponent";

const UploadAssetPanel = () => {
    return (
        <Box>
            <VStack spacing="5" px="5">
                <HStack width="100%" spacing="10">
                    <VStack alignSelf={"baseline"} width="100%">
                        <UploadFileComponent title="Upload Files" />
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    );
};

export default UploadAssetPanel;
