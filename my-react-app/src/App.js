
// Used to create routes between different pages in website by assigning a path to each .js file
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// importing all web pages
import AccountSelection from './Pages/AccountSelection';
import UserProfile from './Pages/UserProfile';
import UserAccountSettings from './Pages/UserAccountSettings';
import CreateStudentAccount from './Pages/CreateStudentAccount';
import Login from './Pages/Login';
import RecoverPassword from './Pages/RecoverPassword'; 
import CreateClass from './Pages/CreateClass';
import JoinClass from './Pages/JoinClass';
import CreateTeacherAccount from './Pages/CreateTeacherAccount';
import TClassOptions from './Pages/TClassOptions';
import ChatInterface from './Pages/ChatInterface';
import ReportPage from './Pages/ReportPage';
import OTPVerificationPage from './Pages/OTPVerificationPage';
import PasswordReset from './Pages/PasswordReset';
import Home from './Pages/Home';
import Test from './Pages/Test';
import ClassesDisplay from './Pages/ClassesDisplay';
// Library to handle cookies
import { CookiesProvider, useCookies } from "react-cookie";
import * as themes from './Config';



// Root Component for React App
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [getTheme, setTheme] = useCookies(["theme"]);

  // declares a cookie for the theme and handles the case when the user has
  // not set their preference yet.
  var themeVal = getTheme.theme;
  if (themeVal == null) {
    setTheme("theme", false, {path: '/'});
  }
  themes.DarkmodeToggle(getTheme.theme);
  function handleTheme(dark) {
    setTheme("theme", dark, {path: '/'});
  }

  function handleLogin(user) {
    setCookie('user', user, { path: '/' });
  }


  // Check if the user cookie exists to determin which page to redirect the user to
  const isCookieSet = cookies['user'] !== undefined;

  return (
    <CookiesProvider>
      <Router>
        <div>
          <Routes>

            {/* The / indicates that this is the default/home page for the website */}
            <Route path="/" element={isCookieSet ? <Home /> : <AccountSelection />} />
            
            {/* If someone were to add the path below to their url, they would be redirected to the UserProfile page */}
            <Route path="/UserProfile" element={isCookieSet ? <UserProfile /> : <Login onLogin={handleLogin}/>} />
        
            <Route path="/UserAccountSettings" element={isCookieSet ? <UserAccountSettings themeToggle={handleTheme} /> : <Login onLogin={handleLogin}/>} />
        
            <Route path="/CreateStudentAccount" element={isCookieSet ? <Home /> : <CreateStudentAccount />} />

            <Route path="/CreateTeacherAccount" element={isCookieSet ? <Home /> : <CreateTeacherAccount />} />

            {/*If a cookie has been set and the user tries to access the login page, redirect them to the Home page*/}
            <Route path="/Login" element={isCookieSet ? <Home />: <Login onLogin={handleLogin}/>} />

            <Route path="/RecoverPassword" element={isCookieSet ? <Home /> : <RecoverPassword/>} />

            <Route path="/CreateClass" element={isCookieSet ? <CreateClass /> : <Login onLogin={handleLogin}/>}/>

            <Route path="/ChatInterface" element={<ChatInterface />} />
        
            <Route path="/JoinClass" element={isCookieSet ? <JoinClass /> : <Login onLogin={handleLogin}/>} />

            <Route path="/TClassOptions" element={<TClassOptions />} />

            <Route path="/ReportPage" element={isCookieSet ? <ReportPage /> : <Login onLogin={handleLogin}/>} />

            <Route path="/Home" element={isCookieSet ? <Home /> : <Login onLogin={handleLogin}/>} />

            <Route path="/OTPVerificationPage" element={<OTPVerificationPage />} />
            
            <Route path="/password-reset" element={<PasswordReset />} />

            <Route path="/Test" element={<Test />} />

            <Route path="/ClassesDisplay" element={<ClassesDisplay />} />
          </Routes>
            
        </div>
      </Router> 
    </CookiesProvider>
  );
}
export default App;
