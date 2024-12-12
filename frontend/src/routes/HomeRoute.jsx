import Layout from "~/layouts/Layout";
import BePro from "~/pages/BePro/BePro";
import Documents from "~/pages/Documents/Documents";
import Home from "~/pages/Home/Home";
import MyMessages from "~/pages/MyMessages/MyMessages";
import MyNotifications from "~/pages/MyNotifications/MyNotifications";
import MyAccount from "~/pages/MyAccount/MyAccount";
import { roleLoader } from "~/loader/roleLoader";
import Profile from "~/pages/Profile/Profile";
import EditAccount from "~/pages/EditAccount/EditAccount";

export const HomeRoute = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <Home />,
      loader: () => roleLoader(["admin", "user"]),
    },
    {
      path: "/my-account/:username",
      element: <MyAccount />,
      loader: () => roleLoader(["admin", "user"]),
    },
    {
      path: "/my-notifications",
      element: <MyNotifications />,
      loader: () => roleLoader(["admin", "user"]),
    },
    {
      path: "/my-messages",
      element: <MyMessages />,
      loader: () => roleLoader(["admin", "user"]),
    },
    {
      path: "/upgrade-to-pro",
      element: <BePro />,
      loader: () => roleLoader(["admin", "user"]),
    },
    {
      path: "/edit-account",
      element: <EditAccount />,
      loader: () => roleLoader(["admin", "user"]),
    },
    {
      path: "/documents",
      element: <Documents />,
      loader: () => roleLoader(["admin", "user"]),
    },
    {
      path: "/profile/:id",
      element: <Profile />,
      loader: () => roleLoader(["admin", "user"]),
    },
  ],
};
