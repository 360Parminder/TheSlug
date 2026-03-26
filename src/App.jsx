import { Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ErrorPage from './Components/ErrorPage';
import History from './Pages/History';
import { ROUTES } from './constants';


const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Dashboard />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.HISTORY} element={<History />} />
      <Route path={ROUTES.NOT_FOUND} element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
