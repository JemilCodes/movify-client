import React from "react";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Details = ({ showQuery, noMovie, setRoute, currentMovie }) => {
  return (
    <div
      onClick={() => setRoute("home")}
      className={`w-full lg:w-[80%] min-h-[200px] rounded-lg  flex flex-col gap-4 p-2 bg-transparent queryCont niceBorder ${
        showQuery && "z-[-1]"
      }`}
    >
      <div className=" flex justify-between items-center">
        <p className=" text-lg  text-white">Movie Details..</p>
        <div
          onClick={() => setRoute("home")}
          className=" rounded-full p-1 center bg-white"
        >
          <MdKeyboardDoubleArrowRight className=" cursor-pointer w-[20px] h-[20px]" />
        </div>
      </div>
      <div className=" flex flex-wrap gap-4 items-center">
        {/* items */}
        {Object.entries(currentMovie).map(([key, value]) => {
          if (
            key === "Plot" ||
            key === "Poster" ||
            key === "Ratings" ||
            (key === "Ratings" && typeof value !== "string")
          ) {
            return null; // Skip rendering for Plot, Ratings, or non-string Ratings
          }

          return (
            <div key={key} className="flex flex-col gap-1">
              <p className="text-white text-base">{key}</p>
              <div
                className={`text-white text-sm p-2 pl-4 pr-4 center niceBorder rounded-lg min-h-8 ${
                  noMovie && "skeleton-loader"
                }`}
              >
                {value}
              </div>
            </div>
          );
        })}
      </div>
      <div className=" flex flex-1 flex-col gap-1">
        <p className=" text-white text-lg">Description of the movie</p>
        <div
          className={`w-full flex flex-1 rounded-lg niceBorder text-white text-base p-2 ${
            noMovie && "skeleton-loader"
          }`}
        >
          {currentMovie?.Plot}
        </div>
      </div>
    </div>
  );
};

export default Details;
