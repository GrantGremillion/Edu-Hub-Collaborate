import * as React from 'react';
// Material UI components and our custom comps.
import {Container, Box, Divider, Grid, Button, Typography, TextField} from '@mui/material';
import Sidebar from '../Components/Sidebar';
import HeaderBox from '../Components/HeaderBox';

// technical stuff
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../helpers/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// handles theme toggle on the page
import bg from '../Images/bg.jpg';
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '../Config';

import Calendar from 'react-calendar';
import * as cal from 'react-calendar';


function CalendarSchedule() {
  const { class_id  } = useParams();

  const [Class, setClass] = useState();
  const [date, setDate] = useState();

  const [eventAdd, setEventAdd] = useState({
    Cid: class_id,
    content: "",
    date: "",
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [events, setEvents] = useState([]);

  const Date_Click_Fun = (date) => {
      setSelectedDate(date);
  };

  const Event_Data_Update = (event) => {
      setEventName(event.target.value);
  };


  const Add_Event = () => {

    axiosInstance.post('/classes/add_event', eventAdd)

    // testing 
    .then(res => {
      if(res.data.Status === "Success") {
        console.log("Successfully added event.");
      }
      else{
        alert(res.data.Message + " error in TClassOptions");
      }
    })
    .catch(err => console.log(err));

  }


  const Create_Event = () => {
      if (selectedDate && eventName) {
          const newEvent = {
              id: new Date().getTime(),
              date: selectedDate,
              title: eventName,
          };
          console.log("date is: " + selectedDate)
          setEventAdd({
            Cid: class_id,
            content: eventName,
            date: selectedDate
          });
          setEvents([...events, newEvent]);
          setSelectedDate(null);
          setEventName("");
          setSelectedDate(newEvent.date);
      }
  };

  useEffect(() => {
    if (eventAdd.content != "" & eventAdd.date != "") {
      Add_Event();
    }
    
  }, [eventAdd]);

  const Update_Event = (eventId, newName) => {
      const updated_Events = events.map((event) => {
          if (event.id === eventId) {
              return {
                  ...event,
                  title: newName,
              };
          }
          return event;
      });
      setEvents(updated_Events);
  };

  const Delete_Event = (eventId) => {
      const updated_Events = events.filter((event) => event.id !== eventId);
      setEvents(updated_Events);
  };

  useEffect(() => {
    axiosInstance.post('/classes/get_current_class', { Cid: class_id })
      .then(res => {
        if (res.data.Status === "Success") {
          const classes = res.data.class[0].class_name;
          setClass(classes);
        } else {
          alert(res.data.Status);
        }
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
        // Handle error (e.g., set state to display an error message)
      });
  }, [class_id]);

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

  // actual component to be rendered
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
        }}/>

      <Sidebar/>

      

      <Container maxWidth="md" style={{ background: containerColor, marginTop: '25px', height: 'fit-content', marginBottom:'60px'}}>
          
        <Grid item direction="column" alignItems="center" justifyContent="center" sx={{paddingTop: "5%", marginTop: "25px", marginBottom: "5%", marginLeft: '20%'}}>
          <HeaderBox text="Class Calendar" sx={{fontSize: 'Large', fontFamily: 'Courier New', paddingTop: '5%', marginLeft: '25%', color: textColor}}/>
        </Grid>

        {/* Got most of this from:
        https://www.geeksforgeeks.org/event-calendar-using-react */}
        <Grid container 
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{paddingBottom: "5%", marginLeft: "0%", marginBottom: "10%"}}>
          
          <div className="app">
            <h1> {Class} Calendar Application </h1>
            <div className="container">
                <div className="calendar-container">
                    <Calendar
                        value={selectedDate}
                        onClickDay={Date_Click_Fun}
                        tileClassName={({ date }) =>
                            selectedDate &&
                            date.toDateString() === selectedDate.toDateString()
                                ? "selected"
                                : events.some(
                                      (event) =>
                                          event.date.toDateString() ===
                                          date.toDateString(),
                                  )
                                ? "event-marked"
                                : ""
                        }
                    />{" "}
                </div>
                <div className="event-container">
                    {" "}
                    {selectedDate && (
                        <div className="event-form">
                            <h2> Create Event </h2>{" "}
                            <p>
                                {" "}
                                Selected Date: {selectedDate.toDateString()}{" "}
                            </p>{" "}
                            <input
                                type="text"
                                placeholder="Event Name"
                                value={eventName}
                                onChange={Event_Data_Update}
                            />{" "}
                            <button
                                className="create-btn"
                                onClick={Create_Event}
                            >
                                Click Here to Add Event{" "}
                            </button>{" "}
                        </div>
                    )}
                    {events.length > 0 && selectedDate && (
                        <div className="event-list">
                            <h2> Class Events </h2>{" "}
                            <div className="event-cards">
                                {" "}
                                {events.map((event) =>
                                    event.date.toDateString() ===
                                    selectedDate.toDateString() ? (
                                        <div
                                            key={event.id}
                                            className="event-card"
                                        >
                                            <div className="event-card-header">
                                                <span className="event-date">
                                                    {" "}
                                                    {event.date.toDateString()}{" "}
                                                </span>{" "}
                                                <div className="event-actions">
                                                    <button
                                                        className="update-btn"
                                                        onClick={() =>
                                                            Update_Event(
                                                                event.id,
                                                                prompt(
                                                                    "ENTER NEW TITLE",
                                                                ),
                                                            )
                                                        }
                                                    >
                                                        Update Event{" "}
                                                    </button>{" "}
                                                    <button
                                                        className="delete-btn"
                                                        onClick={() =>
                                                            Delete_Event(
                                                                event.id,
                                                            )
                                                        }
                                                    >
                                                        Delete Event{" "}
                                                    </button>{" "}
                                                </div>{" "}
                                            </div>{" "}
                                            <div className="event-card-body">
                                                <p className="event-title">
                                                    {" "}
                                                    {event.title}{" "}
                                                </p>{" "}
                                            </div>{" "}
                                        </div>
                                    ) : null,
                                )}{" "}
                            </div>{" "}
                        </div>
                    )}{" "}
                </div>{" "}
            </div>{" "}
        </div>
    

        </Grid> 
        
      </Container>
      

      
    </div>
  );

}

export default CalendarSchedule;