import * as React from 'react';
// Material UI components
import {Container, Box, Divider, Grid, Button, Typography, TextField, ButtonBase, Card, CardContent} from '@mui/material';
import bg from '../Images/bg.jpg'; // Assuming this is your background image
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../helpers/axios';
import { useState, useEffect } from 'react';


// handles darkmode toggle on the page
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '../Config';

import { useParams } from 'react-router-dom';


function CreateNotecards() {

    // Will save the term and defenition of each notecard
    // Initial term and defenition for each card is empty
    const [noteCards, setNoteCards] = useState([
        { term: '', definition: '' } 
    ]);

    // Allows for traversal between note cards
    // Initial index is 0
    const [activeIndex, setActiveIndex] = useState(0);


    const navigate = useNavigate();

    const handleNoteCardChange = (key, value) => {
        const updatedNoteCards = [...noteCards];
        updatedNoteCards[activeIndex][key] = value;
        setNoteCards(updatedNoteCards);
      };

    const addNoteCard = () => {
        setNoteCards([...noteCards, { term: '', definition: '' }]);
        setActiveIndex(noteCards.length);

        console.log(noteCards);
    }

    const goToPreviousCard = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
          }
    }

    const goToNextCard = () => {
        if (activeIndex < noteCards.length - 1) {
            setActiveIndex(activeIndex + 1);
          }
    }

    useEffect(() => {
        // Update the term and definition of each note card based on activeIndex
        const updatedNoteCards = noteCards.map((noteCard, index) => {
          if (index === activeIndex) {
            return noteCard; // Leave the active note card as it is
          } else {
            // Otherwise, update term and definition to empty string
            return { term: '', definition: '' };
          }
        });
        setNoteCards(updatedNoteCards);
      }, [activeIndex]);



    //Darkmode Theme
    if (themes.DARKMODE) {
        var containerColor = themes.darkContainer;
        var buttonColor = themes.darkButton;
        var textColor = themes.darkText;
        var background = dark_bg;
    }
    else {
        containerColor = themes.normalContainer;
        buttonColor = themes.normalButton;
        textColor = themes.normalText;
        background = bg;
    }

    return (
    <div>
            <Box
                className="bg"
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: "cover",
                    zIndex: '-1',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%'
                }}
            >
            </Box>

            <Sidebar/>

            {/*Container holding buttons and text*/}
            <Container style={{ background: containerColor, marginTop: '5%', height: '900px', width: '1100px', marginBottom:'60px'}}>
                <Grid container spacing={4} direction="column" alignItems="center" justifyContent="center">

                    <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }} >
                        <Box fontFamily="Courier New" fontSize={20} sx={{ pt: '4%'}}>Notecard Set Name: </Box>
                        <TextField></TextField>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
                        <Card sx={{height:450, width:600}}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Note Card {activeIndex + 1}
                                </Typography>
                                <Typography sx={{ fontSize: 20 }} gutterBottom>
                                Term:
                                </Typography>
                                <Typography variant="h5" component="div">
                                <TextField sx={{ width: '100%' }} onChange={(e) => handleNoteCardChange('term', e.target.value)}></TextField>
                                </Typography>

                                <Divider sx={{p: '5%', marginBottom: '8%'}}></Divider>
                                
                                <Typography sx={{ fontSize: 20 }} gutterBottom>
                                Defenition:
                                </Typography>
                                <Typography variant="body2">
                                <TextField id="filled-multiline-static"
                                multiline
                                rows={4}
                                sx={{ width: '100%' }}
                                onChange={(e) => handleNoteCardChange('definition', e.target.value)}
                                ></TextField>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                
                    <Button variant="contained" onClick={goToPreviousCard} disabled={activeIndex === 0}>
                        Previous Note Card
                    </Button>
                    <Button variant="contained" onClick={goToNextCard} disabled={activeIndex === noteCards.length - 1}>
                        Next Note Card
                    </Button>
                    <Button variant="contained" onClick={addNoteCard}>Add Note Card</Button>
                

                </Grid> 
            </Container>
        </div>
    );
}

export default CreateNotecards;