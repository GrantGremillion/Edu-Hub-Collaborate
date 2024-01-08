
// Used to handel routing between different pages in website
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// importing all web pages
import AccountSelection from './Pages/AccountSelection';
import UserProfile from './Pages/UserProfile';



// Root Component for React App
function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<AccountSelection />} />
        </Routes>
        <Routes>
          <Route path="/UserProfile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  
  );
}

export default App;
