import Layout from "~/layouts/Layout";
import BePro from "~/pages/BePro/BePro";
import Documents from "~/pages/Documents/Documents";
import Home from "~/pages/Home/Home";
import MyMessages from "~/pages/MyMessages/MyMessages";
import MyNotifications from "~/pages/MyNotifications/MyNotifications";
import MyAccount from "~/pages/MyAccount/MyAccount";

export const HomeRoute = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/my-account/:username", element: <MyAccount /> },
    { path: "/my-notifications", element: <MyNotifications /> },
    { path: "/my-messages", element: <MyMessages /> },
    { path: "/upgrade-to-pro", element: <BePro /> },
    { path: "/documents", element: <Documents /> },
  ],
};
