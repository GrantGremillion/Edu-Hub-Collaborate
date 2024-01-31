import React, { useState } from 'react';
import { Button, Grid, Container, TextField, Box } from '@mui/material';
import HeaderBox from '../Components/HeaderBox';
import PlainNavBar from '../Components/PlainNavBar';
import bg from '../Images/bg.jpg';

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

    return (
        <div>
            <PlainNavBar text='Edu Hub Collaborate' />
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
                            style={{ marginTop: '20px', background: '#004d40', color: 'white' }}
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
                            style={{ marginTop: '20px', background: '#004d40', color: 'white' }}
                            onClick={handleIntegritySubmit}
                        >
                            Report to Professor
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default ReportPage;
