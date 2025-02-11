import { useNavigate } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";

import marathon1 from "../../assets/marathon1.jpg";
import marathon2 from "../../assets/marathon2.png";
import marathon3 from "../../assets/marathon3.jpg";
import marathon4 from "../../assets/marathon4.png";
import { MdOutlineMail } from "react-icons/md";

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
            className="rounded-lg shadow-lg h-56 w-full object-cover"
          />
        </div>
        <div className="mt-6 flex justify-center">
          <img
            src={marathon2}
            alt="Marathon event"
            className="rounded-lg shadow-lg h-56 w-full object-cover"
          />
        </div>
        <div className="mt-6 flex justify-center">
          <img
            src={marathon3}
            alt="Marathon event"
            className="rounded-lg shadow-lg h-56 w-full object-cover"
          />
        </div>
        <div className="mt-6 flex justify-center">
          <img
            src={marathon4}
            alt="Marathon event"
            className="rounded-lg shadow-lg h-56 w-full object-cover"
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

      <div className="border-2 rounded-lg flex flex-col md:flex-row my-20">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-sky-500">
          <h1 className="font-bold text-2xl text-black">Contact Us</h1>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center p-9 gap-6">
          <div className="flex items-center gap-4">
            <div className="border-2 h-12 w-12 rounded-full flex items-center justify-center text-sky-500">
              <FaPhoneAlt />
            </div>
            <p>0123456789</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="border-2 h-12 w-12 rounded-full flex items-center justify-center text-sky-500">
              <MdOutlineMail />
            </div>
            <p>marathonHub@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
