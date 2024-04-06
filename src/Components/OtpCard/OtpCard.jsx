import { useState } from 'react';
import './OtpCard.css'
const OtpCard=({validotp})=>{
    const  [userotp,setUserOTP]=useState()
    if (userotp==validotp) {
        
    }
    console.log(validotp);
    return(
        <>
        <div  className=" absolute w-screen h-screen flex justify-center items-center">
        <form className="otp-Form">
 <span className="mainHeading">Enter OTP</span>
 <p className="otpSubheading">We have sent a verification code to your mobile number</p>
 <div className="inputContainer">
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input1"/>
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input2"/>
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input3"/>
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input4"/> 
  
 </div>
  <button className="verifyButton" type="submit">Verify</button>
    <button className="exitBtn">×</button>
    <p className="resendNote">Didn't receive the code? <button className="resendBtn">Resend Code</button></p>
    
</form>

        </div>
        </>
    )
}

export default OtpCard;