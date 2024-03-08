import { createBrowserRouter } from "react-router-dom";
import { Home, Login, SignUp, VerifyEmail, Profile, AdminDashboard
 } from "../pages";
import PrivateResource from "./PrivateResources";


const routes = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <PrivateResource component={<Home />} />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/verify",
        element: <PrivateResource component={<VerifyEmail />} />,
    },
    {
        path: '/profile',
        element: <PrivateResource component={<Profile />} />,
    },
    {
        path: '/admin',
        element: <PrivateResource component={<AdminDashboard />} />,
    },
]);

export default routes;