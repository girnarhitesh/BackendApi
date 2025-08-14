import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules'; // Import Autoplay module

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import './Hero.css';
// No specific CSS import is needed for Autoplay

function Hero() {
    return (
        <div>
            <Swiper
                navigation={true}
                modules={[Navigation, Autoplay]} // Add Autoplay to the modules array
                autoplay={{
                    delay: 2500, // Slides will change every 2.5 seconds
                    disableOnInteraction: false, // Autoplay won't stop when the user interacts with the slider
                }}
                className="mySwiper"
            >
                <SwiperSlide><img src='https://images-eu.ssl-images-amazon.com/images/G/31/IMG25/Home/2025/BAU/GW/Aug/MHS/Mega_home_sale_BAU_PC_-_Laundry_essentials._CB803648198_.jpg' /></SwiperSlide>
                <SwiperSlide><img src='https://images-eu.ssl-images-amazon.com/images/G/31/2025/Auto/Gateway/August/3000x1200-Car--bike-cleaning-GW-BAU-PC._CB803856060_.jpg' /></SwiperSlide>
                <SwiperSlide><img src='https://images-eu.ssl-images-amazon.com/images/G/31/img21/APAY/MAYART/travel/Flight_PC-Hero-Template_GW-VX_3000x1200._CB795825459_.jpg' /></SwiperSlide>
                <SwiperSlide><img src='https://m.media-amazon.com/images/I/81R1JFIvf6L._SX3000_.jpg' /></SwiperSlide>
                <SwiperSlide><img src='https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/Aug25UBS/af_women_pc_2x_np._CB803818177_.png' /></SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Hero;