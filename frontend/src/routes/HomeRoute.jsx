import Layout from "~/layouts/Layout";
import Home from "~/pages/Home/Home";
import Profile from "~/pages/Profile/Profile";

export const HomeRoute = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/profile/:username", element: <Profile /> },
  ],
};
