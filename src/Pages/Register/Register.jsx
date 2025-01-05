// import { NavLink, useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { useContext, useState } from "react";
// import { IoEyeOutline } from "react-icons/io5";
// import { FaRegEyeSlash } from "react-icons/fa6";
// import { AuthContext } from "../../AuthProvider/AuthProvider";

// const Register = () => {
//   const {
//     createUser,
//     user,
//     setUser,
//     updateUserProfile,
//     signInWithGoogle,
//     loading,
//   } = useContext(AuthContext);

//   const [visibility, setVisibility] = useState(false);

//   const [valid, setValid] = useState("");

//   const navigate = useNavigate();

//   const handleToggle = () => {
//     setVisibility(!visibility);
//   };

//   const handleGoogleBtn = () => {
//     signInWithGoogle().then((result) => {
//       setUser(result.user);
//       navigate("/");
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const name = e.target.name.value;
//     const email = e.target.email.value;
//     const photo = e.target.photo.value;
//     const password = e.target.password.value;

//     const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

//     if (!regex.test(password)) {
//       setValid(
//         "Password must be at least 6 characters long, include at least one uppercase letter, and one lowercase letter"
//       );
//       return;
//     }

//     createUser(email, password)
//       .then((result) => {
//         setUser(result.user);

//         const newUser = { name, email };

//         updateUserProfile({ displayName: name, photoURL: photo }).then(() => {
//           navigate("/");
//         });
//       })
//       .catch((error) => {
//         // Swal.fire({
//         //   icon: "error",
//         //   title: "Error",
//         //   text: "This email is already taken. Please try with different one.",
//         // });
//       });
//   };

//   return (
//     <div className="flex flex-col md:flex-row justify-center w-11/12 mx-auto">
//       <div className="bg-sky-500 md:w-2/5 lg:w-1/4 mt-28 md:mb-16 md:rounded-l-lg flex items-center justify-center">
//         <h1 className="text-3xl font-bold text-white py-4">Register now!</h1>
//       </div>
//       <div className="md:w-2/5 lg:w-1/4 p-6 md:rounded-r-lg shadow-2xl md:mt-28 mb-16 backdrop-blur-2xl dark:bg-white/30 bg-slate-200">
//         <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Full Name</label>
//             <input
//               name="name"
//               type="text"
//               id="name"
//               placeholder="Enter your full name"
//               className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Email Address</label>
//             <input
//               name="email"
//               type="email"
//               id="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Photo URL</label>
//             <input
//               name="photo"
//               type="text"
//               id="photo"
//               placeholder="Choose a photo URL"
//               className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
//               required
//             />
//           </div>

//           <div className="relative">
//             <label className="block text-sm font-medium">Password</label>
//             <input
//               name="password"
//               type={visibility ? "text" : "password"}
//               id="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
//               required
//             />
//             {valid && <p className="text-red-700 text-sm my-2">{valid}</p>}
//             <button
//               onClick={handleToggle}
//               className="absolute top-9 right-[1rem]"
//             >
//               {visibility ? (
//                 <IoEyeOutline size={20} />
//               ) : (
//                 <FaRegEyeSlash size={20} />
//               )}
//             </button>
//           </div>

//           <button className="btn btn-sm hover:bg-sky-500 w-full">{loading ? 'Wait a moment...' : 'Register'}</button>
//           <div className="divider divider-vertical">OR</div>
//           <button onClick={handleGoogleBtn} className="btn btn-sm w-full hover:bg-sky-500">
//             Sign up with Google <FcGoogle size={20} />
//           </button>
//         </form>
//         <p className="mt-4 text-sm text-center">
//           Already have an account?{" "}
//           <NavLink to="/login" className="text-sky-500">
//             Log in here
//           </NavLink>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, updateUserProfile, setUser, signInWithGoogle } =
    useContext(AuthContext);

  const [visibility, setVisibility] = useState(false);
  const [valid, setValid] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    setVisibility(!visibility);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!regex.test(password)) {
      setValid(
        "Password must be at least 6 characters long, include at least one uppercase letter, and one lowercase letter"
      );
      return;
    }

    try {
      setLocalLoading(true);
      const result = await createUser(email, password);
      const newUser = result.user;

      await updateUserProfile({
        displayName: name,
        photoURL: photo,
      });

      setUser(newUser);
      toast.success("User has been created successfully!", {
        style: {
          background: "#0EA5E9",
          color: "#FFFFFF",
        },
      });
      navigate("/");
    } catch (error) {
      toast.error("There is an error, please try again!", {
        style: {
          background: "#0EA5E9",
          color: "#FFFFFF",
        },
      });
      console.error("Error during registration:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleGoogleBtn = async () => {
    try {
      setLocalLoading(true);
      const result = await signInWithGoogle();
      setUser(result.user);
      toast.success("User has been created successfully!", {
        style: {
          background: "#0EA5E9",
          color: "#FFFFFF",
        },
      });
      navigate("/");
    } catch (error) {
      toast.error("There is an error, please try again!", {
        style: {
          background: "#0EA5E9",
          color: "#FFFFFF",
        },
      });
      console.error("Error during Google sign-in:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__fadeInUp flex flex-col md:flex-row justify-center w-11/12 mx-auto">
      <Helmet>
        <title>Sign up | Marathon Hub</title>
      </Helmet>
      <div className="bg-sky-500 md:w-2/5 lg:w-1/4 mt-28 md:mb-16 md:rounded-l-lg flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white py-4">Register now!</h1>
      </div>
      <div className="md:w-2/5 lg:w-1/4 p-6 md:rounded-r-lg shadow-2xl md:mt-28 mb-16 backdrop-blur-2xl dark:bg-white/30 bg-slate-200">
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Photo URL</label>
            <input
              name="photo"
              type="text"
              placeholder="Choose a photo URL"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium">Password</label>
            <input
              name="password"
              type={visibility ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-sky-500"
              required
            />
            {valid && <p className="text-red-700 text-sm my-2">{valid}</p>}
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

          <button type="submit" className="btn btn-sm hover:bg-sky-500 w-full">
            {localLoading ? (
              <span className="flex items-center justify-center text-sky-500 cursor-not-allowed">
                Wait a moment...
                <span className="loading loading-spinner text-info"></span>
              </span>
            ) : (
              "Register"
            )}
          </button>
          <div className="divider divider-vertical">OR</div>
          <button
            type="button"
            onClick={handleGoogleBtn}
            className={`btn btn-sm w-full hover:bg-sky-500 ${
              localLoading ? "cursor-not-allowed" : "hover:bg-sky-500"
            }`}
          >
            Sign up with Google <FcGoogle size={20} />
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <NavLink to="/login" className="text-sky-500">
            Log in here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
