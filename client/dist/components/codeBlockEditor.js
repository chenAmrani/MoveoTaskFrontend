import { jsx as _jsx } from "react/jsx-runtime";
import Highlight from 'react-highlight';
import '../styles/codeBlockEditor.css';
const CodeEditor = ({ code, onChange, isEditable }) => {
    const handleCodeChange = (event) => {
        onChange(event.target.value);
    };
    return (_jsx("div", { className: "code-editor", children: isEditable ? (_jsx("textarea", { value: code, onChange: handleCodeChange, className: "code-editor-textarea" })) : (_jsx(Highlight, { className: "javascript", children: code })) }));
};
export default CodeEditor;
