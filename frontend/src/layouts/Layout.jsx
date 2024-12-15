import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Rightbar from "~/components/Rightbar/Rightbar";
import Sidebar from "~/components/Sidebar/Sidebar";
import Container from "~/containers/Container";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Sidebar setIsOpen={setIsOpen} />
      <div className="flex-1 ml-72  overflow-y-auto">
        <Outlet />
      </div>
      <Rightbar isOpen={isOpen} />
      <Toaster />
    </Container>
  );
};

export default Layout;
