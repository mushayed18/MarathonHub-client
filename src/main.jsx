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
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
