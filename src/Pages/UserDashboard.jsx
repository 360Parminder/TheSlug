import { useState } from "react";
import UserNavbar from "../Components/UserNavbar"
import History from "./History"

const UserDashboard=()=> {
  const [message, setMessage] = useState("");
  const onMessage = (msg) => {
    setMessage(msg);
  }
  return (

    <>
     <div className="w-full h-screen  bg-cover bg-center" style={{backgroundImage: "url('/image/badal.png')"}}>
    <UserNavbar onMessage={onMessage}/>
      <div className="">
        <History reload={message}/>
      </div>
    </div>
      
    </>
  )
}

export default UserDashboard
