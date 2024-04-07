import React, { useState } from 'react';
import './OtpCard.css';

const OtpCard = ({ onClose, verifyOTP }) => {
    const [userOTP, setUserOTP] = useState('');

    const handleInputChange = (index, value) => {
        setUserOTP(prevOtp => {
            const newOtp = prevOtp.split('');
            newOtp[index] = value;
            return newOtp.join('');
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="absolute w-screen h-screen justify-center items-center flex">
            <form className="otp-Form" onSubmit={handleSubmit}>
                <span className="mainHeading">Enter OTP</span>
                <p className="otpSubheading">We have sent a verification code to your mobile number</p>
                <div className="inputContainer">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <input
                            key={index}
                            maxLength="1"
                            type="text"
                            className="otp-input"
                            value={userOTP[index] || ''}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    ))}
                </div>
                <button onClick={() => verifyOTP(userOTP)} className="verifyButton">Verify</button>
                <button onClick={onClose} className="exitBtn">×</button>
            </form>
        </div>
    );
};

export default OtpCard;
