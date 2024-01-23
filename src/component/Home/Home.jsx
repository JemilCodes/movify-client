import React, { useState } from "react";

import Swiper from "../../UI/SwiperComp";
import { BsFillGridFill } from "react-icons/bs";
import { MdSwipeRight } from "react-icons/md";
import { baseUrl } from "../../network/baseUrl";

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
      "url('https://movify-api.onrender.com/banner.jpg')";
  }

  const [view, setView] = useState(true);

  const handleDetails = async (payload) => {
    setFeedback("Checking...");
    try {
      const data = await axios.post(`${baseUrl}/getSingle`, {
        Title: searchResult[payload].Title,
      });
      changeBanner(data?.data?.Poster);
      setFeedback("Here are your search result");
      setCurrentMovie(data?.data);
      setRoute("details");
    } catch (error) {
      setFeedback("Server is not responding, try again");
    }
  };

  return (
    <div
      className={` relative w-full flex lg:w-[50%] flex-col gap-3 items-center ${
        !view && "max-h-[350px]"
      } ${showQuery && "!z-[-1]"} `}
    >
      <div
        className={` relative ${
          !view && "overflow-y-scroll"
        } rounded-lg w-full  flex flex-col gap-4 items-center swiperCont p-2 ${
          noMovie && "skeleton-loader"
        }  ${feedback === "Searching..." && "skeleton-loader"} ${
          feedback === "Checking..." && "skeleton-loader"
        }`}
      >
        <p className=" text-white text-2xl text-center font-extrabold">
          {feedback}
        </p>
        {view && (
          <Swiper
            searchResult={searchResult}
            setCurrentMovie={setCurrentMovie}
            setRoute={setRoute}
            setFeedback={setFeedback}
            changeBanner={changeBanner}
          />
        )}
        {!view && (
          <div className=" grid sm:grid-cols-3 grid-cols-2 w-[90%] h-[90%] sm:gap-4">
            {searchResult.map((data, i) => {
              return (
                <div className=" flex flex-col items-center  gap-1" key={i}>
                  <img
                    src={`${data?.Poster}`}
                    alt={`${data?.Title}`}
                    className="w-[75%] h-[75%] cursor-pointer rounded-xl "
                    onClick={() => handleDetails(i)}
                  />
                  <p className=" line-clamp-1 w-[75%] text-base text-center font-bold text-white">
                    {data?.Title}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div
        onClick={() => setView((prev) => !prev)}
        className=" self-end max-w-[150px] gap-2 cursor-pointer h-9 flex items-center justify-between"
      >
        <p className=" text-white">Change View to</p>
        {view && <BsFillGridFill className=" text-white" />}
        {!view && <MdSwipeRight className=" text-white" />}
      </div>
    </div>
  );
};

export default Home;
