import { IonIcon } from '@ionic/react';
import { linkOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import Alertmessage from './Alertmessage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Profiledropdown from './Profiledropdown';
import baseUrl from '../baseUrl';

function UserNavbar(props) {

  const navigate = useNavigate();
  const [link, setLink] = useState();
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState(null);
  const [userData, setUserData] = useState({});
  const [profileDropdown, setProfileDropDown] = useState(false);

  const shortLink = async ()=>{
        setMessageType('info');
        setMessage("Loading...");
      if (link) {
        try {
          const response = await axios.post(`${baseUrl.backend}/url_shorten`,
           {
             redirectURL: link 
            },{
              withCredentials: true // this will add the XSRF token to the request header
            });
            if(response.status==200){
              props.onMessage("Hello from UserNavbar!");
              setMessageType("success");
              setMessage("URL Shortened Successfully!");
            }
            else{
              setMessageType("error");
              setMessage("Error Occurred! Please Try Again.");
            }
        } catch (error) {
          setMessageType('error');
          setMessage(error);
        }
      }else{
        setMessageType('warning');
        setMessage("Please Enter a URL to Proceed.");
      }
    
  }
  useEffect(() => {
    const userProfile = async ()=>{
      try {
        const response = await axios.post(`${baseUrl.backend}/view_profile`,{},{withCredentials:true})
        if (response.status==200) {
          
          setUserData(response.data.user);
        }
        else{

        }
      } catch (error) {
        setMessage(error);
        setMessageType( "error" );
      }
    }
    userProfile();
    
  }, [])
  
  const userProfile=()=>{
    if (profileDropdown==true) {
      setProfileDropDown(false);
    }else(
      setProfileDropDown(true)
    )
  }

 // Prevent the default form submission behavior
function handleSubmit(e) {
  e.preventDefault(); 
  shortLink()
}
  return (
    <>
    <Alertmessage message={message} type={messageType}/>
      <div className='w-screen h-20'>
        <div className='h-full w-full flex flex-row justify-between items-center'>
        <button onClick={()=>{navigate('/')}} className="hidden sm:block sm:w-2/5  md:w-2/12 ms-4"><img  src="/image/TheSlugProject.png" alt="logo" /></button>
        <form onSubmit={handleSubmit} className="flex w-full me-5 ms-5 sm:w-4/12 text-white items-center relative">
                            <input onChange={(e)=>(setLink(e.target.value))}  className=" border-4 bg-[#353c4a5f] border-[#353C4A] rounded-full ps-10 py-3 w-full backdrop-blur  text-white placeholder:text-white placeholder:font-extralight focus:outline-none" type="url" placeholder="Enter the Link"  />
                            <IonIcon icon={linkOutline} className=" absolute start-3 text-2xl "/>
                            <button  className="absolute rounded-3xl bg-blue-700 px-2 py-3 end-[5px] ">Shorten Now!</button>
        </form>
        <div className='w-1/5'>
        <button onClick={()=>{userProfile()}} className="hidden sm:flex flex-col text-left capitalize border border-[#353C4A] rounded-full px-4 py-2 backdrop-blur text-[#FFFFFF] bg-[#181E29]" ><p className=' text-xs'>Welcome</p> <p className=' text-sm font-normal'>{userData?.name}</p></button>
          <div>
            {
              profileDropdown == true  ?
              <Profiledropdown userData={userData}/> : null
            }
          </div>
        </div>
        </div>
      </div>
      
    </>
  )
}

export default UserNavbar
