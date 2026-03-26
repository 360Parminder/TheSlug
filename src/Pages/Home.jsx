import Dashboard from './Dashboard';
import StartLoader from '../Components/Loaders/StartLoader';
import { useState } from 'react';

const Home=()=>{
  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 3000);
  return(
    <>
      {
        loader ? <StartLoader /> :
          (
            <div className="w-full min-h-screen bg-[#fafafa]">
              <Dashboard/>
            </div>
          )
      }
    </>
  );
};
export default Home;