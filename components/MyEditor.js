import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import MyCustomUploadAdapterPlugin from "./MyUploadAdapter";

const Editor = (props) => {
    return (
        <Prose>
            <CKEditor
                editor={ClassicEditor}
                data={props.value}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    props.onChange(data);
                }}
                config={{
                    plugins: [
                        ...ClassicEditor.builtinPlugins,
                        MyCustomUploadAdapterPlugin,
                    ],
                }}
            />
        </Prose>
    );
};

export default Editor;
