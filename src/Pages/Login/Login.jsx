import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signInUser, setUser, signInWithGoogle, loading, setLoading } =
    useContext(AuthContext);

  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setVisibility(!visibility);
  };

  const handleDemoUserBtn = async () => {
    try {
      setLoading(true);
      const result = await signInUser('virat18@gmail.com', 'Virat18');
      setUser(result.user);
      toast.success("Login successful!!", {
        style: {
          background: "#0EA5E9",
          color: "#FFFFFF",
        },
      });
      navigate("/");
    } catch (error) {
      toast.error("There is an error. Please try again!", {
        style: {
          background: "#0EA5E9",
          color: "#FFFFFF",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      const result = await signInUser(email, password);
      setUser(result.user);
      toast.success("Login successful!!", {
        style: {
          background: "#0EA5E9",
          color: "#FFFFFF",
        },
      });
      navigate("/");
    } catch (error) {
      toast.error("There is an error. Please try again!", {
        style: {
          background: "#0EA5E9",
          color: "#FFFFFF",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleBtn = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      setUser(result.user);
      toast.success("Login successful!", {
        style: {
          background: "#0EA5E9",
          color: "#FFFFFF",
        },
      });
      navigate("/");
    } catch (error) {
      toast.error("There is an error. Please try again!", {
        style: {
          background: "#0EA5E9",
          color: "#FFFFFF",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__fadeInDown flex flex-col md:flex-row justify-center w-11/12 mx-auto">
      <Helmet>
        <title>Login | Marathon Hub</title>
      </Helmet>
      <div className="bg-sky-500 md:w-2/5 lg:w-1/4 mt-28 md:mb-16 md:rounded-l-lg flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white py-4">Login now!</h1>
      </div>
      <div className="md:w-2/5 lg:w-1/4 p-6 md:rounded-r-lg shadow-2xl md:mt-28 mb-16 backdrop-blur-2xl dark:bg-white/30 bg-slate-200">
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
              type="button"
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

          <button
            type="submit"
            className={`btn btn-sm btn-outline rounded-none dark:text-white text-black w-full ${
              loading ? "cursor-not-allowed" : "hover:bg-sky-500"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center text-sky-500">
                Logging in...
                <span className="loading loading-spinner text-info"></span>
              </span>
            ) : (
              "Login"
            )}
          </button>

          <div className="divider divider-vertical">OR</div>
          <button
            type="button"
            onClick={handleGoogleBtn}
            className={`btn btn-sm btn-outline rounded-none dark:text-white text-black bg-none w-full ${
              loading ? "cursor-not-allowed" : "hover:bg-sky-500"
            }`}
          >
            Login with Google <FcGoogle size={20} />
          </button>

          <button
            type="button"
            onClick={handleDemoUserBtn}
            className={`btn btn-sm rounded-none text-black bg-sky-500 w-full ${
              loading ? "cursor-not-allowed" : "hover:bg-sky-300"
            }`}
          >
            Demo User
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
