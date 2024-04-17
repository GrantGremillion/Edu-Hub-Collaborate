import * as React from 'react';
// Material UI components
import {Container, Box, Divider, Grid, Button, Typography, TextField, Card, CardContent} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import bg from '../Images/bg.jpg'; // Assuming this is your background image
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../helpers/axios';
import { useState, useEffect } from 'react';


// handles darkmode toggle on the page
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '../Config';



function CreateNotecards() {

    const [notecardSetName, setNotecardSetName] = useState('');

    // Will save the term and defenition of each notecard
    // Initial term and defenition for each card is empty
    const [noteCards, setNoteCards] = useState([{ term: '', definition: '' }]);

    const [currentCard, setCurrentCard] = useState(
        { term: '', definition: '' } 
    );

    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');

    // Allows for traversal between note cards
    // Initial index is 0
    const [activeIndex, setActiveIndex] = useState(0);


    const handleNoteCardChange = (key, value) => {

        if (key == 'term'){
            setTerm(value);
        }
        else{
            setDefinition(value);
        }
        

        const newCurrentCard = currentCard;

        // Update term or definition that was changed
        newCurrentCard[key] = value;
    
        setCurrentCard(newCurrentCard);

        // Update the card set to hold the new current card in place of old version
        noteCards[activeIndex] = currentCard;
      };


    const addNoteCard = () => {
        // New card is blank
        setCurrentCard({ term: '', definition: '' });
        // Add new blank card to the end 
        setNoteCards([...noteCards, { term: '', definition: '' }]);
        setActiveIndex(noteCards.length);
        setTerm('');
        setDefinition('');
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

    const handleSubmitSetClick = () => {

        axiosInstance.post('/notecards/create_set', noteCards)

        // testing 
        .then(res => {
        if(res.data.Status === "Success") {
            console.log("Success")
            
        }
        else{
            alert(res.data.Status)
        }  
        })
    }


    useEffect(() => {
        console.log(noteCards);
        setTerm(noteCards[activeIndex]['term']);
        setDefinition(noteCards[activeIndex]['definition']);
        
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
                        <TextField 
                        autoComplete="off"
                        onChange={(e) => setNotecardSetName(e.target.value)}>
                        </TextField>
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
                                <Typography variant="h5">
                                <TextField 
                                value={term}
                                autoComplete="off"
                                onChange={(e) => handleNoteCardChange('term', e.target.value)}>
                                </TextField>
                                </Typography>

                                <Divider sx={{p: '5%', marginBottom: '8%'}}></Divider>
                                
                                <Typography sx={{ fontSize: 20 }} gutterBottom>
                                Defenition:
                                </Typography>
                                <Typography variant="body2">
                                <TextField id="filled-multiline-static"
                                multiline
                                rows={4}
                                value={definition}
                                autoComplete="off"
                                onChange={(e) => handleNoteCardChange('definition', e.target.value)}>
                                </TextField>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                
                    
                        <Grid item>
                            <Button 
                            variant="contained" 
                            onClick={goToPreviousCard} disabled={activeIndex === 0}
                            endIcon={<ArrowBackIosIcon />}
                            style={{ background: buttonColor}}>
                            
                            </Button>

                            <Button 
                            sx={{marginLeft: '100px'}}
                            variant="contained" 
                            onClick={addNoteCard}
                            style={{ background: buttonColor}}>
                                Add New Card
                            </Button>
                        
                            <Button 
                            sx={{marginLeft: '100px'}}
                            variant="contained" 
                            onClick={goToNextCard} disabled={activeIndex === noteCards.length - 1}
                            endIcon={<ArrowForwardIosIcon />}
                            style={{ background: buttonColor}}>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                            variant="contained" 
                            onClick={handleSubmitSetClick}
                            style={{ background: buttonColor}}>
                                Submit Set
                            </Button>
                        </Grid>

                </Grid> 
            </Container>
        </div>
    );
}

export default CreateNotecards;