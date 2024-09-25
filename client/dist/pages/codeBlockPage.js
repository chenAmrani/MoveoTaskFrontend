import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from '../components/codeBlockEditor';
import { initSocketConnection } from '../utilities/api-client';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/codeBlockPage.css';
import axios from 'axios';
const CodeBlockPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState('student'); // Default to student
    const [code, setCode] = useState(''); // Code that is being edited/displayed
    const [codeBlockTitle, setCodeBlockTitle] = useState(''); // Code block title
    const [studentCount, setStudentCount] = useState(0); // Number of students in the room
    const [socket, setSocket] = useState(null); // Socket connection
    const [showSmiley, setShowSmiley] = useState(false); // Whether to show smiley face
    useEffect(() => {
        const fetchCodeBlock = async () => {
            try {
                const response = await axios.get(`https://tom-live-code.up.railway.app/codeblocks/${id}`);
                setCodeBlockTitle(response.data.blockTitle);
                setCode(response.data.blockCode);
            }
            catch (error) {
                console.error('Error fetching code block:', error);
            }
        };
        fetchCodeBlock();
    }, [id]);
    useEffect(() => {
        const socket = initSocketConnection();
        setSocket(socket);
        socket.emit('joinCodeBlock', id);
        socket.on('roleAssignment', ({ role }) => {
            setRole(role);
        });
        socket.on('codeUpdate', (newCode) => {
            setCode(newCode);
        });
        socket.on('codeChange', (newCode) => {
            setCode(newCode);
        });
        socket.on('mentorLeft', () => {
            if (role === 'student') {
                navigate('/');
            }
        });
        socket.on('studentCount', ({ studentCount }) => {
            setStudentCount(studentCount);
        });
        socket.on('showSmiley', () => {
            setShowSmiley(true);
        });
        return () => {
            if (role === 'mentor') {
                socket.emit('mentorLeft', { codeBlockId: id });
            }
            socket.disconnect();
        };
    }, [id, role, navigate]);
    const handleCodeChange = (newCode) => {
        setCode(newCode);
        if (role === 'student') {
            socket?.emit('codeChange', { codeBlockId: id, newCode });
        }
    };
    return (_jsxs(Container, { fluid: true, className: "code-block-container", children: [_jsx("div", { className: "code-block-title", children: _jsx("h1", { children: codeBlockTitle }) }), showSmiley ? (_jsx("div", { className: "smiley-face", children: "\uD83D\uDE0A" })) : (_jsxs(Row, { children: [_jsx(Col, { md: 3, children: _jsxs("div", { className: "role-permissions", children: [_jsxs("h1", { children: ["Role: ", role] }), _jsxs("p", { children: ["Permissions: ", role === 'mentor' ? 'View Only' : 'Edit'] }), _jsxs("p", { children: ["Students in Room: ", studentCount] })] }) }), _jsx(Col, { md: 9, children: _jsx("div", { className: "code-editor-wrapper", children: _jsx(CodeEditor, { code: code, onChange: handleCodeChange, isEditable: role === 'student' }) }) })] }))] }));
};
export default CodeBlockPage;
