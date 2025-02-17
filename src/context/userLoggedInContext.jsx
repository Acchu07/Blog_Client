import React, { createContext, useState, useRef } from 'react';

const UserLoggedInContext = createContext();

const UserLoggedInProvider = ({ children }) => {
    const [userLoggedIn, setUserLoggedIn] = useState({ bIsLoggedIn: false, userName: null })

    return (
        <UserLoggedInContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
            {children}
        </UserLoggedInContext.Provider>
    );
};

export { UserLoggedInContext, UserLoggedInProvider };