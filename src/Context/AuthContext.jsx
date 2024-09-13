import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState(null)
    const [user, setUser] = useState('user')
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // const token = localStorage.getItem("token");
        const token = Cookies.get("token");
        if (token) {
            setToken(token);
            setIsLoading(false);
            setIsLoggedIn(true);
        } else {
            setIsLoading(true);
            setIsLoggedIn(false);
        }
    }, []);



    return (
        <AuthContext.Provider value={{ isLoading, token,user,isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
   
};
