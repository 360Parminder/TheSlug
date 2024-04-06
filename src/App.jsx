import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login/Login";
import '@ionic/react/css/core.css';
import { setupIonicReact } from '@ionic/react';
import History from "./Pages/History";
import Register from "./Pages/Register/Register";
import UserDashboard from "./Pages/UserDashboard";
import ErrorPage from "./Components/ErrorPage";
setupIonicReact();

const App=()=>{
  return(
    <>
    <Routes>

      <Route path="/login" element={<Login/>}/>
      <Route path="/Signup" element={<Register/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/UserDashboard" element={<UserDashboard/>}/>
      <Route path="/History" element={<History/>}/> 
      <Route path="*"element={<ErrorPage/>}/>
       

    </Routes>
    </>
  )
}
export default App;