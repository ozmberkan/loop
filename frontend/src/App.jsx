import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeRoute } from "./routes/HomeRoute";
import "driver.js/dist/driver.css";

const App = () => {
  const router = createBrowserRouter([HomeRoute]);

  return <RouterProvider router={router} />;
};

export default App;
