import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages";

const routes = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    }
]);

export default routes;