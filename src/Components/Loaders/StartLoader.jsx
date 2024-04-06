import { motion } from "framer-motion"
import Lottie from 'lottie-react';
import animationData from '../../assets/Logo.json'


const StartLoader=()=>{
    return(
        <>
        <div className="flex justify-center items-center w-screen h-screen bg-[#0B101B]">
        <Lottie className="w-full h-full" animationData={animationData}   />
        </div>
        </>
    )
}
export default StartLoader;