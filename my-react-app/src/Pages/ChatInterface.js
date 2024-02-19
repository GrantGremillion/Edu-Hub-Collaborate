import React, { useState } from 'react';
import { Button, Grid, Container, Box, TextField, Paper } from '@mui/material';
import HeaderBox from '../Components/HeaderBox';
import Sidebar from '../Components/Sidebar';
import GoBackButton from '../Components/GoBackButton';
import bg from '.././Images/bg.jpg';

function ChatInterface() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Array to store messages
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '' && !selectedFile) return; // Do not send empty messages or if no file is selected

    const newMessage = {
      id: messages.length + 1, // Simple incrementing ID
      text: message,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setMessage('');

    // TODO: Send the message to the server here
    // If there's a file to be sent, call a function to handle the file upload.
    if (selectedFile) {
      await handleFileUpload(selectedFile);
      setSelectedFile(null); // Reset file input after sending
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    // TODO: Implement file upload logic here
    // You'll need to send the formData to the server using fetch or axios
    console.log('Uploading file:', file.name);
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log('File selected:', e.target.files[0]);
  };

  return (
    <div>
      <Sidebar />
      <Box
        className="bg"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          zIndex: '-1',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
      ></Box>

      <Container maxWidth="sm" style={{ marginTop: '75px', paddingBottom: '75px', position: 'relative', zIndex: 10 }}>
        <HeaderBox text={'Chat with us'} />
        <Paper style={{ maxHeight: '400px', overflow: 'auto', marginBottom: '10px', padding: '10px' }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ margin: '10px 0' }}>
              <Box style={{ wordWrap: 'break-word' }}>{msg.text}</Box>
              <Box textAlign="right" fontSize="0.75rem" color="gray">
                {msg.timestamp.toLocaleTimeString()}
              </Box>
            </div>
          ))}
        </Paper>
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Type your message here..."
          multiline
          rows={3}
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button fullWidth variant="contained" style={{ background: '#b2dfdb', color: 'white' }} onClick={handleSendMessage}>
          Send Message
        </Button>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleFileSelect}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" sx={{ background: '#b2dfdb', marginY: 2 }}>
            Upload File
          </Button>
        </label>
        {selectedFile && <Box mt={2}>File: {selectedFile.name}</Box>}
        <GoBackButton />
      </Container>
    </div>
  );
}

export default ChatInterface;
