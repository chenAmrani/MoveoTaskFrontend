import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from '../components/codeBlockEditor';
import { initSocketConnection } from '../utilities/api-client';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/codeBlockPage.css';
import axios from 'axios';
import { CodeBlock } from '../pages/LobbyPage';

const CodeBlockPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [role, setRole] = useState<'mentor' | 'student'>('student'); 
  const [code, setCode] = useState(''); 
  const [codeBlockTitle, setCodeBlockTitle] = useState<string>(''); 
  const [studentCount, setStudentCount] = useState<number>(0); 
  const [socket, setSocket] = useState<ReturnType<typeof initSocketConnection> | null>(null); 
  const [showSmiley, setShowSmiley] = useState(false); 

  // Fetch code block details when the page is loaded
  useEffect(() => {
    const fetchCodeBlock = async () => {
      try {
        const response = await axios.get<CodeBlock>(`https://moveo-task-backend.vercel.app/codeblocks/${id}`);
        setCodeBlockTitle(response.data.blockTitle);
        setCode(response.data.blockCode);
      } catch (error) {
        console.error('Error fetching code block:', error);
      }
    };
    fetchCodeBlock();
  }, [id]);

  // Initialize the socket connection and handle socket events
  useEffect(() => {
    const socket = initSocketConnection();
    setSocket(socket);

    // Join the code block room
    socket.emit('joinCodeBlock', id);

    // Handle role assignment for the current user
    socket.on('roleAssignment', ({ role }) => {
      setRole(role);
    });

    // Update the code when a change is broadcasted
    socket.on('codeUpdate', (newCode: string) => {
      setCode(newCode);
    });

    // Listen for updates to student count in the room
    socket.on('studentCount', ({ studentCount }) => {
      setStudentCount(studentCount);
    });

    // Show the smiley face when the condition is met (from server)
    socket.on('showSmiley', () => {
      setShowSmiley(true);
    });

    // Handle disconnection and cleanup
    return () => {
      if (role === 'mentor') {
        socket.emit('mentorLeft', { codeBlockId: id });
      }
      socket.disconnect();
    };
  }, [id, role, navigate]);

  // Handle code change (student sends updates)
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (role === 'student') {
      socket?.emit('codeChange', { codeBlockId: id, newCode });
    }
  };

  return (
    <Container fluid className="code-block-container">
      <div className="code-block-title">
        <h1>{codeBlockTitle}</h1>
      </div>
      {showSmiley ? (
        <div className="smiley-face">😊</div> 
      ) : (
        <Row>
          <Col md={3}>
            <div className="role-permissions">
              <h1>Role: {role}</h1>
              <p>Permissions: {role === 'mentor' ? 'View Only' : 'Edit'}</p>
              <p>Students in Room: {studentCount}</p>
            </div>
          </Col>
          <Col md={9}>
            <div className="code-editor-wrapper">
              <CodeEditor code={code} onChange={handleCodeChange} isEditable={role === 'student'} />
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CodeBlockPage;
