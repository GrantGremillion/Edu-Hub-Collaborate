import React, { createContext, useContext, useState } from 'react';

const CookiesContext = createContext();

export const useCookiesContext = () => useContext(CookiesContext);

export const CookiesProvider = ({ children }) => {
  const [cookies, setCookies] = useState({});

  const setCookie = (name, value, options) => {
    // Set the cookie value
    setCookies((prevCookies) => ({
      ...prevCookies,
      [name]: value,
    }));

    // Also, set the cookie in the browser
    // You may need to adjust this part depending on how you handle cookies in your application
    document.cookie = `${name}=${value}; ${options}`;
  };

  return (
    <CookiesContext.Provider value={{ cookies, setCookie }}>
      {children}
    </CookiesContext.Provider>
  );
};
