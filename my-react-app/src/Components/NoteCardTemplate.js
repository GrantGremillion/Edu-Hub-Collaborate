import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextFeild from '@mui/material/TextField';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function NoteCardTemplate() {
  return (
    <Card sx={{height:400, width:600}}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Term:
        </Typography>
        <Typography variant="h5" component="div">
          <TextFeild sx={{ width: '100%' }}></TextFeild>
        </Typography>

        <Divider sx={{p: '5%', marginBottom: '8%'}}></Divider>
        
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Defenition:
        </Typography>
        <Typography variant="body2">
          <TextFeild id="filled-multiline-static"
          multiline
          rows={4}
          sx={{ width: '100%' }}
          ></TextFeild>
        </Typography>
      </CardContent>
    </Card>
  );
}