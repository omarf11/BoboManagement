
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/rootReducer";

interface PrivateRouteProps {
   children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
const user  = useAppSelector(state => state.userAuth.user);
  if (!user) {
    return <Navigate to = "/signin" replace/>
  }
  else{
    return <>{children}</>;  }
};

export default PrivateRoute;

