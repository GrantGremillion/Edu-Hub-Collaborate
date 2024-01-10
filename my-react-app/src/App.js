
// Used to create routes between different pages in website by assigning a path to each .js file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// importing all web pages
import AccountSelection from './Pages/AccountSelection';
import UserProfile from './Pages/UserProfile';
import UserAccountSettings from './Pages/UserAccountSettings';
import CreateAccount from './Pages/CreateAccount';
import CreateClass from './Pages/CreateClass';
import JoinClass from './Pages/JoinClass';


// Root Component for React App
function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* The / indicates that this is the default/home page for the website */}
          <Route path="/" element={<AccountSelection />} />
        </Routes>
        <Routes>
          {/* If someone where to add the path below to their url, they would be redirected to the UserProfile page */}
          <Route path="/UserProfile" element={<UserProfile />} />
        </Routes>
        <Routes>
          <Route path="/UserAccountSettings" element={<UserAccountSettings />} />
        </Routes>
        <Routes>
          <Route path="/CreateAccount" element={<CreateAccount />} />
        </Routes>
        <Routes>
          <Route path="/CreateClass" element={<CreateClass />} />
        </Routes>
        <Routes>
          <Route path="/JoinClass" element={<JoinClass />} />
        </Routes>
      </div>
    </Router> 
  );
}
export default App;
