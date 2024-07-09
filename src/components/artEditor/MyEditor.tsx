import { useEffect, useRef, useState } from "react"
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw,
    DraftHandleValue,
    RawDraftContentState,
} from "draft-js"
import Toolbar from "./Toolbar"
import "./draftEditor.css"

type Props = {
    body: RawDraftContentState
    isReadOnly: boolean
}
const DraftEditor = ({ body, isReadOnly }: Props) => {
    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(
            convertFromRaw(body)
        )
    )

    const editor = useRef<Editor>(null)

    useEffect(() => {
        focusEditor()
    }, [])

    const focusEditor = () => {
        if (editor.current)
            editor.current.focus()
    }

    const handleKeyCommand = (command: string): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            setEditorState(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    const styleMap: Draft.DraftStyleMap = {
        CODE: {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2,
        },
        HIGHLIGHT: {
            backgroundColor: "#F7A5F7",
        },
        UPPERCASE: {
            textTransform: "uppercase",
        },
        LOWERCASE: {
            textTransform: "lowercase",
        },
        CODEBLOCK: {
            fontFamily: '"fira-code", "monospace"',
            fontSize: "inherit",
            background: "#ffeff0",
            fontStyle: "italic",
            lineHeight: 1.5,
            padding: "0.3rem 0.5rem",
            borderRadius: " 0.2rem",
        },
        SUPERSCRIPT: {
            verticalAlign: "super",
            fontSize: "80%",
        },
        SUBSCRIPT: {
            verticalAlign: "sub",
            fontSize: "80%",
        },
    }

    const myBlockStyleFn = (contentBlock: any): string => {
        const type = contentBlock.getType()
        switch (type) {
            case "blockQuote":
                return "superFancyBlockquote"
            case "leftAlign":
                return "leftAlign"
            case "rightAlign":
                return "rightAlign"
            case "centerAlign":
                return "centerAlign"
            case "justifyAlign":
                return "justifyAlign"
            default:
                return ""
        }
    }

    return (
        <div className={!isReadOnly ? "editor-wrapper" : ""} onClick={focusEditor}>
            {!isReadOnly && <Toolbar editorState={editorState} setEditorState={setEditorState} />}
            <div className={!isReadOnly ? "editor-container" : ''}>
                <Editor
                    readOnly={isReadOnly}
                    ref={editor}
                    placeholder="Write Here"
                    handleKeyCommand={handleKeyCommand}
                    editorState={editorState}
                    customStyleMap={styleMap}
                    blockStyleFn={myBlockStyleFn}
                    onChange={(editorState) => {
                        const contentState = editorState.getCurrentContent()
                        console.log(convertToRaw(contentState))
                        setEditorState(editorState)
                    }}
                />
            </div>
        </div>
    )
}

export default DraftEditor
