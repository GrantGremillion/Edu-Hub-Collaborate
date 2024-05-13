import * as React from 'react';
// Material UI components and our custom comps.
import { Container, Box, Divider, Grid, Button, Typography, TextField } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import HeaderBox from '../Components/HeaderBox';
import Calendar from 'react-calendar';

// technical stuff
import axiosInstance from '../helpers/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// handles theme toggle on the page
import bg from '../Images/bg.jpg';
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '../Config';

// handles theme of the calendar component through 2 css files (pain)
import '.././Components/CustomCalendarNormal.css';
import '.././Components/CustomCalendarDark.css';



function CalendarSchedule() {

  const [cookies] = useCookies(['account']);

  const { class_id } = useParams();

  const [Class, setClass] = useState();

  const [eventAdd, setEventAdd] = useState({
    Cid: class_id,
    content: "",
    date: "",
  });

  const ClassHeader = Class + " Calendar";

  const [selectedDate, setSelectedDate] = useState(new Date());
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
        if (res.data.Status === "Success") {
          console.log("Successfully added event.");
        }
        else {
          alert(res.data.Message + " error in TClassOptions");
        }
      })
      .catch(err => console.log(err));

  }


  const Create_Event = () => {
    if (selectedDate && eventName) {
      const newEvent = {
        id: new Date().getTime(),
        date: selectedDate.toDateString(),
        title: eventName,
      };
      console.log("date is: " + selectedDate)
      var tempDate = selectedDate.toDateString();
      console.log("date as string: " + tempDate);
      setEventAdd({
        Cid: class_id,
        content: eventName,
        date: tempDate
      });
      setEvents([...events, newEvent]);
      //setSelectedDate(null);
      setEventName("");
      //setSelectedDate(newEvent.date);
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
        console.error('Error fetching classes: ', error);
        // Handle error (e.g., set state to display an error message)
      });

    axiosInstance.post('/classes/get_events', { Cid: class_id })
      .then(res => {
        if (res.data.Status === "Success") {
          //console.log("Got events successfully");

          var itemsFromServer = []
          for (var x = 0; x < res.data.classEvents.length; x++) {
            var oldEvents = {
              id: res.data.classEvents[x].CalID,
              date: res.data.classEvents[x].day_of,
              title: res.data.classEvents[x].content
            }
            itemsFromServer.push(oldEvents)
            //console.log(oldEvents);
          }
          var temp = [...events, ...itemsFromServer]

          setEvents(temp)

        } else {
          alert(res.data.Status);
        }
      })
      .catch(error => {
        console.error('Error fetching events: ', error);
        // Handle error (e.g., set state to display an error message)
      });

  }, [class_id]);

  useEffect(() => {
    console.log(events)
  }, [events])


  const containerColor = themes.DARKMODE ? themes.darkContainer : themes.normalContainer;
  const buttonColor = themes.DARKMODE ? themes.darkButton : themes.normalButton;
  const textColor = themes.DARKMODE ? themes.darkText : themes.normalText;
  const background = themes.DARKMODE ? dark_bg : bg;
  const calendarTheme = themes.DARKMODE ? "react-calendar-dark" : "react-calendar";

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
        }} />

      <Sidebar />

      <Container maxWidth="md" style={{ background: containerColor, marginTop: '3%', width: "fit-content", height: 'fit-content', }}>

        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ paddingTop: "5%", marginTop: "25px", marginBottom: "5%", }}>
          <HeaderBox text={ClassHeader} sx={{ fontSize: 'Large', fontFamily: 'Courier New', paddingTop: '5%', marginLeft: '25%', color: textColor }} />
        </Grid>

        {/* Reworked this from:
        https://www.geeksforgeeks.org/event-calendar-using-react */}
        <Grid container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ paddingBottom: "5%", marginLeft: "0%", marginBottom: "10%" }}>

          <div className="app">

            <div className="container">
              <div className="calendar-container">
                <Calendar
                  className={calendarTheme}
                  calendarType="gregory"
                  maxDetail="month"
                  minDetail="year"
                  value={selectedDate}
                  onClickDay={Date_Click_Fun}
                  tileClassName={({ date }) =>
                    selectedDate &&
                      date.toDateString === selectedDate.toDateString
                      ? "selected"
                      : events.some(
                        (event) =>
                          event.date ===
                          date.toDateString,)
                        ? "event-marked"
                        : ""
                  }
                />{" "}
              </div>
              <div className="event-container">
                {" "}
                {selectedDate && (
                  <Grid paddingX="5%">

                    <Grid paddingTop="5%" justifyContent="center" display="flex" >
                      <Typography color={textColor} fontSize={22} fontFamily="Courier New" fontWeight="bold" >
                        Create Event
                      </Typography>
                    </Grid>

                    <Grid paddingTop="5%" justifyContent="center" display="flex">
                      <Typography color={textColor} fontSize={16} fontFamily="Courier New" fontWeight="bold">
                        Selected Date: {selectedDate.toDateString()}
                      </Typography>
                    </Grid>

                    {cookies.account === "student" ? (<></>) : (

                      <Grid container paddingX="0%" justifyContent="center" display="flex" marginLeft="6%">
                        <Grid item xs={6} >
                          <TextField
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "grey", borderWidth: "2px", borderRadius: 0 },
                              },
                              "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": { borderColor: buttonColor, borderWidth: "2px", borderRadius: 0 },
                              },
                              "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": { borderColor: buttonColor, borderWidth: "2px", borderRadius: 0 },
                              }
                            }}
                            inputProps={{ style: { color: textColor } }}
                            size="small"
                            placeholder="Event Name"
                            value={eventName}
                            onChange={Event_Data_Update} />
                        </Grid>
                        <Grid item xs={6} justifyContent="center" display="flex" >
                          <Button style={{ backgroundColor: buttonColor, color: textColor, fontFamily: "Courier New" }}
                            className="create_btn"
                            onClick={Create_Event}>
                            Add Event
                          </Button>
                        </Grid>
                      </Grid>
                    )}

                  </Grid>
                )}
              </div>{" "}
            </div>{" "}
          </div>

          <Grid direction="column" justifyContent="center" display="flex" height="fit-content" width="fit-content" >
            <Grid>
              <Typography color={textColor} fontSize={22} fontFamily="Courier New" fontWeight="bold">
                Events on Selected Date:
              </Typography>
            </Grid>
            {events.map((event, index) => selectedDate && event.date === selectedDate.toDateString() ? (
              <div key={index}>
                <Grid container direction="column">
                  <Grid>
                    <Typography color={textColor} fontSize={16} fontFamily="Courier New" fontWeight="bold">
                      {event.date}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography color={textColor} fontSize={16} fontFamily="Courier New" fontWeight="bold">
                      {event.title}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            ) : (<></>))}
          </Grid>


        </Grid>
      </Container>



    </div>
  );

}

export default CalendarSchedule;