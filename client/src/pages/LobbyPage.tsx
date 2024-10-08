import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Container } from 'react-bootstrap';
import CodeBlockList from "../../src/components/codeBlockList";
import "../styles/LobbyPage.css";

export interface CodeBlock {
  _id: string;
  blockTitle: string;
  blockCode: string;
}

const LobbyPage: React.FC = () => {
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);

  useEffect(() => {
    const fetchCodeBlocks = async () => {
      try {
        const response = await axios.get<CodeBlock[]>(`https://tom-live-code.up.railway.app/codeblocks`); 
        setCodeBlocks(response.data);
      } catch (error) {
        console.error('Error fetching code blocks:', error);
      }
    };

    fetchCodeBlocks();
  }, []);

  useEffect(() => {
  }, [codeBlocks]);

  return (
    <Container fluid className="lobbyPage">
      <div>
        <div className="text-center mb-5">
          <h1 className="mb-5">Welcome to Code Web</h1>
          <h2 className="mb-4">Please choose one Code Block</h2>
        </div> 
        <CodeBlockList codeBlocks={codeBlocks} />
      </div>
    </Container>
  );
};

export default LobbyPage;
