import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider/ThemeContext";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { MdArrowDropDown } from "react-icons/md";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOutUser, loading } = useContext(AuthContext);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navbar = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/">Marathons</NavLink>
      {/* {user && user?.email && <NavLink to="/">Dashboard</NavLink>} */}

      {user && user?.email && (
        <div className="relative inline-block">
          <button
            onClick={() => {
              toggleDropdown()
            }}
            className="flex items-center gap-1 hover:text-sky-500"
          >
            Dashboard
            <span className={isDropdownOpen ? "rotate-0" : "-rotate-90"}>
              <MdArrowDropDown />
            </span>
          </button>
          {isDropdownOpen && (
            <div
              className={`fixed shadow-lg z-50 transform transition-transform duration-300 backdrop-blur-lg bg-white/30 text-black`}
            >
              <NavLink
                to="/add-marathon"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Add Marathon
              </NavLink>
              <NavLink
                to="/"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                My Marathon List
              </NavLink>
              <NavLink
                to="/"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                My Apply List
              </NavLink>
            </div>
          )}
        </div>
      )}
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

        {(user && user?.email) || loading === true ? (
          <div className="flex gap-2 items-center">
            <div>
              <button
                onClick={toggleTheme}
                className="p-2 text-2xl text-sky-500"
              >
                {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
              </button>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="user"
                    src={user?.photoURL}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content rounded-lg z-[1]"
              >
                <button
                  onClick={signOutUser}
                  className="btn bg-sky-500 text-black hover:bg-sky-300"
                >
                  logout
                </button>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <button
              onClick={handleLogin}
              className="btn btn-sm bg-sky-500 text-black hover:bg-sky-300"
            >
              Login
            </button>
            <span className="text-my-red hidden md:block">/</span>
            <span className="hidden md:block">
              <button
                onClick={handleRegister}
                className="btn btn-sm bg-sky-500 text-black hover:bg-sky-300"
              >
                Register
              </button>
            </span>

            <div>
              <button
                onClick={toggleTheme}
                className="p-2 text-2xl text-sky-500"
              >
                {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
              </button>
            </div>
          </div>
        )}

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
