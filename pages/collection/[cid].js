import { Box, Grid, GridItem, Heading, Stack, Text } from "@chakra-ui/react";
// import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const CollectionPage = () => {
    return (
        <>
            <Navbar />
            <Box maxWidth={"8xl"} m="auto">
                <Stack
                    direction={["column", "column", "column", "row", "row"]}
                    minHeight={"80vh"}
                    alignItems="center"
                    justifyContent={"center"}
                    my="1rem"
                >
                    <Grid>
                        <GridItem></GridItem>
                    </Grid>
                    <Box>
                        <Heading>Project 1</Heading>
                    </Box>
                    <Text>Hello man</Text>
                </Stack>
            </Box>
            {/* <Footer /> */}
        </>
    );
};

export default CollectionPage;
