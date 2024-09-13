import '@ionic/react/css/core.css';
import { setupIonicReact } from '@ionic/react';
import AppNavigation from "./Navigation/AppNavigation";

setupIonicReact();

const App=()=>{
  
  return(
    <>
    <AppNavigation/>
    </>
  )
}
export default App;