import { useEffect, useState } from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div className="font-poppins min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default App;
