import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeRoute } from "./routes/HomeRoute";
import { AuthRoute } from "./routes/AuthRoute";
import "driver.js/dist/driver.css";

const App = () => {
  const router = createBrowserRouter([HomeRoute, AuthRoute]);

  return <RouterProvider router={router} />;
};

export default App;
