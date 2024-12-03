import { Outlet } from "react-router-dom";
import Rightbar from "~/components/Rightbar/Rightbar";
import Sidebar from "~/components/Sidebar/Sidebar";
import Container from "~/containers/Container";

const Layout = () => {
  return (
    <Container>
      <Sidebar />
      <div className="flex-1 ml-64 mr-80 overflow-y-auto ">
        <Outlet />
      </div>
      <Rightbar />
    </Container>
  );
};

export default Layout;
