import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const axiosInstance = axios.create({
  baseURL: "https://marathon-hub-server-two.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          signOutUser().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      }
    );
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;
