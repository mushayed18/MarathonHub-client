import { useEffect, useState } from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
import "animate.css";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const App = () => {
  return (
    <div className="font-poppins min-h-screen bg-slate-100 text-black dark:bg-gray-900 dark:text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <Header></Header>
      <div className="lg:max-w-[1440px] mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;
