import React, { useContext } from "react";

import userContext from "./contexts";

import AuthRoutes from "./routes/AuthRoutes";
import AppRoutes from "./routes/AppRoutes";

import Splash from './pages/Splash';

const Routes = function(){
  const { signed, loading } = useContext(userContext);

  if(loading){
      return <Splash/>
  };

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;