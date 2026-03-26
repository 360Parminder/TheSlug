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
    setMessage('Authorizing...');

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
        setMessage('Authorized successfully!');
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

  return (
    <>
      <Alertmessage message={message} type={messageType} />
      <div className="w-full min-h-screen flex flex-col lg:flex-row bg-white">
        {/* Left Section - Black backdrop with text */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-black flex-col justify-between p-12">
          <div>
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-12">
              ZURL
            </h3>
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter uppercase">
              Precise<br />Digital<br />Coordinates.
            </h1>
            <p className="text-gray-400 text-base leading-relaxed max-w-md mt-6">
              The architectural standard for digital navigation. Secure your entry to the monolithic URL ecosystem.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="text-gray-600 text-xs font-bold tracking-widest uppercase">
              — AUTHENTICATION PORTAL V2.0
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 lg:px-16 lg:py-0">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">
              Login
            </h2>
            <p className="text-gray-600 text-sm mb-8 font-medium">
              Access your high-fidelity dashboard.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Email Address Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-black text-black tracking-widest uppercase">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-none text-black placeholder-gray-400 focus:outline-none focus:bg-gray-200 focus:ring-1 focus:ring-black disabled:opacity-50 transition-colors"
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-black text-black tracking-widest uppercase">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.REGISTER)}
                    className="text-xs text-gray-600 hover:text-black font-medium tracking-widest uppercase transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-none text-black placeholder-gray-400 focus:outline-none focus:bg-gray-200 focus:ring-1 focus:ring-black disabled:opacity-50 transition-colors"
                />
              </div>

              {/* Authorize Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-4 bg-black text-white font-black tracking-widest uppercase text-sm hover:bg-gray-900 disabled:bg-gray-400 transition-colors mt-2"
              >
                {isLoading ? 'Authorizing...' : 'Authorize →'}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-2">
                <div className="flex-1 border-t border-gray-300"></div>
                <p className="text-xs font-medium text-gray-500 tracking-widest uppercase">Or</p>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <span className="text-gray-600 text-sm">Don&apos;t have an account? </span>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.REGISTER)}
                  className="text-black font-bold hover:underline text-sm"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
