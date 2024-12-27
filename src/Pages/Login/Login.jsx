import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Login = () => {
  const {
    createUser,
    user,
    setUser,
    updateUserProfile,
    signInWithGoogle,
    loading,
  } = useContext(AuthContext);

  const [visibility, setVisibility] = useState(false);

  const [valid, setValid] = useState("");

  const navigate = useNavigate();

  const handleToggle = () => {
    setVisibility(!visibility);
  };

  const handleGoogleBtn = () => {
    signInWithGoogle().then((result) => {
      setUser(result.user);
      navigate("/");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    createUser(email, password)
      .then((result) => {
        setUser(result.user);

        const newUser = { name, email };

        updateUserProfile({ displayName: name, photoURL: photo }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        // Swal.fire({
        //   icon: "error",
        //   title: "Error",
        //   text: "This email is already taken. Please try with different one.",
        // });
      });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center w-11/12 mx-auto">
      <div className="bg-sky-500 md:w-2/5 lg:w-1/4 mt-28 md:mb-16 md:rounded-l-lg flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white py-4">Login now!</h1>
      </div>
      <div className="md:w-2/5 lg:w-1/4 p-6 md:rounded-r-lg shadow-2xl md:mt-28 mb-16 backdrop-blur-2xl bg-white/30">
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium">Password</label>
            <input
              name="password"
              type={visibility ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              required
            />

            <button
              onClick={handleToggle}
              className="absolute top-9 right-[1rem]"
            >
              {visibility ? (
                <IoEyeOutline size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </button>
          </div>

          <button className="btn btn-sm hover:bg-sky-500 w-full">Login</button>
          <div className="divider divider-vertical">OR</div>
          <button onClick={handleGoogleBtn} className="btn btn-sm w-full hover:bg-sky-500">
            Login with Google <FcGoogle size={20} />
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          New to this website?{" "}
          <NavLink to="/register" className="text-sky-500">
            Register here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
