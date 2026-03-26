import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alertmessage from '../../Components/Alertmessage';
import baseUrl from '../../baseUrl';
import { cookieUtils } from '../../utils/cookieUtils';
import { validators } from '../../utils/validators';
import { getErrorMessage, logError } from '../../utils/errorHandler';
import { ALERT_TYPES, ROUTES, COOKIE_NAMES } from '../../constants';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      setMessageType(ALERT_TYPES.WARNING);
      setMessage('Please fill all fields');
      return;
    }

    if (!validators.isValidEmail(email)) {
      setMessageType(ALERT_TYPES.WARNING);
      setMessage('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    setMessageType(ALERT_TYPES.INFO);
    setMessage('Logging in...');

    try {
      const response = await axios.post(`${baseUrl.backend}${ROUTES.LOGIN}`, {
        email,
        password,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        cookieUtils.setCookie(COOKIE_NAMES.TOKEN, response.data.token);
        setMessageType(ALERT_TYPES.SUCCESS);
        setMessage('Logged in successfully!');
        setTimeout(() => {
          navigate(ROUTES.HOME);
        }, 1500);
      }
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      setMessageType(ALERT_TYPES.ERROR);
      setMessage(errorMsg);
      logError(error, 'Login.handleEmailLogin');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEmailLogin();
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    setMessageType(ALERT_TYPES.INFO);
    setMessage('Google login coming soon');
  };

  return (
    <>
      <Alertmessage message={message} type={messageType} />
      <div
        className="w-screen min-h-screen flex flex-col items-center justify-center font-poppins bg-dark-900"
        style={{ backgroundImage: "url('/image/Splines.png')", backgroundSize: 'cover' }}
      >
        <div className="p-6 md:p-0 w-full h-full sm:w-4/5 sm:h-3/4 md:w-2/4 md:h-3/5 flex items-center justify-center">
          <div className="card w-full bg-surface-darker shadow-xl shadow-black/20 overflow-hidden rounded-lg">
            {/* Crypto SVG Background */}
            <svg
              className="w-full h-32 md:h-48 object-cover opacity-20"
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              version="1.1"
              shapeRendering="geometricPrecision"
              viewBox="0 0 784.37 1277.39"
            >
              <g id="Layer_x0020_1">
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

            {/* Login Form Content */}
            <div className="textBox w-full">
              {/* Logo and Title */}
              <div className="w-full flex flex-col items-center mt-8 mb-8">
                <img className="w-20 md:w-24" src="/image/slugblack.png" alt="Logo" />
                <p className="text-center text-lg md:text-xl font-medium text-gray-100 mt-2">Sign in to Slug</p>
              </div>

              <form onSubmit={handleSubmit} className="w-full bg-gray-50 flex flex-col items-center gap-4 pt-8 pb-8">
                <div className="flex flex-col w-11/12 sm:w-4/5 md:w-3/5 gap-4">
                  {/* Google Login Button */}
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex flex-row items-center justify-center gap-3 h-12 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      className="h-5"
                      src="https://img.icons8.com/color/48/google-logo.png"
                      alt="Google"
                    />
                    <p className="text-gray-700 font-medium">Continue with Google</p>
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <hr className="flex-1 border-gray-300" />
                    <p className="text-gray-500 text-sm">Or continue with email</p>
                    <hr className="flex-1 border-gray-300" />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-gray-700 font-medium text-sm">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 disabled:bg-gray-100"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-gray-700 font-medium text-sm">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 disabled:bg-gray-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-primary-700 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-400 font-medium transition-colors mt-2"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </button>

                  {/* Register Link */}
                  <div className="flex flex-row gap-2 text-center justify-center mt-2">
                    <p className="text-gray-700">Don't have an account?</p>
                    <button
                      type="button"
                      onClick={() => navigate(ROUTES.REGISTER)}
                      className="text-primary-600 font-medium hover:text-primary-700"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
