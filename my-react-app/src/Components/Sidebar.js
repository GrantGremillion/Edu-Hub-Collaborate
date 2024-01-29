import * as React from 'react';
import {slide as menu} from 'react-burger-menu';
import './Sidebar.css';

export default props => {
  return (
    <menu>
      <a className="menu-item" href="/">
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

