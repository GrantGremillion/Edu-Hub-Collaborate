
// Used to create routes between different pages in website by assigning a path to each .js file
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
import TeacherAnswering from './Pages/TeacherAnswering'
import ChatInterface from './Pages/ChatInterface';
import ReportPage from './Pages/ReportPage';
import Home from './Pages/Home';
import Test from './Pages/Test';
// Library to handle cookies
import { CookiesProvider, useCookies } from "react-cookie";

// Root Component for React App
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  function handleLogin(user) {
    setCookie('user', user, { path: '/' });
  }

  function handleLogout(){
    removeCookie('user');
  }

  // Check if the user cookie exists to determin which page to redirect the user to
  const isCookieSet = cookies['user'] !== undefined;

  return (
    <CookiesProvider>
      <Router>
        <div>
          <Routes>

            {/* The / indicates that this is the default/home page for the website */}
            <Route path="/" element={isCookieSet ? <Home/> : <AccountSelection />} />
            
            {/* If someone were to add the path below to their url, they would be redirected to the UserProfile page */}
            <Route path="/UserProfile" element={isCookieSet ? <UserProfile /> : <Login onLogin={handleLogin}/>} />
        
            <Route path="/UserAccountSettings" element={<UserAccountSettings />} />
        
            <Route path="/CreateStudentAccount" element={<CreateStudentAccount />} />

            <Route path="/CreateTeacherAccount" element={<CreateTeacherAccount />} />

            {/*If a cookie has been set and the user tries to access the login page, redirect them to the Home page*/}
            <Route path="/Login" element={isCookieSet ? <Home onLogout={handleLogout}/>: <Login onLogin={handleLogin}/>} />

            <Route path="/RecoverPassword" element={<RecoverPassword/>} />

            <Route path="/CreateClass" element={<CreateClass />} />

            <Route path="/ChatInterface" element={<ChatInterface />} />
        
            <Route path="/JoinClass" element={<JoinClass />} />

            <Route path="/TeacherAnswering" element={<TeacherAnswering />} />

            <Route path="/TClassOptions" element={<TClassOptions />} />

            <Route path="/ReportPage" element={<ReportPage />} />

            <Route path="/Home" element={isCookieSet ? <Home onLogout={handleLogout}/> : <Login onLogin={handleLogin}/>} />

            <Route path="/Test" element={<Test />} />
          </Routes>
            
        </div>
      </Router> 
    </CookiesProvider>
  );
}
export default App;
