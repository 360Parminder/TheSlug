import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight, Activity, TrendingUp, TrendingDown, Share2, MapPin } from 'lucide-react';
import Alertmessage from '../Components/Alertmessage';
import UserServices from '../Services/UserServices';
import { AuthContext } from '../Context/AuthContext';
import { ROUTES } from '../constants';
import { logError } from '../utils/errorHandler';
import Profiledropdown from '../Components/Profiledropdown';

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const Sparkline = () => {
  const heights = [40, 70, 45, 90, 60, 80];
  return (
    <div className="flex items-end gap-[2px] h-6">
      {heights.map((h, i) => (
        <div key={i} className={`w-1 md:w-1.5 ${i === 3 ? 'bg-black' : 'bg-gray-300'}`} style={{ height: `${h}%` }}></div>
      ))}
    </div>
  );
};

const History = ({ reload }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchAllLinks = async () => {
      setIsLoading(true);
      try {
        const response = await UserServices.fetchHistory();
        if (response?.urls) {
          setHistory(response.urls);
        } else {
          setHistory([]);
        }
      } catch (error) {
        logError(error, 'History.fetchAllLinks');
        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchAllLinks();
    } else {
      setIsLoading(false);
    }
  }, [reload, isLoggedIn]);

  const totalClicks = history.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
  const activeLinks = history.length;

  return (
    <div className="min-h-screen bg-[#F7F7F8] font-sans text-black selection:bg-black selection:text-white">
      <Alertmessage message={message} type={messageType} />
      
      {/* Navbar matching dashboard style */}
      <nav className="w-full h-20 flex items-center justify-between px-6 md:px-12 bg-white border-b border-gray-200 z-50 sticky top-0">
        <div className="text-xl font-black tracking-tighter cursor-pointer uppercase" onClick={() => navigate(ROUTES.HOME)}>
          ZURL
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-[0.15em] text-gray-500 uppercase">
          <a href="#features" className="hover:text-black transition-colors">Features</a>
          <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
          {isLoggedIn ? (
            <div className="relative flex items-center gap-4">
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 group-hover:border-black transition-colors">
                  <img
                    className="w-full h-full object-cover"
                    src={user?.profile_picture || 'https://via.placeholder.com/32'}
                    alt="Profile"
                  />
                </div>
                <span className="text-black font-bold flex items-center gap-1">
                  {user?.name || 'User'} <ChevronRight className="w-3 h-3 rotate-90" />
                </span>
              </div>
              {showDropdown && <Profiledropdown userData={user} onClose={() => setShowDropdown(false)} />}
            </div>
          ) : (
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="bg-black text-white px-6 py-2.5 hover:bg-gray-900 transition-colors tracking-widest text-[10px]"
            >
              Get Started
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-2">Dashboard</h1>
            <p className="text-xs text-gray-400 font-bold tracking-[0.2em] uppercase">Precise Digital Coordinates</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-3 bg-gray-200 text-black text-[10px] font-bold tracking-widest uppercase hover:bg-gray-300 transition-colors">
              View All
            </button>
            <button onClick={() => navigate(ROUTES.HOME)} className="px-6 py-3 bg-black text-white text-[10px] font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors flex items-center gap-2">
              <span className="text-sm leading-none">+</span> Create New
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 bg-white border border-gray-200 mb-12 shadow-sm">
          {/* Stat 1 */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between">
            <h3 className="text-[10px] text-gray-400 font-bold tracking-[0.15em] uppercase mb-4">Total Clicks</h3>
            <div className="text-5xl font-black tracking-tighter mb-4">{formatNumber(totalClicks)}</div>
            <div className="flex items-center gap-2 text-xs font-bold text-black border-t border-gray-100 pt-3">
              <TrendingUp className="w-3 h-3" />
              <span>+12% vs LY</span>
            </div>
          </div>
          
          {/* Stat 2 */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between">
            <h3 className="text-[10px] text-gray-400 font-bold tracking-[0.15em] uppercase mb-4">Active Links</h3>
            <div className="text-5xl font-black tracking-tighter mb-4">{formatNumber(activeLinks)}</div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 border-t border-gray-100 pt-3">
              <Activity className="w-3 h-3" />
              <span>Stable</span>
            </div>
          </div>
          
          {/* Stat 3 */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between">
            <h3 className="text-[10px] text-gray-400 font-bold tracking-[0.15em] uppercase mb-4">Top Source</h3>
            <div className="text-5xl font-black tracking-tighter mb-4">Twitter</div>
            <div className="flex items-center gap-2 text-xs font-bold text-black border-t border-gray-100 pt-3">
              <Share2 className="w-3 h-3" />
              <span>42% Traffic</span>
            </div>
          </div>
          
          {/* Stat 4 */}
          <div className="p-8 flex flex-col justify-between">
             <h3 className="text-[10px] text-gray-400 font-bold tracking-[0.15em] uppercase mb-4">Avg CTR</h3>
            <div className="text-5xl font-black tracking-tighter mb-4">4.2%</div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 border-t border-gray-100 pt-3">
              <TrendingDown className="w-3 h-3" />
              <span>-0.4%</span>
            </div>
          </div>
        </div>

        {/* Recent Coordinates Table */}
        <div className="bg-white border border-gray-200 mb-12 shadow-sm">
          <div className="flex items-center justify-between p-6 md:px-8 md:py-6 border-b border-gray-200">
            <h2 className="text-base font-black tracking-widest uppercase">Recent Coordinates</h2>
            <div className="flex items-center gap-4 text-gray-400">
              <Search className="w-4 h-4 hover:text-black cursor-pointer transition-colors" />
              <Filter className="w-4 h-4 hover:text-black cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fcfcfc] border-b border-gray-200">
                  <th className="py-4 px-8 text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase whitespace-nowrap">Original Name</th>
                  <th className="py-4 px-8 text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase whitespace-nowrap">Shortened URL</th>
                  <th className="py-4 px-8 text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase whitespace-nowrap text-right">Clicks</th>
                  <th className="py-4 px-8 text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase whitespace-nowrap text-center">Activity</th>
                  <th className="py-4 px-8 text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase whitespace-nowrap text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-xs font-bold tracking-widest text-gray-400 uppercase">
                      Loading...
                    </td>
                  </tr>
                ) : history.length > 0 ? (
                  history.map((item, idx) => (
                    <tr key={item._id || idx} className="border-b border-gray-100 hover:bg-[#fbfbfb] transition-colors group">
                      <td className="py-4 px-8 max-w-50 md:max-w-75">
                        <div className="font-bold text-sm text-black truncate mb-1">
                          {item.redirectURL?.replace(/^https?:\/\//, '').split('/')[0] || 'Unknown'}
                        </div>
                        <div className="text-[10px] text-gray-400 truncate">
                          {item.redirectURL?.replace(/^https?:\/\//, '') || 'Unknown'}
                        </div>
                      </td>
                      <td className="py-4 px-8 text-sm font-bold">
                        <a href={`${window.location.origin}/${item.shortURL}`} target="_blank" rel="noreferrer" className="hover:underline">
                          links.co/{item.shortURL}
                        </a>
                      </td>
                      <td className="py-4 px-8 text-sm font-black text-right">
                        {item.clicks?.toLocaleString() || '0'}
                      </td>
                      <td className="py-4 px-8">
                        <div className="flex justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                           <Sparkline />
                        </div>
                      </td>
                      <td className="py-4 px-8 text-center text-gray-400 flex justify-center gap-2">
                         <button className="hover:text-black transition-colors p-1" title="Options">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-xs font-bold tracking-widest text-gray-400 uppercase">
                      No coordinates found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-6 px-8 border-t border-gray-200">
            <div className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase">
              Showing All {history.length} Links
            </div>
            <div className="flex items-center gap-6 text-[10px] font-bold tracking-[0.15em] uppercase">
              <button className="text-gray-400 hover:text-black transition-colors flex items-center gap-2 disabled:opacity-50">
                <ChevronLeft className="w-3 h-3" /> Previous
              </button>
              <button className="text-gray-400 hover:text-black transition-colors flex items-center gap-2 disabled:opacity-50">
                Next <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-200 pt-12">
          
          {/* Heatmap Area */}
          <div>
            <h2 className="text-sm font-black tracking-widest uppercase mb-6">Global Heatmap</h2>
            <div className="w-full aspect-4/3 md:aspect-video bg-[#EFEFEF] rounded border border-gray-200 relative overflow-hidden flex items-center justify-center">
               {/* Decorative dots to simulate map */}
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               
               {/* Mock Card overlay */}
               <div className="absolute top-8 left-8 bg-black text-white p-4 shadow-2xl z-10 border border-gray-800">
                  <p className="text-[8px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">Peak Performance</p>
                  <p className="text-sm font-bold">North America</p>
               </div>
               
               {/* Map pins */}
               <div className="absolute top-1/3 left-1/3 text-black"><MapPin size={16} fill="black" stroke="white" /></div>
               <div className="absolute top-1/2 left-1/4 text-black opacity-30"><MapPin size={12} fill="black" stroke="white" /></div>
               <div className="absolute bottom-1/3 right-1/4 text-black"><MapPin size={16} fill="black" stroke="white" /></div>
               <div className="absolute top-1/4 right-1/3 text-black opacity-50"><MapPin size={14} fill="black" stroke="white" /></div>
            </div>
          </div>

          {/* System Logs */}
          <div>
            <h2 className="text-sm font-black tracking-widest uppercase mb-6">System Logs</h2>
            <div className="flex flex-col gap-3">
              
              <div className="bg-[#f4f4f4] p-5 flex items-start justify-between border-l-2 border-black group hover:bg-[#eaeaea] transition-colors cursor-pointer">
                <div>
                  <h4 className="text-sm font-bold text-black mb-1">New Link Created</h4>
                  <p className="text-[10px] font-medium text-gray-500">By team_admin • 2 mins ago</p>
                </div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mt-1">#COORD-8291</div>
              </div>

              <div className="bg-[#f9f9f9] p-5 flex items-start justify-between border-l-2 border-transparent hover:border-gray-300 group hover:bg-[#eaeaea] transition-colors cursor-pointer">
                <div>
                  <h4 className="text-sm font-bold text-black mb-1">Traffic Spike Detected</h4>
                  <p className="text-[10px] font-medium text-gray-500">Source: LinkedIn • 15 mins ago</p>
                </div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mt-1">#ANALYTIC-102</div>
              </div>

              <div className="bg-[#f9f9f9] p-5 flex items-start justify-between border-l-2 border-transparent hover:border-gray-300 group hover:bg-[#eaeaea] transition-colors cursor-pointer">
                <div>
                  <h4 className="text-sm font-bold text-black mb-1">API Key Rotated</h4>
                  <p className="text-[10px] font-medium text-gray-500">Security Protocol • 1 hour ago</p>
                </div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mt-1">#SYSTEM-44</div>
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-lg font-black tracking-tighter uppercase">Links</div>
          <div className="flex items-center gap-8 text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">
             <a href="#" className="hover:text-black transition-colors">Privacy</a>
             <a href="#" className="hover:text-black transition-colors">Terms</a>
             <a href="#" className="hover:text-black transition-colors">API</a>
             <a href="#" className="hover:text-black transition-colors">Status</a>
          </div>
          <div className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">
            © 2024 Links Monolith. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default History;
