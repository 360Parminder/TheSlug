import { Route, Routes } from "react-router-dom";
import UserDashboard from "../Pages/UserDashboard";
import History from "../Pages/History";
import ErrorPage from "../Components/ErrorPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/UserDashboard" element={<UserDashboard />} />
            <Route path="/History" element={<History />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default AppRoutes;
