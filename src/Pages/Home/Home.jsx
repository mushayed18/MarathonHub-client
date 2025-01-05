import { Helmet } from "react-helmet-async";
import SwiperLayout from "./SwiperLayout";
import RandomMarathons from "./RandomMarathons";
import UpcomingMarathons from "./UpcomingMarathons";
import UserExperience from "./UserExperience";
import Partnership from "./Partnership";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Marathon Hub</title>
      </Helmet>
      <SwiperLayout />
      <RandomMarathons />
      <UpcomingMarathons />
      <UserExperience />
      <Partnership />
    </div>
  );
};

export default Home;
