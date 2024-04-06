import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import { logoInstagram,logoYoutube } from 'ionicons/icons';
import Profiledropdown from "./Profiledropdown";
import {useSelector} from 'react-redux'
import Lottie from 'lottie-react';
import animationData from '../assets/Logo.json'

const Navbar=()=>{
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoggedIn,setIsloggedin]=useState(false);
    const navigate =useNavigate();
   
     
    return(
        <>
        <div className="w-full h-20 top-0  mt-0 sticky flex items-center justify-between backdrop-blur">
        
          { 
          showDropdown === true?(<Profiledropdown />)
                                :null
           } 
            <button onClick={()=>{navigate('/')}} className="w-2/5 h-full  md:w-2/12 "><Lottie className="w-full h-full" animationData={animationData} alt="logo" /></button>
           {/* <div className="hidden md:flex flex-row gap-3 text-[#C9CED6] font-medium text-lg"> */}
            {/* <button className="flex flex-row items-center gap-2"><IonIcon icon={logoInstagram} className="" style={{color:"#b7058a"}}/><p>Download</p></button> */}
            {/* <button className="flex flex-row items-center gap-2"><IonIcon icon={logoYoutube} className="" style={{color:"#bf211e"}}/><p>Download</p></button> */}
            {/* <button className="flex flex-row items-center gap-2">insta download</button> */}
           {/* </div> */}
            <div className="flex flex-row gap-5 px-2 ">
            {isLoggedIn===true ? (
                      
                            <button onClick={()=>{}} className="w-16 h-16 rounded-full me-5"><img className="rounded-full w-full h-full overflow-hidden" src="" alt="Profile Photo" /></button>
                        
                    ) : (
                        <div className="flex flex-row gap-5 px-2">
                            <button onClick={()=>{navigate('/login')}} className="capitalize border border-[#353C4A] rounded-3xl px-3 py-2 backdrop-blur text-[#FFFFFF] bg-[#181E29]" >Login</button>
                            <button onClick={()=>{navigate('/Signup')}} className=" hidden md:block capitalize bg-[#144EE3] text-white rounded-3xl px-3 py-2 backdrop-blur shadow-md shadow-500/50">Register Now</button>
                        </div>
                    )}
           
            </div>

        </div>
        </>
    )
}
export default Navbar;