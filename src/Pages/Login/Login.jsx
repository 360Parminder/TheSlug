import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alertmessage from '../../Components/Alertmessage';
import './Login.css'
import axios from 'axios';
import baseUrl from '../../baseUrl';
import Cookies from 'cookies-js';

const Login=()=>{
   
    const [email,setEmail]=useState();
    const [password,setPassword]=useState()
    const [message,setMessage]=useState()
    const [messageType,setMessageType] = useState(null)
    const [type,setType]=useState("button")
    const navigate = useNavigate()
    const emailLogin= async ()=>{
      if(email && password){
        //send the data to server for verification  
        try {
          setMessage("Loading...");
          setMessageType("info");
          const response = await axios.post(`${baseUrl.backend}/login`,{
            email:email,
            password:password,
          },
          {
            withCredentials:true
          }
          )
          if (response.status==200) {
            Cookies.set("token",response.data.token)
            setMessage("Logged in Successfully")
            setMessageType('success');
            setTimeout(() => {
              navigate('/UserDashboard')
            }, 2000);
          } else {
            setMessage(response.message);
            setMessageType('warning')

          }
        } catch (error) {
          setMessage(error.message);
          setMessageType('error');
          setTimeout(() => {
            navigate('*')
          }, 5000);
        }    
    
      }else{
        setMessage("Please fill all fields");
        setMessageType('info')
         
      }
    }

// function for mail button

function change() {
  if (type === "button") {
      setType("submit");
  } else {
    emailLogin(); 
  }
}

// Prevent the default form submission behavior
function handleSubmit(e) {
  e.preventDefault(); 
}



    return(
        <>
        <Alertmessage message={message} type={messageType} />
        <div className='w-screen h-screen flex flex-col items-center justify-center font-poppins bg-[#000814]' style={{backgroundImage: "url('/image/Splines.png')"}}>
            <div className='p-10 md:p-0 w-full h-full sm:w-4/5 sm:h-3/4 md:w-2/4 md:h-3/5'>
            <div className="card w-full bg-[#22333b] shadow-xl  shadow-slate-100/10 overflow-hidden ">
<svg className="img" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"  version="1.1" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 784.37 1277.39" xmlnsXlink="http://www.w3.org/1999/xlink">
 <g id="Layer_x0020_1">
  <metadata id="CorelCorpID_0Corel-Layer"></metadata>
  <g id="_1421394342400">
   <g>
    <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"></polygon>
    <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"></polygon>
    <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"></polygon>
    <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"></polygon>
    <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"></polygon>
    <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"></polygon>
   </g>
  </g>
 </g>
</svg>
  <div className="textBox w-full ">
   <div className="w-full flex flex-col items-center mt-10 ">
    <img className='w-28' src="/image/slugblack.png" alt="" />
    <p className='text-center text-lg font-medium text-[#f9f7f3]'>Sign in to Slug</p>
   </div>
    <div className='w-full h-screen flex flex-col items-center gap-4 pt-10  backdrop-blur bg-[#f9fafb]'>
      <div className='flex flex-col w-3/5  md:w-2/4  gap-3 text-[#33415c]'>
        <button onClick={()=>{withgoogle()}} className='appbtn gap-2 h-10'><img className='h-3/4' src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/> <p>Continue with google</p></button>
        <button className='appbtn gap-2 h-10'><img className='h-3/4' src="https://img.icons8.com/ios-glyphs/30/github.png" alt="github"/> <p>Continue with github</p></button>
      </div>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4'>
        {
           type === "submit" ?<div className='flex flex-col gap-2'>
             <input type="email" onChange={(e)=>{setEmail(e.target.value)}} autoComplete='email' placeholder='join@slug.com' required className=' ps-3 rounded-md border-[2px] h-10 text-black font-normal focus:outline-none'  />
             <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='********' required className=' ps-3 rounded-md border-[2px] h-10 text-black font-normal focus:outline-none' name="" id=""  />
             </div>
              : null
        }
        
        <button type={type} onClick={(e) => { change(e.type) }} className=' w-full appbtn text-[#33415c] bg-[#fff] h-10 px-3'>Continue with Email</button>
      </form>
        <div className=' flex flex-row gap-2'>
          <p className='text-[#6c757d]'>Don't have an account?</p>
          <button onClick={()=>{navigate('/Signup')}}  className='text-[#343a40] cursor-pointer hover:text-[#212529]'>Sign up</button>
        </div>
    </div>
   
  </div>
</div>


            </div>
        </div>
        </>
    )
}
export default Login