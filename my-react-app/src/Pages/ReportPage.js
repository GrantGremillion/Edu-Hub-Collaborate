import React, { useState } from 'react';
import { Button, Grid, Container, TextField, Box } from '@mui/material';
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar';
import bg from '../Images/bg.jpg';
import GoBackButton from '../Components/GoBackButton';
import dark_bg from '.././Images/dark_bg.jpg';
import * as themes from '.././Config';

function ReportPage() {
    const [issueReport, setIssueReport] = useState('');
    const [integrityReport, setIntegrityReport] = useState('');

    const handleIssueSubmit = () => {
        // Logic to send issue report to devs
        console.log(issueReport);
        alert('Your issue has been reported to the developers.');
    };

    const handleIntegritySubmit = () => {
        // Logic to send academic integrity violation report to the professor
        console.log(integrityReport);
        alert('The violation of academic integrity has been reported.');
    };

    // checks for the theme the page is in, and applys it to these variables
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
            <PlainNavBar text='Edu Hub Collaborate' />
            <Box
                className="bg"
                style={{
                    backgroundImage: `url(${background})`,
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
            <Container maxWidth="sm" style={{ background: containerColor, marginTop: '75px', paddingBottom: '75px' }}>
                <Grid container spacing={3} direction="column" alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                        <HeaderBox text={'Report an Issue or Violation'} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="issue-report"
                            label="Report an Issue to Developers"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={issueReport}
                            onChange={(e) => setIssueReport(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ marginTop: '20px', background: buttonColor, color: textColor }}
                            onClick={handleIssueSubmit}
                        >
                            Report to Developers
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="integrity-report"
                            label="Report Academic Integrity Violation"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={integrityReport}
                            onChange={(e) => setIntegrityReport(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ marginTop: '20px', background: buttonColor, color: textColor }}
                            onClick={handleIntegritySubmit}
                        >
                            Report to Professor
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <GoBackButton />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default ReportPage;
