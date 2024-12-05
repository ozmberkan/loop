import Layout from "~/layouts/Layout";
import BePro from "~/pages/BePro/BePro";
import Documents from "~/pages/Documents/Documents";
import Home from "~/pages/Home/Home";
import MyMessages from "~/pages/MyMessages/MyMessages";
import MyNotifications from "~/pages/MyNotifications/MyNotifications";
import Profile from "~/pages/Profile/Profile";

export const HomeRoute = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/profile/:username", element: <Profile /> },
    { path: "/my-notifications", element: <MyNotifications /> },
    { path: "/my-messages", element: <MyMessages /> },
    { path: "/upgrade-to-pro", element: <BePro /> },
    { path: "/documents", element: <Documents /> },
  ],
};
