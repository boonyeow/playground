import { extendTheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";

export const theme = extendTheme(
    {
        styles: {
            global: () => ({
                body: {
                    bg: "#f9fafc",
                },
            }),
        },
        colors: {
            primary: "black",
            // primary: "#6f6af8",
        },
        components: {
            Spinner: {
                variants: {
                    loading_spinner: {
                        w: "5rem",
                        h: "5rem",
                        borderColor: "#626262",
                    },
                },
            },
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
                    "action-button": {
                        borderRadius: "50px",
                        fontSize: "sm",
                        bg: "black",
                        color: "white",
                        _hover: {
                            bg: "#303030",
                        },
                    },
                    "outside-button": {
                        fontSize: "sm",
                        bg: "black",
                        color: "white",
                        _hover: {
                            bg: "#303030",
                            _disabled: {
                                bg: "#303030",
                            },
                        },
                    },
                    "outside-button-rev": {
                        fontSize: "sm",
                        bg: "#303030",
                        color: "white",
                        _hover: {
                            bg: "#303030",
                            _disabled: {
                                bg: "#303030",
                            },
                        },
                    },
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
            Progress: {
                baseStyle: {
                    filledTrack: {
                        bg: "#00DC72",
                    },
                },
            },
        },
    },
    withProse()
);
