import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage.jsx";
import Home from "./Pages/Home/Home.jsx";
import ThemeProvider from "./ThemeProvider/ThemeContext.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import AddMarathon from "./Pages/AddMarathon/AddMarathon.jsx";
import Marathons from "./Pages/Marathons/Marathons.jsx";
import MarathonDetails from "./Pages/MarathonDetails/MarathonDetails.jsx";
import Registration from "./Pages/Registration/Registration.jsx";
import MyApplyList from "./Pages/MyApplyList/MyApplyList.jsx";
import MyMarathonList from "./Pages/MyMarathonList/MyMarathonList.jsx";
import { HelmetProvider } from "react-helmet-async";
import PrivateSign from "./PrivateRoute/PrivateSign.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import About from "./Pages/About/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/login",
        element: <PrivateSign><Login></Login></PrivateSign>,
      },
      {
        path: "/register",
        element: <PrivateSign><Register></Register></PrivateSign>,
      },
      {
        path: "/add-marathon",
        element: <PrivateRoute><AddMarathon></AddMarathon></PrivateRoute>,
      },
      {
        path: "/marathons",
        element: <Marathons></Marathons>,
      },
      {
        path: "/marathons/:id",
        element: <PrivateRoute><MarathonDetails></MarathonDetails></PrivateRoute>,
      },
      {
        path: "/marathons/:id/register",
        element: <PrivateRoute><Registration></Registration></PrivateRoute>,
      },
      {
        path: "/my-apply-list",
        element: <PrivateRoute><MyApplyList></MyApplyList></PrivateRoute>,
      },
      {
        path: "/my-marathon-list",
        element: <PrivateRoute><MyMarathonList></MyMarathonList></PrivateRoute>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>
);
