import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Components/ErrorPage";
import AppRoutes from "./AppRoutes";
import Dashboard from "../Pages/Dashboard";

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/Signup" element={<Register/>}/>
            <Route path="/root/*" element={<AppRoutes/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    )
}

export default AuthRoutes;