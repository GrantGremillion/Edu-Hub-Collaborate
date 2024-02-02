import * as React from 'react';
// eslint-disable-next-line
import {slide as menu} from 'react-burger-menu';
import './Sidebar.css';

// NOTE: the "eslint-disable-next-line" comments merely disable a warning that shows up
// in the terminal. They can be removed freely later

// eslint-disable-next-line
export default props => {
  return (
    <menu>
      <a className="menu-item" href="/Home">
        Home
      </a>
      <a className="menu-item" href="/TeacherAnswering">
        Answer
      </a>
      <a className="menu-item" href="/UserProfile">
        User Profile
      </a>
      <a className="menu-item" href="/UserAccountSettings">
        Settings
      </a>
    </menu>
  );
};

