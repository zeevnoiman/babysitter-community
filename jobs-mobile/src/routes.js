import React, { useContext } from "react";

import userContext from "./contexts";

import AuthRoutes from "./routes/AuthRoutes";
import BabysitterRoutes from "./routes/BabysitterRoutes";
import FamilyRoutes from "./routes/FamilyRoutes";

import Splash from './pages/Splash';

const Routes = function(){
  const { signed, loading } = useContext(userContext);

  if(loading){
      return <Splash/>
  };
  
  return signed ? <FamilyRoutes /> : <AuthRoutes />;
};

export default Routes;