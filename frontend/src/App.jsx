import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeRoute } from "./routes/HomeRoute";
import { AuthRoute } from "./routes/AuthRoute";
import "driver.js/dist/driver.css";
import "react-tooltip/dist/react-tooltip.css";

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserService());
  // }, []);

  const router = createBrowserRouter([HomeRoute, AuthRoute]);

  return <RouterProvider router={router} />;
};

export default App;
