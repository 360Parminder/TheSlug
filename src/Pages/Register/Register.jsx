import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alertmessage from '../../Components/Alertmessage';
import baseUrl from '../../baseUrl';
import OtpCard from '../../Components/OtpCard/OtpCard';
import { ALERT_TYPES, GENDER_OPTIONS, ROUTES, API_ENDPOINTS } from '../../constants';
import { validators, getPasswordErrorMessage } from '../../utils/validators';
import { getErrorMessage, logError } from '../../utils/errorHandler';
import UserServices from '../../Services/UserServices';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(null);
  const [validOtp, setValidOtp] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showOtpCard, setShowOtpCard] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    const error = getPasswordErrorMessage(pwd);
    setPasswordError(error);
  };

  const handleVerifyEmail = async () => {
    if (!email) {
      setMessageType(ALERT_TYPES.WARNING);
      setMessage('Please enter your email');
      return;
    }

    if (!validators.isValidEmail(email)) {
      setMessageType(ALERT_TYPES.WARNING);
      setMessage('Please enter a valid email');
      return;
    }

    setIsVerifyingEmail(true);
    setMessageType(ALERT_TYPES.INFO);
    setMessage('Sending OTP...');

    try {
      const response = await UserServices.verifyEmail(email);
      if (response) {
        setMessageType(ALERT_TYPES.SUCCESS);
        setMessage('OTP sent successfully!');
        setValidOtp(response.otp);
        setTimeout(() => {
          setShowOtpCard(true);
        }, 1500);
      }
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      setMessageType(ALERT_TYPES.ERROR);
      setMessage(errorMsg);
      logError(error, 'Register.handleVerifyEmail');
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handleVerifyOtp = (userOTP) => {
    if (validOtp === userOTP) {
      setMessageType(ALERT_TYPES.SUCCESS);
      setMessage('Email verified successfully!');
      setIsEmailVerified(true);
      setShowOtpCard(false);
    } else {
      setMessageType(ALERT_TYPES.ERROR);
      setMessage('Invalid OTP. Please try again.');
    }
  };

  const handleRegister = async () => {
    // Validation
    if (!name || !email || !mobile || !gender || !password) {
      setMessageType(ALERT_TYPES.WARNING);
      setMessage('Please fill all fields');
      return;
    }

    if (!isEmailVerified) {
      setMessageType(ALERT_TYPES.WARNING);
      setMessage('Please verify your email first');
      return;
    }

    if (!validators.isValidMobile(mobile)) {
      setMessageType(ALERT_TYPES.WARNING);
      setMessage('Please enter a valid mobile number');
      return;
    }

    if (!validators.isValidPassword(password)) {
      setMessageType(ALERT_TYPES.ERROR);
      setMessage('Password does not meet requirements');
      return;
    }

    setIsLoading(true);
    setMessageType(ALERT_TYPES.INFO);
    setMessage('Creating account...');

    try {
      const response = await axios.post(
        `${baseUrl.backend}${API_ENDPOINTS.AUTH.REGISTER}`,
        {
          name,
          email,
          mobile,
          gender,
          password,
        },
        {
          withCredentials: true,
        },
      );

      if (response.status === 200 || response.status === 201) {
        setMessageType(ALERT_TYPES.SUCCESS);
        setMessage('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate(ROUTES.LOGIN);
        }, 2000);
      }
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      setMessageType(ALERT_TYPES.ERROR);
      setMessage(errorMsg);
      logError(error, 'Register.handleRegister');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Alertmessage message={message} type={messageType} />
      {showOtpCard && (
        <OtpCard
          verifyOTP={handleVerifyOtp}
          onClose={() => setShowOtpCard(false)}
        />
      )}

      <div className="background w-full min-h-screen flex flex-row gap-4 font-poppins bg-cover" style={{ backgroundImage: "url('/image/bg-register.png')" }}>
        {/* Left Section - Form */}
        <div className="flex flex-col w-full sm:w-1/2 h-full items-center justify-center px-4 py-8 sm:px-0">
          <div className="w-full sm:w-9/12 space-y-4">
            <h3 className="text-4xl md:text-5xl font-semibold text-white mb-6">Create Your Account</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 text-white bg-surface-darker rounded-lg shadow-lg">
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 disabled:opacity-50"
                />
              </div>

              {/* Email and Verify Row */}
              <div className="grid grid-cols-4 gap-2 items-end">
                <div className="col-span-3 flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading || isEmailVerified}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 disabled:opacity-50"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyEmail}
                  disabled={isVerifyingEmail || isEmailVerified || isLoading}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    isEmailVerified
                      ? 'bg-green-600 text-white'
                      : 'bg-primary-600 hover:bg-primary-700 text-white disabled:bg-gray-600'
                  }`}
                >
                  {isEmailVerified ? '✓ Verified' : 'Verify'}
                </button>
              </div>

              {/* Mobile Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="mobile" className="text-sm font-medium">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  type="tel"
                  placeholder="1234567890"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 disabled:opacity-50"
                />
              </div>

              {/* Gender Select */}
              <div className="flex flex-col gap-2">
                <label htmlFor="gender" className="text-sm font-medium">
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 disabled:opacity-50"
                >
                  <option value="">Select Gender</option>
                  {GENDER_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter secure password"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 disabled:opacity-50"
                />
                {passwordError && (
                  <p className="text-red-400 text-xs">{passwordError}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleRegister}
                disabled={!isEmailVerified || !!passwordError || isLoading}
                className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors mt-4"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>

              {/* Login Link */}
              <div className="flex flex-row gap-2 text-center justify-center mt-2">
                <p>Already have an account?</p>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="text-primary-400 hover:text-primary-300 font-medium"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section - Crypto SVG (Hidden on mobile) */}
        <div className="hidden sm:flex sm:w-1/2 justify-center items-center">
          <svg
            className="w-3/4"
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            version="1.1"
            shapeRendering="geometricPrecision"
            viewBox="0 0 784.37 1277.39"
          >
            <g id="Layer_x0020_1">
              <g id="_1421394342400">
                <g>
                  <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.32 784.15,661.57"></polygon>
                  <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 0,661.57 392.07,882.32 392.07,472.33"></polygon>
                  <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,953.67 387.47,960.5 387.47,1277.39 392.07,1277.39 784.15,716.43"></polygon>
                  <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.39 392.07,953.67 0,716.43"></polygon>
                  <polygon fill="#141414" fillRule="nonzero" points="392.07,882.32 784.15,661.57 392.07,472.33"></polygon>
                  <polygon fill="#393939" fillRule="nonzero" points="0,661.57 392.07,882.32 392.07,472.33"></polygon>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Register;

