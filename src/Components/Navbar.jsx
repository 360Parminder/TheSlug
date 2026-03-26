import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/Logo.json';
import { AuthContext } from '../Context/AuthContext';
import Profiledropdown from './Profiledropdown';
import { ROUTES } from '../constants';

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  return (
    <div className="w-full h-20 sticky top-0 flex items-center justify-between backdrop-blur bg-surface-card border-b border-gray-700 z-40">
      {/* Logo */}
      <button
        onClick={() => handleNavigate(ROUTES.HOME)}
        className="w-2/5 md:w-2/12 h-full hover:opacity-80 transition-opacity"
      >
        <Lottie
          className="w-full h-full"
          animationData={animationData}
          alt="logo"
          loop={true}
        />
      </button>

      {/* Right side menu */}
      <div className="flex flex-row gap-5 px-4">
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-12 h-12 rounded-full overflow-hidden hover:ring-2 ring-primary-500 transition-all"
            >
              <img
                className="w-full h-full object-cover"
                src={user?.profile_picture || 'https://via.placeholder.com/48'}
                alt="Profile"
              />
            </button>
            {showDropdown && <Profiledropdown userData={user} onClose={() => setShowDropdown(false)} />}
          </div>
        ) : (
          <div className="flex flex-row gap-3">
            <button
              onClick={() => handleNavigate(ROUTES.LOGIN)}
              className="px-4 py-2 border border-gray-600 rounded-full text-white hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigate(ROUTES.REGISTER)}
              className="hidden md:block px-4 py-2 bg-primary-700 text-white rounded-full hover:bg-primary-600 transition-colors"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
