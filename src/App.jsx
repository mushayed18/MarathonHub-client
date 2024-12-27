import { useEffect, useState } from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="font-poppins min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Toaster position="top-center" reverseOrder={false} />
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  );
};

export default App;
