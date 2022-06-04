import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MEditor = dynamic(
    () =>
        import("@uiw/react-markdown-editor", { ICommand }).then(
            (mod) => mod.default
        ),
    { ssr: false }
);

export const h1 = {
    name: "h1",
    keyCommand: "h1",
    button: { "aria-label": "Add heading 1", title: "Add heading 1" },
    icon: (
        <svg width="12" height="12" viewBox="0 0 512 512">
            <path
                fill="currentColor"
                d="M496 80V48c0-8.837-7.163-16-16-16H320c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h37.621v128H154.379V96H192c8.837 0 16-7.163 16-16V48c0-8.837-7.163-16-16-16H32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h37.275v320H32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-37.621V288H357.62v128H320c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-37.275V96H480c8.837 0 16-7.163 16-16z"
            />
        </svg>
    ),
    execute: (editor, selection, position) => {
        const value = selection ? `# ${selection}` : "# ";
        editor.replaceSelection(value);
        position.ch = !!selection ? position.ch : position.ch + 2;
        editor.setCursor(position.line, position.ch);
        editor.focus();
    },
};

export const bold = {
    name: "bold",
    keyCommand: "bold",
    shortcuts: "ctrlcmd+b",
    button: { "aria-label": "Add bold text", title: "Add bold text" },
    icon: (
        <svg width="13" height="13" viewBox="0 0 384 512">
            <path
                fill="currentColor"
                d="M304.793 243.891c33.639-18.537 53.657-54.16 53.657-95.693 0-48.236-26.25-87.626-68.626-104.179C265.138 34.01 240.849 32 209.661 32H24c-8.837 0-16 7.163-16 16v33.049c0 8.837 7.163 16 16 16h33.113v318.53H24c-8.837 0-16 7.163-16 16V464c0 8.837 7.163 16 16 16h195.69c24.203 0 44.834-1.289 66.866-7.584C337.52 457.193 376 410.647 376 350.014c0-52.168-26.573-91.684-71.207-106.123zM142.217 100.809h67.444c16.294 0 27.536 2.019 37.525 6.717 15.828 8.479 24.906 26.502 24.906 49.446 0 35.029-20.32 56.79-53.029 56.79h-76.846V100.809zm112.642 305.475c-10.14 4.056-22.677 4.907-31.409 4.907h-81.233V281.943h84.367c39.645 0 63.057 25.38 63.057 63.057.001 28.425-13.66 52.483-34.782 61.284z"
            />
        </svg>
    ),
    execute: (editor, selection, position) => {
        const value = selection ? `**${selection}**` : `****`;
        editor.replaceSelection(value);
        position.ch = !!selection ? position.ch : position.ch + 2;
        editor.setCursor(position.line, position.ch);
        editor.focus();
    },
};

export const italic = {
    name: "italic",
    keyCommand: "italic",
    button: { "aria-label": "Add italic text", title: "Add italic text" },
    icon: (
        <svg width="12" height="12" viewBox="0 0 320 512">
            <path
                fill="currentColor"
                d="M204.758 416h-33.849l62.092-320h40.725a16 16 0 0 0 15.704-12.937l6.242-32C297.599 41.184 290.034 32 279.968 32H120.235a16 16 0 0 0-15.704 12.937l-6.242 32C96.362 86.816 103.927 96 113.993 96h33.846l-62.09 320H46.278a16 16 0 0 0-15.704 12.935l-6.245 32C22.402 470.815 29.967 480 40.034 480h158.479a16 16 0 0 0 15.704-12.935l6.245-32c1.927-9.88-5.638-19.065-15.704-19.065z"
            />
        </svg>
    ),
    execute: (editor, selection, position) => {
        const value = selection ? `*${selection}*` : `**`;
        editor.replaceSelection(value);
        position.ch = !!selection ? position.ch : position.ch + 1;
        editor.setCursor(position.line, position.ch);
        editor.focus();
    },
};

export const link = {
    name: "link",
    keyCommand: "link",
    button: { "aria-label": "Add link text", title: "Add link text" },
    icon: (
        <svg width="12" height="12" viewBox="0 0 512 512">
            <path
                fill="currentColor"
                d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"
            />
        </svg>
    ),
    execute: (editor, selection, position) => {
        const value = "[]()";
        editor.replaceSelection(value);
        position.ch = !!selection ? position.ch : position.ch + 1;
        editor.setCursor(position.line, position.ch);
        editor.focus();
    },
};

export const image = {
    name: "image",
    keyCommand: "image",
    button: { "aria-label": "Add image text", title: "Add image text" },
    icon: (
        <svg width="14" height="14" viewBox="0 0 20 20">
            <path
                fill="currentColor"
                d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
            />
        </svg>
    ),
    execute: (editor, selection, position) => {
        const value = selection ? `${selection} ![]()` : "![]()\n";
        editor.replaceSelection(value);
        // position.ch = !!selection ? position.ch : position.ch + 1;
        editor.setCursor(position.line, position.ch);
        editor.focus();
    },
};

const MarkdownEditor = (props) => {
    //   const [markdown, setMarkdown] = useState("");
    return (
        <MEditor
            visible
            // onChange={(editor, data, value) => setMarkdown(value)}
            toolbars={[bold, italic, h1, link, image]}
            height="500px"
        />
    );
};

export default MarkdownEditor;
