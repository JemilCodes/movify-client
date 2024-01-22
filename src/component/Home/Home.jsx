import React from "react";

import Swiper from "../../UI/SwiperComp";

const Home = ({
  noMovie,
  queriesdata,
  searched,
  setCurrentMovie,
  searchResult,
  setRoute,
  showQuery,
}) => {
  return (
    <div
      className={` relative rounded-lg w-full lg:w-[50%] flex flex-col gap-4 items-center swiperCont p-2 ${
        noMovie && "skeleton-loader"
      } ${showQuery && "!z-[-1]"}`}
    >
      <p className=" text-white text-2xl text-center font-extrabold">
        {!queriesdata
          ? "You have no search query"
          : searched
          ? "These are your search result"
          : noMovie
          ? "No movies to show"
          : "Movies from your last five searches"}
        {}
      </p>
      <Swiper
        searchResult={searchResult}
        setCurrentMovie={setCurrentMovie}
        setRoute={setRoute}
      />
    </div>
  );
};

export default Home;
