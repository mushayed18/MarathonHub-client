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
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/add-marathon",
        element: <AddMarathon></AddMarathon>,
      },
      {
        path: "/marathons",
        element: <Marathons></Marathons>,
      },
      {
        path: "/marathons/:id",
        element: <MarathonDetails></MarathonDetails>,
      },
      {
        path: "/marathons/:id/register",
        element: <Registration></Registration>,
      },
      {
        path: "/my-apply-list",
        element: <MyApplyList></MyApplyList>,
      },
      {
        path: "/my-marathon-list",
        element: <MyMarathonList></MyMarathonList>,
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
