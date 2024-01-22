import React from "react";

import Swiper from "../../UI/SwiperComp";

const Home = ({
  noMovie,
  feedback,
  setFeedback,
  setCurrentMovie,
  searchResult,
  setRoute,
  showQuery,
  changeBanner,
}) => {
  if (document && document?.querySelector(".banner")) {
    document.querySelector(".banner").style.backgroundImage =
      "url('/banner.jpg')";
  }
  return (
    <div
      className={` relative rounded-lg w-full lg:w-[50%] flex flex-col gap-4 items-center swiperCont p-2 ${
        noMovie && "skeleton-loader"
      } ${showQuery && "!z-[-1]"} ${
        feedback === "Searching..." && "skeleton-loader"
      } ${feedback === "Checking..." && "skeleton-loader"}`}
    >
      <p className=" text-white text-2xl text-center font-extrabold">
        {feedback}
      </p>
      <Swiper
        searchResult={searchResult}
        setCurrentMovie={setCurrentMovie}
        setRoute={setRoute}
        setFeedback={setFeedback}
        changeBanner={changeBanner}
      />
    </div>
  );
};

export default Home;
