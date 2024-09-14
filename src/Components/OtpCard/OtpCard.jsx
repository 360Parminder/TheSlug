import React, { useState, useRef } from 'react';
import './OtpCard.css';

const OtpCard = ({ onClose, verifyOTP }) => {
    const [userOTP, setUserOTP] = useState(Array(6).fill(''));
    const inputRefs = useRef([]);

    const handleInputChange = (index, value) => {
        if (/^[0-9]$/.test(value)) {
            setUserOTP(prevOtp => {
                const newOtp = [...prevOtp];
                newOtp[index] = value;
                return newOtp;
            });

            // Move to the next input if the current one is filled
            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            setUserOTP(prevOtp => {
                const newOtp = [...prevOtp];
                newOtp[index] = ''; // Clear the current input
                return newOtp;
            });

            // Focus on the previous input if the current one is empty
            if (index > 0 && userOTP[index] === '') {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyOTP(userOTP.join(''));
    };

    return (
        <div className="absolute w-screen h-screen justify-center items-center flex">
            <form className="otp-Form" onSubmit={handleSubmit}>
                <span className="mainHeading">Enter OTP</span>
                <p className="otpSubheading">We have sent a verification code to your email address.</p>
                <div className="inputContainer">
                    {userOTP.map((_, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            maxLength="1"
                            type="text"
                            className="otp-input"
                            value={userOTP[index] || ''}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>
                <button type="submit" className="verifyButton">Verify</button>
                <button onClick={onClose} className="exitBtn">×</button>
            </form>
        </div>
    );
};

export default OtpCard;
