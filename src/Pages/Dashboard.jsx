import { useEffect, useState } from "react";
import Cookies from 'cookies-js';
import axios from "axios";
import Listloader from "../Components/Loaders/Listloader";
import { IonIcon } from "@ionic/react";
import { linkOutline } from "ionicons/icons";
import Navbar from "../Components/Navbar";
import Alertmessage from "../Components/Alertmessage";
import History from "./History";
import baseUrl from "../baseUrl";
import UserServices from "../Services/UserServices";
import { List } from "react-content-loader";
import { useNavigate } from "react-router-dom";



const Dashboard = () => {
;
  const [ip, setIp] = useState();
  const [link, setLink] = useState();
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState(null);
  const [shortUrl, setShortUrl] = useState();
  const navigate = useNavigate();



  useEffect(() => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((response) => {
        document.cookie = `ip_address=${response.data.ip}; SameSite=Strict; Secure`;
        setIp(response.data.ip);
      })
      .catch((error) => {
        console.error("Error fetching IP address:", error); 
      });
      
  }, []);


  const shortLink = async ()=>{
    setMessageType('info');
    setMessage("Loading...");
  if (link) {
        const response = await UserServices.fetchUrl(link);
        if(response){ 
          // console.log(response);
          setShortUrl(response);
          setMessageType("success");
          setMessage("URL Shortened Successfully!");
          setLink('');
        }
  }else{
    setMessageType('warning');
    setMessage("Please Enter a URL to Proceed.");
  }

}


function handleSubmit(e) {
e.preventDefault(); 
shortLink()
}
  return (
    <>
    <Alertmessage message={message} type={messageType} />
      <div
        className="w-full h-screen  bg-cover bg-center"
        style={{ backgroundImage: "url('/image/badal.png')" }}
      >
        <Navbar />
        <div className="flex flex-col  items-center w-full mt-40">
          <div className="w-full sm:w-4/5 md:w-2/4 flex flex-col items-center gap-6">
            <h1
              className="text-2xl md:text-5xl text-center font-bold bg-clip-text bg-cover text-transparent bg-center"
              style={{ backgroundImage: "url('/image/mesh.png')" }}
            >
              Shorten Your Loooong Links :)
            </h1>
            <p className="text-center md:w-8/12 text-white text-lg">
              Slug is an efficient and easy-to-use URL shortening service that
              streamlines your online experience.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex w-full me-5 ms-5 sm:w-8/12 text-white items-center relative"
            >
              <input
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                value={link}
                className=" border-4 bg-[#353c4a5f] border-[#353C4A] rounded-full ps-10 py-3 w-full backdrop-blur  text-white placeholder:text-white placeholder:font-extralight focus:outline-none"
                type="url"
                placeholder="Enter the Link"
              />
              <IonIcon
                icon={linkOutline}
                className=" absolute start-3 text-2xl "
              />
              <button
                onClick={() => {
                  
                }}
                className="absolute rounded-full bg-blue-700 px-2 py-3 end-[1px] "
              >
                Shorten Now!
              </button>
            </form>
          </div>
            <div className="flex-col h-64 overflow-hidden w-full flex justify-center ">
             {
              ip?(
                <History reload={message}/>

              ):null
             }
             <div className="flex-col h-[10vh] w-[100vw] flex justify-center items-center relative -top-6 bg-black">
             <button onClick={()=>{navigate('/history')}} className=" absolute  bg-blue-700 text-white rounded-lg px-3 py-2 backdrop-blur shadow-md shadow-500/50">View History</button>
             </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
