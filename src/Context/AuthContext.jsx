import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import UserServices from "../Services/UserServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState(null)
    const [user, setUser] = useState('user')
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchUser = async (token) => {
        if (token) {
            const user = await UserServices.getUser(token);
            setUser(user?.user);
        }
    };
    useEffect(() => {
        const token = Cookies.get("token");
        setIsLoading(true);
        if (token) {
            setToken(token);
            setIsLoggedIn(true);
            setIsLoading(false);
            fetchUser(token);
        } else {
            setIsLoading(false);
            setIsLoggedIn(false);
            setToken(null);
        }
    }, []);



    return (
        <AuthContext.Provider value={{ isLoading, token,user,isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
   
};
