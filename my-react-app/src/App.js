
// Used to create routes between different pages in website by assigning a path to each .js file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// importing all web pages
import AccountSelection from './Pages/AccountSelection';
import UserProfile from './Pages/UserProfile';
import UserAccountSettings from './Pages/UserAccountSettings';
import CreateAccount from './Pages/CreateAccount';
import Login from './Pages/Login';
import RecoverPassword from './Pages/RecoverPassword'; 
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
          
          {/* If someone were to add the path below to their url, they would be redirected to the UserProfile page */}
          <Route path="/UserProfile" element={<UserProfile />} />
       
          <Route path="/UserAccountSettings" element={<UserAccountSettings />} />
       
          <Route path="/CreateAccount" element={<CreateAccount />} />
       
          <Route path="/Login" element={<Login/>} />

          <Route path="/RecoverPassword" element={<RecoverPassword/>} />

          <Route path="/CreateClass" element={<CreateClass />} />
       
          <Route path="/JoinClass" element={<JoinClass />} />
        </Routes>
      </div>
    </Router> 
  );
}
export default App;
