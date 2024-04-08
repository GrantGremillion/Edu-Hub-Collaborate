import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, Box, TextField, Paper, Divider, Grid } from '@mui/material';
import HeaderBox from '../Components/HeaderBox';
import Sidebar from '../Components/Sidebar';
import bg from '.././Images/bg.jpg';


import axiosInstance from '../helpers/axios';
import { useCookies } from 'react-cookie';

import { useParams } from 'react-router-dom';

function ChatInterface() {

  const { class_id } = useParams();

  const [Class, setClass] = useState();

  const [cookies] = useCookies(['account','userID']);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Array to store messages
  const [timeStamps, setTimeStamps] = useState([]);
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]); 

  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);

  const scrollRef = useRef(null);



  useEffect(() => {

    // This is fetching the name of the class to be displayed in the header box  
    axiosInstance.post('/classes/get_current_class', { Cid: class_id })
      .then(res => {
        if (res.data.Status === "Success") {
          const className = res.data.class[0].class_name;
          setClass(className);
        } else {
          alert(res.data.Status);
        }
      })
      .catch(error => {
        console.error('Error fetching class:', error);
      });


    // Necessary to save and display all previous user messages, timestamps, and usernames
    axiosInstance.post('/message/get_all', {Cid: class_id})
      .then(res => {
        if (res.data.Status === "Success") {
  
          const data = res.data.messages;
          
          // Setting all the messages from the database
          const contentValues = data.map(dict => dict.content);
          setMessages(contentValues);

          // Setting all the time stamps from the database
          const timeStamps = data.map(dict => dict.sent_at);
          setTimeStamps(timeStamps);

          // Setting all the files from the database
          const files = data.map(dict => dict.fileUrl);
          setFiles(files);

          // Finds all users that have sent messages in the chat
          axiosInstance.post('/chat/get_message_usernames', {Cid: class_id})
          .then(res => {
            if (res.data.Status === "Success") {
              const Users = res.data.users.map(dict => dict.sender_username);
              setUsers(Users);
            }
          })

          .catch(error => {
            console.error('Error fetching usernames for sent messages:', error);
          });

        } 
        else {
          alert(res.data.Status);
        }
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });

      // Fetch all students in the class
      axiosInstance.post('/chat/get_all_students', { Cid: class_id })
      .then(res => {
        if (res.data.Status === "Success") {
          const Students = res.data.students.map(dict => dict.sender_username);
          setStudents(Students);
        } else {
          alert(res.data.Status);
        }
      })
      .catch(error => {
        console.error('Error fetching students in class:', error);
      });


      // Fetch the teacher of the class
      axiosInstance.post('/chat/get_teacher', { Cid: class_id })
      .then(res => {
        if (res.data.Status === "Success") {
          const Teacher = res.data.teacher.map(dict => dict.sender_username);
          setTeacher(Teacher);
        } else {
          alert(res.data.Status);
        }
      })
      .catch(error => {
        console.error('Error fetching teacher of current class:', error);
      });



      // When user enters a message, this auto scrolls the chat to the bottom
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behaviour: "smooth" });
      }

  }, [class_id, messages]);




  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.trim() === '' && !selectedFile) return; // Do not send empty messages or if no file is selected


    const formData = new FormData();
    // If there's a file to be sent, call a function to handle the file upload.
    if (selectedFile) {
      formData.append("file", selectedFile);
      console.log('Uploading file:', selectedFile.name);
    }

    const newMessage = {
      Mid: messages.length + 1, // Simple incrementing ID
      account: cookies.account,
      id: cookies.userID,
      text: message,
      timestamp: new Date(),
      Cid: class_id
    };

    // Adding all message info so it can be accessed on tha backend
    formData.append('Mid', newMessage.Mid);
    formData.append('account', newMessage.account);
    formData.append('id', newMessage.id);
    formData.append('text', newMessage.text);
    formData.append('timestamp', newMessage.timestamp);
    formData.append('Cid', newMessage.Cid);


    setMessages([...messages, newMessage.text]);
    setMessage('');

    // Send request to backend to send the message
    axiosInstance.post('/message/send',  formData,  { headers: {'Content-Type': 'multipart/form-data'}})

    .then(res => {
      if(res.data.Status === "Success") {
        setSelectedFile(null); // Reset file input after sending
      }
      else{
        alert(res.data.Status)
      }
      
    });

  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log('File selected:', e.target.files[0]);
  };

  // Function to handle client file downloads
  function downloadFile(fileUrl) {
    axiosInstance.get(fileUrl, { responseType: 'blob' }) // Use responseType: 'blob' to handle binary data
        .then(response => {

          
          console.log(response.data);
          // Create a temporary URL object to download the file
          const url = window.URL.createObjectURL(response.data);

          console.log("URL: " + url);
          // Create a temporary anchor element to initiate the download
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', ''); // Set the download attribute to force download
          // Append the anchor element to the document body and click it programmatically
          document.body.appendChild(link);
          link.click();
          // Cleanup: Remove the anchor element and revoke the URL object
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error downloading file:', error);
        });
    }

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


      <Grid container 
            direction="row"
            alignItems="flex-start"
            justifyContent="center">
        <Grid item sx={{marginRight: '15%', paddingTop: '10%'}}>
          <Paper style={{ maxHeight: '400px', overflow: 'auto', marginBottom: '10px', padding: '10px', background: '#b2dfdb' }}>
            <Box style={{ wordWrap: 'break-word', fontSize: '150%' }}>Teacher:</Box>
            <Box style={{ wordWrap: 'break-word' }}>{teacher}</Box>
            <br></br>
            <Divider></Divider>
            <br></br>
            <Box style={{ wordWrap: 'break-word', fontSize: '150%' }}>Students:</Box>
            {students.map((name, index) => (
              <div key={index} >
                <Box style={{ wordWrap: 'break-word' }}>{name}</Box> 
              </div>
            ))}
          </Paper>
        </Grid>

        <Grid item sx={{marginRight: '21%'}}>
          <Container maxWidth="sm" style={{ marginTop: '75px', paddingBottom: '75px', position: 'relative', zIndex: 10 }}>
            <HeaderBox text={Class} />
            <Paper style={{ maxHeight: '400px', overflow: 'auto', marginBottom: '10px', padding: '10px' }}>
              {messages.map((msg, index) => (
                <div key={index} style={{ margin: '10px 0' }}>
                  <Box style={{ wordWrap: 'break-word' }}>{users[index]}</Box> 
                  <Box style={{ wordWrap: 'break-word', fontSize: '120%'}}>{msg}</Box>
                 
                  <a href="#" onClick={() => downloadFile(files[index])}>{files[index]}</a>
                
                  <Box sx={{marginLeft: '50%'}} style={{ wordWrap: 'break-word', color: 'gray', fontSize: '0.8rem' }}>
                    {new Date(timeStamps[index]).toLocaleString()}
                  </Box>
            
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
                Upload A File
              </Button>
            </label>
            {selectedFile && <Box mt={2}>File: {selectedFile.name}</Box>}

          </Container>
        </Grid>
      </Grid>


    </div>
  );
}

export default ChatInterface;
