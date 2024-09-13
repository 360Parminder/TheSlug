import Dashboard from "./Dashboard";
import Cookies from 'cookies-js';
import UserDashboard from "./UserDashboard";
import PopupCard from "../Components/PopupCard";
import StartLoader from "../Components/Loaders/StartLoader";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const Home=()=>{
  const [loader, setLoader] = useState(true);
  const userToken = Cookies.get("token");
  const {user } = useContext(AuthContext);
  console.log(user);
  
  setTimeout(() => {
      setLoader(false)
  }, 3000);
    return(
      <>
      {
        loader? <StartLoader /> :
        (
          <div className=" w-screen h-screen bg-[#0B101B]">
      {
        userToken ? (<UserDashboard/>)
        :
          <Dashboard/>
      }
       
    </div> 
        )
      }
    
    
      </>
  )
}
export default Home ;