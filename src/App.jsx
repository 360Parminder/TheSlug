import '@ionic/react/css/core.css';
import { setupIonicReact } from '@ionic/react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ErrorPage from './Components/ErrorPage';
import History from './Pages/History';
import './App.css';

setupIonicReact();

const App=()=>{
  
  return(
    <>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/history" element={<History />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
    </>
  )
}
export default App;