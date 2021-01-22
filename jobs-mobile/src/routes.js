import React, { useContext } from "react";
import { userContext } from "./contexts/UserContext";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import Splash from './pages/Splash';



const Routes = function(){
  const { signed, loading } = useContext(userContext);

  if(loading){
    return (
       <Splash />
      );
  };
  console.log('signed',signed);
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;