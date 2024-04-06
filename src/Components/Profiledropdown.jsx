import { IonIcon } from '@ionic/react';
import Cookies from 'cookies-js';
import axios from 'axios';
import { logOutOutline, cog } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../baseUrl';

const Profiledropdown=({userData})=>{
    const navigate =useNavigate()
    const Logout= async ()=>{
        try {
           const response = await axios.post(`${baseUrl.backend}/logout`,{},{withCredentials:true}); 
           if(response.status===200){
               Cookies.expire('token');
               navigate("/");
           }else{
               alert("Error Occured")
           }
        } catch (error) {
            alert(error);
            setTimeout(() => {
                navigate('*')
            }, 3000);
        }
    }

    return(
        <>
        <div className=" absolute z-40 w-[16vw] h-[35vh] bg-[#181E29] shadow-2xl right-[10vw] top-20 rounded-lg flex flex-col justify-between">
            <div className="flex rounded-t-lg justify-center items-center w-full h-2/5 relative bg-slate-300">
                <div className="w-14 h-14 overflow-hidden absolute -bottom-7 rounded-full">
                <img  className=" w-full h-full rounded-full overflow-hidden" src={"https://theslugproject.onrender.com/public/assets/profile/"+userData.profile_picture} alt="User Profile" />
                </div>
            </div>

            <div className="text-white mt-10 w-full text-center">
                <p className=" capitalize font-normal text-xl ">{userData?.name}</p>
                <p className="text-lg" >{userData?.email}</p>
            </div>
            <div className="text-white w-full flex flex-col items-center my-4 ">
                <button className="flex items-center gap-2 hover:bg-slate-900 px-4 py-2 rounded-md"> <IonIcon className="text-2xl font-bold " icon={cog}/> Setting</button>
                <button onClick={()=>{Logout()}}  className="flex items-center gap-2 hover:bg-slate-900 px-4 py-2 rounded-md"> <IonIcon className="text-2xl font-bold" icon={logOutOutline}/>Sign Out</button>
            </div>
        </div>
        
        </>
    )
}
export default Profiledropdown;