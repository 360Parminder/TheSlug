import Navbar from "./Navbar";
import Lottie from 'lottie-react';
import animationData from '../assets/errorAnimation.json'
import { useNavigate } from "react-router-dom";
 
const ErrorPage=()=>{
    const navigate = useNavigate();
    return(
        <>
        <div className="w-screen h-screen flex flex-col items-center overflow-hidden bg-[#0B101B]">
        <Navbar/>
            <div className="w-screen h-4/5">
                <Lottie className="w-full h-full" animationData={animationData}   />
            </div>
            <button onClick={()=>{navigate('/')}} className="bg-[#144EE3] px-4 py-2 rounded text-[#C9CED6]">Back to HomePage</button>
        </div>
        </>
    )
}

export default ErrorPage;