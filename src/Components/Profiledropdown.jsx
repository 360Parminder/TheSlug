import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Home, ExternalLink, Activity, Users, Settings, Moon, User, HelpCircle, LogOut } from 'lucide-react';
import baseUrl from '../baseUrl';
import { COOKIE_NAMES } from '../constants';

const Profiledropdown = ({ userData, onClose }) => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${baseUrl.backend}/logout`, {}, { withCredentials: true });
      if(response.status === 200){
        Cookies.remove(COOKIE_NAMES.TOKEN);
        if (onClose) onClose();
        navigate('/');
        window.location.reload();
      } else {
        alert('Error Occurred');
      }
    } catch (error) {
      Cookies.remove(COOKIE_NAMES.TOKEN);
      if (onClose) onClose();
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <>
      {/* Background overlay to close dropdown */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      <div className="absolute z-50 w-80 bg-white border border-gray-200 shadow-xl right-0 top-14 flex flex-col overflow-hidden text-black font-sans">
        
        {/* Header - User Info */}
        <div className="flex items-center gap-4 p-5 bg-[#fcfcfc] border-b border-gray-200">
          <div className="w-12 h-12 overflow-hidden flex-0 border border-gray-200 bg-white p-1">
            <img className="w-full h-full object-cover" src={userData?.profile_picture || 'https://via.placeholder.com/40'} alt="Profile" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-black text-black truncate uppercase tracking-[0.15em]">{userData?.name || 'User'}</p>
              {/* <span className="text-[8px] font-bold bg-black text-white px-2 py-1 uppercase tracking-widest">
                PRO
              </span> */}
            </div>
            <p className="text-[10px] text-gray-400 truncate font-bold tracking-widest">{userData?.email || 'email@example.com'}</p>
          </div>
        </div>

        {/* First Menu Group */}
        <div className="px-6 py-4 flex flex-col gap-2">
          <button onClick={()=>navigate('/')} className="flex items-center gap-4 py-2 hover:text-black text-gray-400 transition-colors w-full text-left text-[10px] uppercase font-bold tracking-[0.15em]">
            <Home className="w-4 h-4" /> Home
          </button>
          <button onClick={()=>navigate('/history')} className="flex items-center gap-4 py-2 hover:text-black text-gray-400 transition-colors w-full text-left text-[10px] uppercase font-bold tracking-[0.15em]">
            <ExternalLink className="w-4 h-4" /> My URLs
          </button>
          <button className="flex items-center gap-4 py-2 text-black transition-colors w-full text-left text-[10px] uppercase font-bold tracking-[0.15em]">
            <Activity className="w-4 h-4" /> Active stream
          </button>
        </div>

        <div className="h-px bg-gray-100 w-full" />

        {/* Second Menu Group */}
        <div className="px-6 py-4 flex flex-col gap-2">
          <button className="flex items-center gap-4 py-2 hover:text-black text-gray-400 transition-colors w-full text-left text-[10px] uppercase font-bold tracking-[0.15em]">
            <Settings className="w-4 h-4" /> Site settings
          </button>

          <button className="flex items-center gap-4 py-2 hover:text-black text-gray-400 transition-colors w-full text-left text-[10px] uppercase font-bold tracking-[0.15em]">
            <User className="w-4 h-4" /> My profile & preferences
          </button>
          <button className="flex items-center gap-4 py-2 hover:text-black text-gray-400 transition-colors w-full text-left text-[10px] uppercase font-bold tracking-[0.15em]">
            <HelpCircle className="w-4 h-4" /> Help center
          </button>
        </div>

        {/* Footer actions */}
        <div className="mt-auto px-6 py-5 bg-[#fcfcfc] border-t border-gray-200 flex justify-between items-center">
          <button className="text-[10px] font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-[0.15em]">
            Feedback
          </button>
          <button 
            onClick={handleLogout}  
            className="flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-900 text-white transition-colors text-[10px] font-bold uppercase tracking-widest"
          >
            Logout <LogOut className="w-3 h-3" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Profiledropdown;
