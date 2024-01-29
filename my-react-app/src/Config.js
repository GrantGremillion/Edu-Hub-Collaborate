// this file handles darkmode's config settings since global variables are frowned upon
export var DARKMODE = false;

export function darkmodeToggle() {

  if (!DARKMODE) {
    DARKMODE = true;
  }
  else {
    DARKMODE = false;
  }
}