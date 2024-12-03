import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "~/components/Sidebar/Sidebar";
import Container from "~/containers/Container";

const Layout = () => {
  return (
    <Container>
      <Sidebar />
      <Outlet />
    </Container>
  );
};

export default Layout;
