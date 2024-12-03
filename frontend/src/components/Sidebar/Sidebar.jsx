import React from "react";
import { Link } from "react-router-dom";
import Logo from "~/assets/logo.svg";

const Sidebar = () => {
  return (
    <div className="w-44 p-3 flex items-start justify-start border-r">
      <Link to="/">
        <img src={Logo} className="w-20" />
      </Link>
    </div>
  );
};

export default Sidebar;
