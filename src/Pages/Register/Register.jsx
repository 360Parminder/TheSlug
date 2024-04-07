import { useState } from "react"
import Alertmessage from "../../Components/Alertmessage";
import axios from "axios";
import './Register.css'
import { useNavigate } from "react-router-dom";
import baseUrl from "../../baseUrl";
import OtpCard from "../../Components/OtpCard/OtpCard";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [gender, setGender] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState(null);
    const [validOtp, setValidOtp] = useState('')
    const [userStatus, setUserStatus] = useState(false)
    const [otpCard, setOtpCard] = useState(false);
    
    // for user verifiacation Status
   
    // OTP validation
    const  verifyOtp = async (userOTP) =>{
        if(validOtp === userOTP) {
            setMessageType("success")
            setMessage("Email verified Successfully")
            setUserStatus(true)
            setOtpCard(false)
        }else{
            setMessage("Invalid OTP")
            setMessageType("warning");
        }
    }
    //Form Submission Handler
    const userLogin = async () => {
        setMessage("Loading...")
        setMessageType('info')
        try {
            const response = await axios.post(`${baseUrl.backend}/register`, {
                name: name,
                email: email,
                mobile: mobile,
                gender: gender,
                password: password,
            }, {
                withCredentials: true
            })
            if (response.status === 200) {
                setMessage("User Registered Successfully")
                setMessageType("success")
                setTimeout(() => {
                    navigate("/login");
                }, 3500);
            } else {
                setMessage("Error Occured while registering User.")
                setMessageType("warning")
            }
        } catch (error) {
            setMessage(error.message)
            setMessageType("error")
        }
    };

    const fetchOtp = async () => {
        if (email) {
            setMessageType('info')
            setMessage('Sending OTP ...')
            try {
                let response = await axios.post(`${baseUrl.backend}/email_verify`, {
                    email: email
                }, {
                    withCredentials: true,
                })
                console.log(response);
                if (response.status === 200) {
                    setMessageType("success")
                    setMessage("OTP Sent to Your Email Id.")
                    setTimeout(() => {
                        setOtpCard(true)
                    }, 2000);
                    setValidOtp(response.data.otp)
                } else {
                    setMessageType("error")
                    setMessage("Email is not registered or the entered Email is incorrect.")
                }
            } catch (error) {
                setMessageType("error");
                setMessage("Server Error. Please Try Again Later.");
            }
        } else {
            setMessageType("warning")
            setMessage("Please enter your registered Email Id to get OTP!")
        }
    };

    // Prevent the default form submission behavior
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <>
            <Alertmessage message={message} type={messageType} />
            {
    otpCard ? (
        <OtpCard verifyOTP={verifyOtp} onClose={() => { setOtpCard(false) }} />
    ) : (
        null
    )
}

            <div className="background w-full h-screen flex flex-row gap-1 font-poppins ">
                <div className="flex flex-col w-full sm:w-1/2 h-full items-center justify-center ">
                    <h3 className=" w-9/12 text-[43px] ps-5 font-semibold text-[#f2f4f3]">Register</h3>
                    <form onSubmit={handleSubmit} action="" className="flex flex-col gap-3 w-9/12 px-10 py-5 text-[#231f20] text-xl bg-[#f2f4f3] rounded-md shadow-md shadow-[#1f2421]">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Name</label>
                            <input onChange={(e) => { setName(e.target.value) }} className="inputfield" type="text" placeholder="User Name" />
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <div className="flex flex-col gap-1 w-5/6">
                                <label htmlFor="email">Email</label>
                                <input onChange={(e) => { setEmail(e.target.value) }} className="inputfield" type="text" placeholder="user@slug.com" />
                            </div>
                            <div className="flex items-center justify-center h-full">
                            {userStatus==true ? (
                           <button className="px-2  py-1 bg-[#248232] text-[#fcfffc] rounded mt-8">verified</button>
                        ) : (
                          <button onClick={() => { fetchOtp() }} className="px-2 py-1 bg-[#343a40] text-[#f2f4f3] rounded mt-8">Verify</button>
                        )}
                                
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="mobile">Contact Number</label>
                            <input onChange={(e) => { setMobile(e.target.value) }} className="inputfield" type="text" placeholder="877000087" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="gender">Gender</label>
                            <select onChange={(e) => { setGender(e.target.value) }} className="inputfield" id="Gender" name="Gender">
                                <option className="inputfield ">Select Gender</option>
                                <option className="inputfield" value="male">Male</option>
                                <option className="inputfield" value="female">Female</option>
                                <option className="inputfield" value="other">Other</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password">Password</label>
                            <input onChange={(e) => { setPassword(e.target.value) }} className="inputfield" type="password" placeholder="******" />
                        </div>
                        {userStatus ? (
                            <button onClick={userLogin} className="px-4 py-2 bg-[#343a40] text-[#f2f4f3] rounded mt-5">Sign Up</button>
                        ) : (
                            <button className="px-4 py-2 bg-[#343a40] text-[#f2f4f3] rounded mt-5">Sign Up</button>
                        )}
                         <div className="flex flex-row gap-1 text-lg">
                                <p>Already a User ?</p> <button className="text-black font-normal " onClick={() => { navigate('/login') }} >sign in</button>
                         </div>
                    </form>
                </div>
                <div className="hidden sm:flex sm:w-2/5 justify-center items-center text-[#C9CED6]">
                    <svg className="img" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 784.37 1277.39" xmlnsXlink="http://www.w3.org/1999/xlink">
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
                </div>
            </div>
        </>
    )
}
export default Register
