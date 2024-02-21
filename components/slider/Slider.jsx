"use client";
import { Grandstander} from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "./styles.css";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Button } from "@mui/material";
import Image from "next/image";

const grandstander = Grandstander({
  subsets: ["latin"],
  weight: ['400' , '100'], 
});


const Slider = () => {
  return (
    <div className={grandstander.className}>
      <Swiper
        spaceBetween={5}
        modules={[Pagination, Autoplay, Navigation]}
        navigation  
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
    <p className="texto">Where Every Bite <br />is a Sweet Journey.<br />
   <span className="parrafo"> Welcome to our sweet haven, where every cookie is a masterpiece of flavor and craftsmanship. At our online store, you'll find a 
    tempting selection of homemade cookies, each one crafted with care and the finest ingredients</span> 

    </p>     
    
         <Image src="/slider/slide1.jpg" alt="slider" width={1772}  height={886}/>
        </SwiperSlide>

         <SwiperSlide>
        <p className="texto">Baked with Love,<br />Enjoyed with a Smile.<br />
        <span className="parrafo"> Welcome to our sweet haven, where every cookie is a masterpiece of flavor and craftsmanship. At our online store, you'll find a 
    tempting selection of homemade cookies, each one crafted with care and the finest ingredients</span>  </p>
         <Image src="/slider/slide3.jpg" alt="slider" width={1772}  height={886}/>
        </SwiperSlide>

       <SwiperSlide>
        <p className="texto">Every Number Count <br />with Sweetness.<br />
        <span className="parrafo"> Welcome to our sweet haven, where every cookie is a masterpiece of flavor and craftsmanship. At our online store, you'll find a 
    tempting selection of homemade cookies, each one crafted with care and the finest ingredients</span> </p>
        <Image src="/slider/galletasMix.jpg" alt="slider" width={1772}  height={886}/>
        </SwiperSlide> 
    


      </Swiper>
    </div>
  );
};

export default Slider;
