import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Shield, PenTool } from 'lucide-react';
import UserServices from '../Services/UserServices';
import { AuthContext } from '../Context/AuthContext';
import { ROUTES } from '../constants';
import { validators } from '../utils/validators';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [link, setLink] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const shortLink = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setShortUrl('');

    if (!link) {
      setError('Please enter a URL to proceed.');
      return;
    }

    if (!validators.isValidUrl(link)) {
      setError('Please enter a valid URL.');
      return;
    }

    if (!isLoggedIn) {
      navigate(ROUTES.LOGIN);
      return;
    }

    setIsLoading(true);
    try {
      const response = await UserServices.fetchUrl(link);
      if (response) {
        setShortUrl(response);
        setSuccessMsg('URL shortened successfully!');
        setLink('');
      }
    } catch (err) {
      setError('Failed to shorten url.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="w-full h-24 flex items-center justify-between px-8 bg-white border-b border-gray-100 z-50 sticky top-0">
        <div className="text-2xl font-black tracking-tighter cursor-pointer" onClick={() => navigate(ROUTES.HOME)}>
          ZURL
        </div>
        <div className="hidden md:flex items-center gap-10 text-xs font-bold tracking-widest text-gray-500 uppercase">
          <a href="#features" className="hover:text-black transition-colors">Features</a>
          <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
          <button onClick={() => navigate(ROUTES.LOGIN)} className="hover:text-black transition-colors">Login</button>
          <button
            onClick={() => navigate(ROUTES.REGISTER)}
            className="bg-black text-white px-8 py-3 hover:bg-gray-900 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-32 pb-40 px-4">
        <h1 className="text-6xl md:text-[8rem] leading-[0.85] font-black text-center tracking-tighter mb-16 text-black uppercase">
          Shorten<br />Your Reach
        </h1>

        <form onSubmit={shortLink} className="w-full max-w-4xl flex flex-col md:flex-row relative shadow-2xl shadow-gray-200">
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="PASTE YOUR LONG URL HERE..."
            className="w-full h-20 px-8 text-sm md:text-base tracking-widest uppercase bg-white text-black outline-none placeholder:text-gray-400 font-bold"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="h-20 px-16 bg-black text-white text-sm md:text-base font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors disabled:bg-gray-400 whitespace-nowrap"
          >
            {isLoading ? 'WORKING...' : 'SHORTEN'}
          </button>
        </form>

        {error && <p className="mt-6 text-red-500 font-bold text-sm tracking-widest">{error}</p>}
        {successMsg && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-emerald-500 font-bold text-sm tracking-widest">{successMsg}</p>
            <div className="bg-white px-6 py-4 border border-gray-200 shadow-sm flex items-center gap-4">
              <span className="font-medium text-black">{shortUrl}</span>
              <button
                onClick={() => navigator.clipboard.writeText(shortUrl)}
                className="text-xs bg-black text-white px-3 py-1 font-bold uppercase tracking-wider"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        <p className="mt-12 text-[10px] tracking-[0.2em] font-bold text-gray-400 uppercase">
          Trusted by over 10m+ users globally
        </p>
      </section>

      {/* Features Grid */}
      <section id="features" className="w-full max-w-7xl mx-auto px-4 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:h-[500px]">

          {/* Card 1: Analytics */}
          <div className="md:col-span-8 bg-white p-12 flex flex-col justify-between group">
            <div className="flex justify-between items-start text-gray-400 font-bold text-xs tracking-[0.2em] uppercase">
              <span>01 / Analytics</span>
              <Activity className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-20 md:mt-0">
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 uppercase">Real-Time Precision.</h3>
              <p className="text-gray-500 font-medium max-w-md text-sm leading-relaxed">
                Track every click, location, and device with architectural precision. Our dashboard offers a surgical view of your digital footprint.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-1 h-full">
            {/* Card 2: Security */}
            <div className="bg-black p-10 flex flex-col justify-between flex-1 group">
              <div className="flex justify-between items-start text-gray-500 font-bold text-xs tracking-[0.2em] uppercase">
                <span>02 / Security</span>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-3xl font-black tracking-tighter text-white mb-4 uppercase">Fortified Links.</h3>
                <p className="text-gray-400 font-medium text-xs leading-relaxed mb-8">
                  Enterprise-grade encryption for every redirect. Your data stays yours, indefinitely.
                </p>
                <Shield className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-1 mt-1 md:h-[400px]">
          {/* Card 3: Brand */}
          <div className="md:col-span-5 bg-[#e5e5e5] p-12 flex flex-col items-center justify-center text-center group">
            <PenTool className="w-8 h-8 text-black mb-8 group-hover:-rotate-12 transition-transform" />
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 uppercase">Brand Authority.</h3>
            <p className="text-gray-500 font-medium max-w-sm text-sm leading-relaxed">
              Custom domains that transform a simple redirect into a brand statement.
            </p>
          </div>

          {/* Card 4: Abstract Visual */}
          <div className="md:col-span-7 bg-black relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-50" />
            <div className="absolute -inset-24 bg-white/5 rotate-12 translate-y-1/4 group-hover:translate-y-0 transition-transform duration-1000 blur-3xl rounded-full" />
            <div className="absolute -inset-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
            {/* Minimalist geometry */}
            <div className="absolute right-0 top-0 w-3/4 h-full bg-gradient-to-l from-white/10 to-transparent -skew-x-12 translate-x-32 group-hover:translate-x-16 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="bg-white w-full py-40 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-32 border-b border-black pb-12">
            <h2 className="text-6xl md:text-[6rem] leading-none font-black tracking-tighter uppercase">
              The Workflow.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <div className="relative">
              <span className="absolute -top-24 -left-8 text-[12rem] font-black text-gray-50 opacity-50 select-none">1</span>
              <h4 className="text-2xl font-black tracking-tighter mb-6 relative z-10 uppercase">Capture</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium relative z-10">
                Paste any destination URL into our monolith input. No length is too great, no parameter too complex.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -top-24 -left-8 text-[12rem] font-black text-gray-50 opacity-50 select-none">2</span>
              <h4 className="text-2xl font-black tracking-tighter mb-6 relative z-10 uppercase">Transform</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium relative z-10">
                Our engine condenses the digital coordinate into a sharp, branded 'ZURL' address instantly.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -top-24 -left-8 text-[12rem] font-black text-gray-50 opacity-50 select-none">3</span>
              <h4 className="text-2xl font-black tracking-tighter mb-6 relative z-10 uppercase">Monitor</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium relative z-10">
                Distribute your new link and watch the engagement flow through our high-contrast analytics suite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-black text-white w-full py-40 flex flex-col items-center justify-center px-4">
        <h2 className="text-5xl md:text-[7rem] leading-[0.9] font-black text-center tracking-tighter mb-16 uppercase">
          Join the Monolith.
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <button
            onClick={() => navigate(ROUTES.REGISTER)}
            className="bg-white text-black px-12 py-5 font-bold text-sm tracking-widest hover:bg-gray-200 transition-colors uppercase"
          >
            Get Started Now
          </button>
          <button className="bg-transparent border border-white text-white px-12 py-5 font-bold text-sm tracking-widest hover:bg-white/10 transition-colors uppercase">
            View Pricing
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white h-24 flex flex-col md:flex-row items-center justify-between px-8 border-t border-gray-100 text-xs font-bold tracking-widest text-gray-400">
        <div className="text-black font-black text-lg tracking-tighter mb-4 md:mb-0 uppercase">ZURL</div>
        <div className="flex flex-wrap justify-center gap-8 mb-4 md:mb-0 uppercase">
          <a href="#" className="hover:text-black transition-colors">Privacy</a>
          <a href="#" className="hover:text-black transition-colors">Terms</a>
          <a href="#" className="hover:text-black transition-colors">API</a>
          <a href="#" className="hover:text-black transition-colors">Status</a>
        </div>
        <div className="uppercase">
          © 2024 ZURL. ALL RIGHTS RESERVED.
        </div>
      </footer>

    </div>
  );
};

export default Dashboard;

