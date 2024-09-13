import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

import AuthRoutes from "../Routes/AuthRoutes";
import AppRoutes from "../Routes/AppRoutes";

const AppNavigation = () => {
  const { user, isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn ? <AppRoutes /> : <AuthRoutes />}
    </>
  );
};

export default AppNavigation;
