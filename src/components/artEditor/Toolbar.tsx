import React from "react";
import { /*FontAwesomeIcon*/ } from "@mui/icons-material";
import {
    FormatAlignRight,
    FormatAlignCenter,
    FormatAlignLeft,
    FormatBold,
    KeyboardArrowDown,
    KeyboardArrowUp,
    Highlight,
    FormatItalic,
    FormatQuote,
    List,
    Subscript,
    StrikethroughS,
    Code,
    Superscript,
    FormatListNumbered,
    FormatUnderlined
} from "@mui/icons-material";
import { EditorState, RichUtils } from "draft-js";
type Test = {
    editorState: EditorState
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

const Toolbar = ({ editorState, setEditorState }: Test) => {
    const tools = [
        {
            label: "bold",
            style: "BOLD",
            icon: <FormatBold />,
            method: "inline",
        },
        {
            label: "italic",
            style: "ITALIC",
            icon: <FormatItalic />,
            method: "inline",
        },
        {
            label: "underline",
            style: "UNDERLINE",
            icon: <FormatUnderlined />,
            method: "inline",
        },
        {
            label: "highlight",
            style: "HIGHLIGHT",
            icon: <Highlight />,
            method: "inline",
        },
        {
            label: "strike-through",
            style: "STRIKETHROUGH",
            icon: <StrikethroughS />,
            method: "inline",
        },
        {
            label: "Superscript",
            style: "SUPERSCRIPT",
            icon: <Superscript />,
            method: "inline",
        },
        {
            label: "Subscript",
            style: "SUBSCRIPT",
            icon: <Subscript />,
            method: "inline",
        },
        {
            label: "Monospace",
            style: "CODE",
            // icon: <FontAwesomeIcon icon={faTextWidth} transform="grow-3" />,
            method: "inline",
        },
        {
            label: "Blockquote",
            style: "blockQuote",
            icon: <FormatQuote />,
            method: "block",
        },
        {
            label: "Unordered-List",
            style: "unordered-list-item",
            method: "block",
            icon: <List transform="grow-6" />,
        },
        {
            label: "Ordered-List",
            style: "ordered-list-item",
            method: "block",
            icon: <FormatListNumbered transform="grow-6" />,
        },
        {
            label: "Code Block",
            style: "CODEBLOCK",
            icon: <Code transform="grow-3" />,
            method: "inline",
        },
        {
            label: "Uppercase",
            style: "UPPERCASE",
             icon: <KeyboardArrowUp transform="grow-3" />,
            method: "inline",
        },
        {
            label: "lowercase",
            style: "LOWERCASE",
            icon: <KeyboardArrowDown transform="grow-3" />,
            method: "inline",
        },
        {
            label: "Left",
            style: "leftAlign",
            icon: <FormatAlignLeft transform="grow-2" />,
            method: "block",
        },
        {
            label: "Center",
            style: "centerAlign",
            icon: <FormatAlignCenter transform="grow-2" />,
            method: "block",
        },
        {
            label: "Right",
            style: "rightAlign",
            icon: <FormatAlignRight transform="grow-2" />,
            method: "block",
        },
        { label: "H1", style: "header-one", method: "block" },
        { label: "H2", style: "header-two", method: "block" },
        { label: "H3", style: "header-three", method: "block" },
        { label: "H4", style: "header-four", method: "block" },
        { label: "H5", style: "header-five", method: "block" },
        { label: "H6", style: "header-six", method: "block" },
    ];

    const applyStyle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, style: string, method: string) => {
        e.preventDefault();
        method === "block"
            ? setEditorState(RichUtils.toggleBlockType(editorState, style))
            : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const isActive = (style: string, method: string) => {
        if (method === "block") {
            const selection = editorState.getSelection();
            const blockType = editorState
                .getCurrentContent()
                .getBlockForKey(selection.getStartKey())
                .getType();
            return blockType === style;
        } else {
            const currentStyle = editorState.getCurrentInlineStyle();
            return currentStyle.has(style);
        }
    };

    return (
        <div className="toolbar-grid">
            {tools.map((item, idx) => (
                <button
                    style={{
                        color: isActive(item.style, item.method)
                            ? "rgba(0, 0, 0, 1)"
                            : "rgba(0, 0, 0, 0.3)",
                    }}
                    key={`${item.label}-${idx}`}
                    title={item.label}
                    onClick={(e) => applyStyle(e, item.style, item.method)}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {item.icon || item.label}
                </button>
            ))}
        </div>
    );
};

export default Toolbar;
