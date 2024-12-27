import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider/ThemeContext";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { user, signOutUser, loading } = useContext(AuthContext);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const navbar = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/">Marathons</NavLink>
    </>
  );

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${
        theme === "dark" ? "bg-gray-800" : "bg-slate-200"
      }`}
    >
      <div className="w-11/12 mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div
            className="lg:hidden cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <RxCross1 size={24} /> : <FaBars size={24} />}
          </div>
          <div className="font-bold text-xl md:text-2xl">
            <span className="text-sky-500">Marathon Hub</span>
          </div>
        </div>

        <div className="lg:flex gap-8 font-semi tracking-wider hidden">
          {navbar}
        </div>

        {/* {user && user?.email || loading === true ? (
          <div className="flex gap-2 items-center">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="toggle toggle-error"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
            </label>
            <div
              className="w-10 h-10 rounded-full mr-1 cursor-pointer"
              data-tooltip-id="user-tooltip" 
            >
              <img
                className="w-full h-full object-cover rounded-full"
                src={user?.photoURL} 
                alt=""
              />
            </div>

            <Tooltip
              id="user-tooltip" 
              place="bottom-end" 
              effect="solid" 
              clickable 
              className="p-2" 
            >
              <div className="text-center">
                <p className="font-semibold">{user?.displayName}</p>
                <button
                  onClick={signOutUser}
                  className="btn bg-my-red text-my-gray"
                >
                  Log Out
                </button>
              </div>
            </Tooltip>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="toggle toggle-error"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
            </label>
            <NavLink to="/login">Login</NavLink>
            <span className="text-my-red hidden md:block">/</span>
            <span className="hidden md:block">
              <NavLink to="/register">Register</NavLink>
            </span>
          </div>
        )} */}

        <div>
          <button
            onClick={toggleTheme}
            className="p-2 text-2xl text-sky-500"
          >
            {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
          </button>
        </div>

        <div
          className={`fixed top-0 left-0 h-full shadow-lg z-50 transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 w-4/5 backdrop-blur-lg bg-white/30 text-black`}
        >
          <div className="pt-4 pl-5">
            <div className="flex items-center mb-6 gap-2">
              <div
                className="cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <RxCross1 size={24} />
              </div>
              <div className="font-bold text-xl md:text-2xl">
                <span className="text-sky-500">Marathon Hub</span>
              </div>
            </div>
            <nav
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex flex-col gap-4"
            >
              {navbar}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
