import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import CodeBlockList from "../../src/components/codeBlockList";
import "../styles/LobbyPage.css";
const LobbyPage = () => {
    const [codeBlocks, setCodeBlocks] = useState([]);
    useEffect(() => {
        const fetchCodeBlocks = async () => {
            try {
                const response = await axios.get(`https://tom-live-code.up.railway.app/codeblocks`);
                setCodeBlocks(response.data);
            }
            catch (error) {
                console.error('Error fetching code blocks:', error);
            }
        };
        fetchCodeBlocks();
    }, []);
    useEffect(() => {
    }, [codeBlocks]);
    return (_jsx(Container, { fluid: true, className: "lobbyPage", children: _jsxs("div", { children: [_jsxs("div", { className: "text-center mb-5", children: [_jsx("h1", { className: "mb-5", children: "Welcome to Code Web" }), _jsx("h2", { className: "mb-4", children: "Please choose one Code Block" })] }), _jsx(CodeBlockList, { codeBlocks: codeBlocks })] }) }));
};
export default LobbyPage;
