import { useNavigate } from "react-router-dom";

import marathon1 from "../../assets/marathon1.jpg";
import marathon2 from "../../assets/marathon2.png";
import marathon3 from "../../assets/marathon3.jpg";
import marathon4 from "../../assets/marathon4.png";

const About = () => {
  const navigate = useNavigate();

  const handleExploreBtn = () => {
    navigate("/marathons");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-center pt-28">
      <h1 className="text-4xl font-bold mb-6 text-sky-500">About Us</h1>
      <p className="text-lg dark:text-white text-black leading-relaxed">
        MarathonHub is a platform designed to connect runners with marathon
        events worldwide. Whether you're a seasoned athlete or a first-time
        runner, MarathonHub makes it easy to find, register, and track marathon
        events.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mt-6 flex justify-center">
          <img
            src={marathon1}
            alt="Marathon event"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="mt-6 flex justify-center">
          <img
            src={marathon2}
            alt="Marathon event"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="mt-6 flex justify-center">
          <img
            src={marathon3}
            alt="Marathon event"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="mt-6 flex justify-center">
          <img
            src={marathon4}
            alt="Marathon event"
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
      <p className="mt-6 dark:text-white text-black text-lg">
        Our mission is to promote a healthy lifestyle and bring together a
        community of passionate runners. Join us and take on your next
        challenge!
      </p>
      <div className="mt-6">
        <button
          onClick={handleExploreBtn}
          className="btn bg-sky-500 text-black hover:bg-sky-300"
        >
          Explore Events
        </button>
      </div>
    </div>
  );
};

export default About;
