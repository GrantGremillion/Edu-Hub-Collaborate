import * as React from 'react';
import { Button, Grid, Container, Box, TextField } from '@mui/material';
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar';
import { useState } from 'react';
import bg from '.././Images/bg.jpg'; // Assuming the use of the same background image

function ChatInterface() {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log('Message sent:', message);
    setMessage('');
    // Add the logic to send message here
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log('File selected:', e.target.files[0]);
    // Add the logic to handle file here
  };

  return (
    <div>
      <PlainNavBar text='Edu Hub Collaborate'></PlainNavBar >
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
          height: '100%'
        }}
      ></Box>

      <Container maxWidth="sm" style={{ background: '#e0f2f1', marginTop: '75px', paddingBottom: '75px' }}>
        <Grid container spacing={5}
            direction="column"
            alignItems="center"
            justifyContent="center">
          
          <Grid item xs={12}>
            <HeaderBox text={'Chat with us'}></HeaderBox>
          </Grid>

          <Grid item xs={12} style={{ width: '100%' }}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Type your message here..."
              multiline
              rows={4}
              variant="outlined"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={handleSendMessage} sx={{ background: '#b2dfdb' }}>
              Send Message
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              sx={{ background: '#b2dfdb' }}
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={handleFileSelect}
              />
            </Button>
          </Grid>

        </Grid>
      </Container>
    </div>
  );
}

export default ChatInterface;
