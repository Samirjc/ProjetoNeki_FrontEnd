import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);


export default function Context(props) {
    const [token, setToken] = useState();


    useEffect(() => {
        if(localStorage.getItem('Authorization')) {
          setToken(localStorage.getItem('Authorization'));
        }
    }, []);
    
      
    return (
        <AuthContext.Provider value={{token, setToken}}>
            {props.children}
        </AuthContext.Provider>
    );
}