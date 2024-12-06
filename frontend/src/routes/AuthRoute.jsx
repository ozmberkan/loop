import AuthLayout from "~/layouts/AuthLayout";
import Forgot from "~/pages/Auth/Forgot";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";
import ResetPassword from "~/pages/Auth/Reset";

export const AuthRoute = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <Forgot /> },
    { path: "/reset-password", element: <ResetPassword /> },
  ],
};
