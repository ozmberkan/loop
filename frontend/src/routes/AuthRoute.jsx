import AuthLayout from "~/layouts/AuthLayout";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";

export const AuthRoute = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ],
};
