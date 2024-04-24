import * as React from 'react';
// Material UI components
import {Container, Box, Divider, Grid, Button, Typography, TextField, Card, CardContent, ButtonBase} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import bg from '../Images/bg.jpg'; // Assuming this is your background image
import Sidebar from '../Components/Sidebar';
import { useParams } from 'react-router-dom';

import axiosInstance from '../helpers/axios';
import { useState, useEffect } from 'react';


// handles darkmode toggle on the page
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '../Config';


function NotecardInterface() {

    
    const { set_id } = useParams();

    const [currentSide, setCurrentSide] = useState('definition');

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

    const flipNotecard = () => {
        if (currentSide == 'term')
        {
            setCurrentSide('definition');
        }
        else{
            setCurrentSide('term');
        }
    }



    useEffect(() => {

        axiosInstance.post('/notecards/get_set_name', {Sid:set_id})
        .then(res => {
            if (res.data.Status === "Success") {
                const setName = res.data.Name[0].set_name;
                setNotecardSetName(setName);
            }
        })
        .catch(error => {
            console.error('Error fetching set name:', error);
        });

        axiosInstance.post('/notecards/get_notecards', {Sid:set_id})
        .then(res => {
            if (res.data.Status === "Success") {
                const Cards = res.data.Cards;
                //console.log(Cards);
                setNoteCards(Cards);
            }
        })
        .catch(error => {
            console.error('Error fetching cards:', error);
        });


        // Updates the term and definitions TextFields depending on the current active index
        setTerm(noteCards[activeIndex]['term']);
        setDefinition(noteCards[activeIndex]['def']);

      }, [activeIndex,noteCards,term,definition]);



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
            <Container style={{ background: containerColor, marginTop: '5%', height: '570px', width: '1100px', marginBottom:'60px'}}>
            <Box fontFamily="Courier New" fontSize={28} sx={{ pt: '4%', marginLeft: '44%', marginBottom: '2%'}}>{notecardSetName} </Box>
                <Grid container spacing={4} direction="row" alignItems="center" justifyContent="center">

                    <Grid item>
                            <Button 
                            variant="contained" 
                            onClick={goToPreviousCard} disabled={activeIndex === 0}
                            endIcon={<ArrowBackIosIcon />}
                            style={{ background: buttonColor}}>
                            
                            </Button>
                    </Grid>

            
                    
                    <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', marginRight: '15%' }}>
                        
                        <ButtonBase onClick={flipNotecard}>
                            <Card sx={{height:450, width:600}}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                    Card {activeIndex + 1}
                                    </Typography>

                                    { currentSide === 'term' ? (<Typography sx={{fontSize: 20 }} gutterBottom>
                                    {term}
                                    </Typography>) : (<Typography sx={{ fontSize: 20 }} gutterBottom>
                                    {definition}
                                    </Typography>)}
                                    
                                </CardContent>
                            </Card>
                        </ButtonBase>
                    </Grid>

                    <Grid item>
                        <Button 
                            sx={{marginLeft: '100px'}}
                            variant="contained" 
                            onClick={goToNextCard} disabled={activeIndex === noteCards.length - 1}
                            endIcon={<ArrowForwardIosIcon />}
                            style={{ background: buttonColor}}>
                        </Button>
                    </Grid>
                    

                </Grid> 
            </Container>
        </div>
    );
}

export default NotecardInterface;