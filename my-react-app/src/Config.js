
// import {useCookies} from "react-cookie";

// this file handles website theme config settings since global variables are frowned upon
export var DARKMODE = false;

// normal page color scheme
export var normalButton = '#b2dfdb';
export var normalContainer = '#e0f2f1';
export var normalText = 'black';
// darkmode colo scheme
export var darkButton = '#009688';
export var darkContainer = '#216E6B';
export var darkText = 'white';

export function darkmodeToggle() {

  

  if (!DARKMODE) {
    DARKMODE = true;
  }
  else {
    DARKMODE = false;
  }
}