import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
        primary: "",
    },
    components: {
        Button: {
            baseStyle: {
                _focus: {
                    boxShadow: "none",
                },
            },
            sizes: {
                xl: {
                    h: "56px",
                    fontSize: "lg",
                    px: "32px",
                },
            },
            variants: {
                "cw-button": {
                    // Connect Wallet Modal > Connect Wallet Button
                    bgColor: "white",
                    color: "#0f1419",
                    border: "1px solid",
                    borderColor: "gray.300",
                    borderRadius: "2xl",
                    _hover: {
                        color: "white",
                        bgColor: "#0f1419",
                    },
                },
                "gs-button": {
                    // Connect Wallet Modal > Get Started Button
                    bgColor: "#ea4c89",
                    color: "white",
                    borderRadius: "2xl",
                    boxShadow: "none",
                    _hover: {
                        bgColor: "#e37da4",
                    },
                },
                "homepage-button": {
                    color: "white",
                    bgColor: "#0f1419",
                    _hover: {
                        bgColor: "#2c2c2c",
                    },
                },
            },
        },
    },
});
