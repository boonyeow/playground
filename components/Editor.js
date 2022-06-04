import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import dynamic from "next/dynamic";
import {
    bold,
    italic,
    group,
    title1,
    title2,
    title3,
    unorderedListCommand,
    orderedListCommand,
    link,
    image,
    hr,
    quote,
    code,
    divider,
    checkedListCommand,
} from "@uiw/react-md-editor/lib/commands";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Editor = (props) => {
    return (
        <MDEditor
            commands={[
                bold,
                italic,
                hr,
                group([title1, title2, title3], {
                    name: "title",
                    groupName: "title",
                    buttonProps: {
                        "aria-label": "Insert title",
                        title: "Insert title",
                    },
                }),
                divider,
                link,
                quote,
                code,
                image,
                divider,
                unorderedListCommand,
                orderedListCommand,
                checkedListCommand,
            ]}
            height="500px"
            value={props.value}
            onChange={props.setValue}
            previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
            }}
        />
    );
    //<MDEditor value={props.value} onChange={props.setValue} />;
};

export default Editor;
