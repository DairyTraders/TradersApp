// https://icms-api.herokuapp.com/
import React, { createContext }  from 'react';
export const urlContext = createContext();

function URLProvider({ children }) {
    // const url = "https://icms-api.herokuapp.com/";
    const url = "https://dairytrader-app.herokuapp.com/";
    return (
        <urlContext.Provider value={url}>
        {children}
        </urlContext.Provider>
    );
}

export default URLProvider;