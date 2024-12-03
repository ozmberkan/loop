import React from "react";
import { Outlet } from "react-router-dom";
import Rightbar from "~/components/Rightbar/Rightbar";
import Sidebar from "~/components/Sidebar/Sidebar";
import Container from "~/containers/Container";

const Layout = () => {
  return (
    <Container>
      <Sidebar />
      <Outlet />
      <Rightbar />
    </Container>
  );
};

export default Layout;
