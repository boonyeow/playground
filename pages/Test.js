import { Button } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../components/MyEditor"), {
    ssr: false,
});

const Test = () => {
    const handleDescription = (v) => {
        console.log(v);
    };
    return (
        <>
            <Editor value="" onChange={handleDescription} />
            <Button>Save</Button>
        </>
    );
};

export default Test;
