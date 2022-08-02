import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text,
    Box,
    Flex,
    CloseButton,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react";

const CustomAlert = ({
    showStatus,
    title,
    desc,
    status,
    onClose,
    showClose,
}) => {
    const successColor = "#5cb85c";
    const failureColor = "#f44336";

    const success = (
        <Box
            className="w4rAnimated_checkmark"
            mt="35px"
            mb="25px"
            alignSelf="center"
        >
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 130.2 130.2"
            >
                <circle
                    className="path circle"
                    fill="none"
                    stroke={successColor}
                    strokeWidth="6"
                    strokeMiterlimit="10"
                    cx="65.1"
                    cy="65.1"
                    r="62.1"
                />
                <polyline
                    className="path check"
                    fill="none"
                    stroke={successColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    points="100.2,40.2 51.5,88.8 29.8,67.5 "
                />
            </svg>
        </Box>
    );
    const failure = (
        <Box
            className="w4rAnimated_checkmark"
            mt="35px"
            mb="25px"
            alignSelf="center"
        >
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 130.2 130.2"
            >
                <circle
                    className="path circle"
                    fill="none"
                    stroke={failureColor}
                    strokeWidth="6"
                    strokeMiterlimit="10"
                    cx="65.1"
                    cy="65.1"
                    r="62.1"
                />
                <line
                    className="path line"
                    fill="none"
                    stroke={failureColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    x1="34.4"
                    y1="37.9"
                    x2="95.8"
                    y2="92.3"
                />
                <line
                    className="path line"
                    fill="none"
                    stroke={failureColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    x1="95.8"
                    y1="38"
                    x2="34.4"
                    y2="92.2"
                />
            </svg>
        </Box>
    );
    const loading = (
        <Box mt="35px" mb="25px" lineHeight="0.75">
            <Spinner
                width="5rem"
                height="5rem"
                thickness="4px"
                speed="1s"
                size="xl"
                borderColor="#3b83f1"
            />
        </Box>
    );
    return (
        <Modal
            isCentered
            isOpen={showStatus}
            onClose={onClose}
            motionPreset="slideInBottom"
            size="md"
            autoFocus={false}
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent borderRadius={"xl"}>
                {showClose ? <ModalCloseButton /> : ""}
                <ModalBody px={10} pb={8} textAlign="center">
                    {status === "loading"
                        ? loading
                        : status === "success"
                        ? success
                        : failure}
                    <Text fontWeight="bold" fontSize={"3xl"}>
                        {title}
                    </Text>
                    <Text>{desc}</Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CustomAlert;
