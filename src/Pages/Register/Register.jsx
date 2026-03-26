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
  const [country, setCountry] = useState('');
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
    if (!name || !email || !country || !gender || !password) {
      setMessageType(ALERT_TYPES.WARNING);
      setMessage('Please fill all fields');
      return;
    }

    if (!isEmailVerified) {
      setMessageType(ALERT_TYPES.WARNING);
      setMessage('Please verify your email first');
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
          country,
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

      <div className="w-full min-h-screen flex flex-col lg:flex-row bg-white">
        {/* Left Section - Black backdrop with text */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-black flex-col justify-between p-12">
          <div>
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter mb-6 uppercase">
              Precise<br />Digital<br />Coordinates.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Join the architecture of the modern web. Establish your presence with absolute clarity.
            </p>
          </div>

          {/* Visual Element - Abstract gradient */}
          <div className="hidden lg:flex h-60 rounded-lg overflow-hidden shadow-2xl">
            <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-500 to-gray-400 opacity-70" />
          </div>

          <div className="text-gray-500 text-sm font-bold tracking-widest uppercase">
            01 — Initial Sequence
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 lg:px-16 lg:py-0">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">
              Create Identity
            </h2>
            <p className="text-gray-500 text-sm mb-8 font-medium">
              Enter your parameters to begin.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Full Name Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-black text-black tracking-widest uppercase">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="ALEXANDER VOX"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-none text-black placeholder-gray-400 focus:outline-none focus:bg-gray-200 focus:ring-1 focus:ring-black disabled:opacity-50 transition-colors"
                />
              </div>

              {/* Email and Verify Row */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-black text-black tracking-widest uppercase">
                  Email Address
                </label>
                <div className="flex gap-2">
                  <input
                    id="email"
                    type="email"
                    placeholder="COORDINATE@ZURL.COM"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading || isEmailVerified}
                    className="flex-1 px-4 py-3 bg-gray-100 border border-gray-200 rounded-none text-black placeholder-gray-400 focus:outline-none focus:bg-gray-200 focus:ring-1 focus:ring-black disabled:opacity-50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={isVerifyingEmail || isEmailVerified || isLoading}
                    className={`px-6 py-3 font-bold tracking-widest uppercase text-xs transition-colors ${
                      isEmailVerified
                        ? 'bg-emerald-600 text-white'
                        : 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-400'
                    }`}
                  >
                    {isEmailVerified ? '✓' : 'VERIFY'}
                  </button>
                </div>
              </div>

              {/* Gender and Country Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="gender" className="text-xs font-black text-black tracking-widest uppercase">
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={isLoading}
                    className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-none text-black focus:outline-none focus:bg-gray-200 focus:ring-1 focus:ring-black disabled:opacity-50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">SELECT</option>
                    {GENDER_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="country" className="text-xs font-black text-black tracking-widest uppercase">
                    Country
                  </label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    disabled={isLoading}
                    className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-none text-black focus:outline-none focus:bg-gray-200 focus:ring-1 focus:ring-black disabled:opacity-50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">SELECT</option>
                    <option value="UNITED STATES">UNITED STATES</option>
                    <option value="CANADA">CANADA</option>
                    <option value="UNITED KINGDOM">UNITED KINGDOM</option>
                    <option value="AUSTRALIA">AUSTRALIA</option>
                    <option value="GERMANY">GERMANY</option>
                    <option value="FRANCE">FRANCE</option>
                    <option value="INDIA">INDIA</option>
                    <option value="JAPAN">JAPAN</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-xs font-black text-black tracking-widest uppercase">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-none text-black placeholder-gray-400 focus:outline-none focus:bg-gray-200 focus:ring-1 focus:ring-black disabled:opacity-50 transition-colors"
                />
                {passwordError && (
                  <p className="text-red-500 text-xs font-medium">{passwordError}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleRegister}
                disabled={!isEmailVerified || !!passwordError || isLoading}
                className="w-full px-4 py-4 bg-black text-white font-black tracking-widest uppercase text-sm hover:bg-gray-900 disabled:bg-gray-400 transition-colors mt-2"
              >
                {isLoading ? 'Creating...' : 'Register Account →'}
              </button>

              {/* Login Link */}
              <div className="text-center mt-2">
                <span className="text-gray-600 text-sm">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="text-black font-bold hover:underline text-sm"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

