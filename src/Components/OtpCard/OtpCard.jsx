import React, { useState, useRef } from 'react';

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
        <div className="absolute w-screen h-screen justify-center items-center flex z-[100] backdrop-blur-sm bg-black/20 top-0 left-0">
            <form className="relative bg-white w-full max-w-sm flex flex-col items-center justify-center p-8 gap-5 shadow-2xl rounded-2xl" onSubmit={handleSubmit}>
                <span className="text-xl text-black font-black uppercase tracking-widest">Enter OTP</span>
                <p className="text-xs text-gray-500 font-medium text-center px-4">We have sent a verification code to your email address.</p>
                <div className="w-full flex flex-row gap-3 items-center justify-center">
                    {userOTP.map((_, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            maxLength="1"
                            type="text"
                            className="bg-gray-100 w-12 h-12 text-center border-none rounded-lg text-black outline-none font-bold text-lg focus:bg-gray-200 transition-colors"
                            value={userOTP[index] || ''}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>
                <button type="submit" className="w-full h-12 border-none bg-black text-white font-bold tracking-widest uppercase cursor-pointer rounded-lg hover:bg-gray-800 transition-colors mt-2">
                    Verify
                </button>
                <button onClick={onClose} type="button" className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center border-none text-black text-xl hover:bg-gray-100 cursor-pointer shadow-sm">
                    ×
                </button>
            </form>
        </div>
    );
};

export default OtpCard;
