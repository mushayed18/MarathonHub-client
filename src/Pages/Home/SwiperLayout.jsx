import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "animate.css";

import { Autoplay, EffectFade } from "swiper/modules";

import { useState } from "react";

import business from "../../assets/marathon1.jpg";
import coding from "../../assets/marathon2.png";
import creative from "../../assets/marathon3.jpg";
import donate from "../../assets/marathon4.png";
import HomeButtons from "./HomeButtons";

const SwiperLayout = () => {
  const [activeSlide, setActiveSlide] = useState(0); 

  const handleSlideChange = (swiper) => {
    const activeSlideIndex = swiper.activeIndex;
    setActiveSlide(activeSlideIndex); 
  };

  return (
    <div className="w-full mx-auto h-[37rem] mt-14">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        effect="fade"
        modules={[Autoplay, EffectFade]}
        onSlideChange={handleSlideChange}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            className="w-full h-[37rem] object-cover"
            src={business}
            alt="Business Marathon"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <h2
              className={`text-gray-400 text-5xl md:text-8xl font-bold text-center px-4 animate__animated ${
                activeSlide === 0 ? "animate__fadeInDown" : ""
              }`}
            >
              Run for a Cause
            </h2>
            <div
              className={`home-btn animate__animated ${
                activeSlide === 0 ? "animate__fadeInUp" : ""
              }`}
            >
              <HomeButtons />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-[37rem] object-cover"
            src={coding}
            alt="Coding Marathon"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <h2
              className={`text-gray-400 text-5xl md:text-8xl font-bold text-center px-4 animate__animated ${
                activeSlide === 1 ? "animate__fadeInDown" : ""
              }`}
            >
              Unite Through Fitness
            </h2>
            <div
              className={`home-btn animate__animated ${
                activeSlide === 1 ? "animate__fadeInUp" : ""
              }`}
            >
              <HomeButtons />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-[37rem] object-cover"
            src={creative}
            alt="Creative Marathon"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <h2
              className={`text-gray-400 text-5xl md:text-8xl font-bold text-center px-4 animate__animated ${
                activeSlide === 2 ? "animate__fadeInDown" : ""
              }`}
            >
              Achieve the Impossible
            </h2>
            <div
              className={`home-btn animate__animated ${
                activeSlide === 2 ? "animate__fadeInUp" : ""
              }`}
            >
              <HomeButtons />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-[37rem] object-cover"
            src={donate}
            alt="Donate Marathon"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <h2
              className={`text-gray-400 text-5xl md:text-8xl font-bold text-center px-4 animate__animated ${
                activeSlide === 3 ? "animate__fadeInDown" : ""
              }`}
            >
              Step Into a Better Tomorrow
            </h2>
            <div
              className={`home-btn animate__animated ${
                activeSlide === 3 ? "animate__fadeInUp" : ""
              }`}
            >
              <HomeButtons />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperLayout;
