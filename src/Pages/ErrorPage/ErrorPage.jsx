import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import errorLottie from "../../assets/Lottie/Error-lottie.json"

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <Helmet>
        <title>Error | Marathon Hub</title>
      </Helmet>
      <div className="text-center">
        <div>
          <Lottie className="h-80" animationData={errorLottie}></Lottie>
        </div>
        <Link to="/">
          <p className="underline underline-offset-1">Go Back Home</p>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
