import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Rightbar from "~/components/Rightbar/Rightbar";
import Sidebar from "~/components/Sidebar/Sidebar";
import Container from "~/containers/Container";

const Layout = () => {
  return (
    <Container>
      <Sidebar />
      <div className="flex-1 ml-72  overflow-y-auto">
        <Outlet />
      </div>
      <Rightbar />
      <Toaster />
    </Container>
  );
};

export default Layout;
