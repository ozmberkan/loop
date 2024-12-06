import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
