
import React from 'react';

import '../Components/zoom.css';
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

function App() {

  const client = ZoomMtgEmbedded.createClient();

/* These will need to be inputed */
  var authEndpoint = 'http://localhost:3000/Test'
  var sdkKey = 'fphP6rW4QyO3hu5zD3Jnsw'
  var meetingNumber = '3661471637'
  var passWord = 'milo'
  var role = 0
  var userName = 'React'
  var userEmail = ''
  var registrantToken = ''
  var zakToken = ''
  var leaveUrl = 'http://localhost:3000'

  function getSignature(e) {
    e.preventDefault();

    fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {

    let meetingSDKElement = document.getElementById('meetingSDKElement');

      client.init({
        zoomAppRoot: meetingSDKElement,
        language: 'en-US',
        patchJsMedia: true
      }).then(() => {
        client.join({
          sdkKey: sdkKey,
          signature: signature,
          meetingNumber: meetingNumber,
          password: passWord,
          userName: userName
        }).then(() => {
          console.log('joined successfully')
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting</h1>

        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
