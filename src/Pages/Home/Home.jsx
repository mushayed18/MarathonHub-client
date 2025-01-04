import { Helmet } from "react-helmet-async";
import SwiperLayout from "./SwiperLayout";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Marathon Hub</title>
      </Helmet>
      Home page

      <SwiperLayout></SwiperLayout>
    </div>
  );
};

export default Home;
