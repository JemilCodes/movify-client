import React, { useEffect, useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./styles.css";

// import required modules
import { EffectCards } from "swiper/modules";
import axios from "axios";
import { baseUrl } from "../network/baseUrl";

export default function App({
  searchResult,
  setCurrentMovie,
  setFeedback,
  setRoute,
}) {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Check if searchResult is available and swiperRef is initialized
    if (searchResult.length > 0 && swiperRef.current) {
      const initialIndex = Math.floor(searchResult.length / 2);
      swiperRef.current.slideTo(initialIndex);
    }
  }, [searchResult]);

  const handleSwiperInit = (swiper) => {
    swiperRef.current = swiper;
  };

  const handleDetails = async (payload) => {
    setFeedback("Checking...");
    try {
      const data = await axios.post(`${baseUrl}/getSingle`, {
        Title: searchResult[payload].Title,
      });
      setFeedback("Here are your search result");
      setCurrentMovie(data.data);
      setRoute("details");
    } catch (error) {
      setRoute("details");
      setFeedback("Server is not responding, try again");
    }
  };

  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper cursor-pointer"
        // onSlideChange={(data) => {
        //   handleDetails(data.activeIndex);
        // }}
        onSwiper={handleSwiperInit}
      >
        {searchResult.map((data, i) => {
          return (
            <SwiperSlide key={i}>
              <img
                src={`${data?.Poster}`}
                alt={`${data?.Title}`}
                className="w-full h-full"
                onClick={() => handleDetails(i)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
