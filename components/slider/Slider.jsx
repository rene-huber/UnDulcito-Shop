"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "./styles.css";
import { Pagination, Autoplay } from "swiper/modules";

const Slider = () => {
  return (
    <>
      <Swiper
        spaceBetween={5}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 15500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <p className="texto">Slide 1</p>
        <img src="/slider/g-1.jpg" alt="slider" />
        </SwiperSlide>

        <SwiperSlide>
        <img src="/slider/slide1.jpg" alt="slider" />
        </SwiperSlide>

    


      </Swiper>
    </>
  );
};

export default Slider;
