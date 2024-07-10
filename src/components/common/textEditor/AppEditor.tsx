import { useEffect, useRef } from "react"
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    DraftHandleValue,
} from "draft-js"
import "./style.css"
import Toolbar from "./Toolbar"

type Props = {
    editorState: EditorState
    isReadOnly: boolean
    setRawsContent: React.Dispatch<React.SetStateAction<EditorState>>
}
const AppEditor = ({ editorState, isReadOnly, setRawsContent }: Props) => {
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
            setRawsContent(newState)
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
    console.log({ editorState })
    return (
        <div className={!isReadOnly ? "editor-wrapper" : ""} onClick={focusEditor}>
            {!isReadOnly && <Toolbar editorState={editorState} setEditorState={setRawsContent} />}
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
                        setRawsContent(editorState)
                    }}
                />
            </div>
        </div>
    )
}

export default AppEditor
