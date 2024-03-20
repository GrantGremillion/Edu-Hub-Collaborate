import React, { useState, useEffect } from 'react';
import { Button, Container, Box, TextField, Paper, Divider } from '@mui/material';
import HeaderBox from '../Components/HeaderBox';
import Sidebar from '../Components/Sidebar';
import GoBackButton from '../Components/GoBackButton';
import bg from '.././Images/bg.jpg';

import axios from 'axios';
import { useCookies } from 'react-cookie';

import { useParams } from 'react-router-dom';

function ChatInterface() {

  const { class_id } = useParams();

  const [Class, setClass] = useState();

  const [cookies] = useCookies(['account','userID']);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Array to store messages
  const [timeStamps, setTimeStamps] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

 
  useEffect(() => {

    // This is fetching the name of the class to be displayed in the header box  
    axios.post('http://localhost:8081/classes/get_current_class', { Cid: class_id })
      .then(res => {
        if (res.data.Status === "Success") {
          const className = res.data.class[0].class_name;
          setClass(className);
        } else {
          alert(res.data.Status);
        }
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });


    // Necessary to save and display all previous user messages, timestamps, and usernames
    axios.post('http://localhost:8081/message/get', {Cid: class_id})
      .then(res => {
        if (res.data.Status === "Success") {
  
          const data = res.data.messages;
          
          // Setting all the messages from the database
          const contentValues = data.map(dict => dict.content);
          setMessages(contentValues);

          // Setting all the time stamps from the database
          const timeStamps = data.map(dict => dict.sent_at);
          setTimeStamps(timeStamps);
         
        } 
        else {
          alert(res.data.Status);
        }
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });


   
    return
  }, [class_id]);




  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '' && !selectedFile) return; // Do not send empty messages or if no file is selected

    const newMessage = {
      Mid: messages.length + 1, // Simple incrementing ID
      account: cookies.account,
      id: cookies.userID,
      text: message,
      timestamp: new Date(),
      Cid: class_id
    };

    setMessages([...messages, newMessage.text]);
    setMessage('');

    // Send request to backend to send the message
    axios.post('http://localhost:8081/message/send', newMessage)

    .then(res => {
      if(res.data.Status === "Success") {
        console.log("Success")
      }
      else{
        alert(res.data.Status)
      }
      
    });

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
        <HeaderBox text={'Chat for '+ Class} />
        <Paper style={{ maxHeight: '400px', overflow: 'auto', marginBottom: '10px', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '10px 0' }}>
            <Box style={{ wordWrap: 'break-word' }}>{msg}</Box>
            <Box style={{ wordWrap: 'break-word' }}>{timeStamps[index]}</Box>
            <Divider></Divider>
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
