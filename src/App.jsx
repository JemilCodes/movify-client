import "./App.css";

import React, { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "./network/baseUrl";
import Home from "./component/Home/Home";
import Details from "./component/MovieDetails/Details";

function App() {
  const [showQuery, setShowQuery] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentMovie, setCurrentMovie] = useState({});
  const [searched, setSearched] = useState(false);

  const [route, setRoute] = useState("home");

  let noMovie = searchResult.length === 0;

  //Getting the Last five queries
  let queriesdata = JSON.parse(localStorage.getItem("queries"));

  useEffect(() => {
    const getMovies = async () => {
      // Check if queriesdata is an array before trying to iterate
      if (!Array.isArray(queriesdata)) {
        // console.log("queriesdata is not an array");
        return;
      }

      // getting last five query result
      for (const queryResultItem of queriesdata) {
        try {
          const data = await axios.post(`${baseUrl}/search`, {
            query: queryResultItem,
          });
          setSearchResult((prev) => [...prev, ...data.data.Search]);
        } catch (error) {
          // Handle errors here
          console.error(error);
        }
      }
    };
    getMovies();
  }, []);

  function addToLatestQueries(newQueries) {
    // Check if queriesdata is an array before trying to use array methods
    if (!Array.isArray(queriesdata)) {
      console.error("queriesdata is not an array");
      return [];
    }

    // Remove the existing string if it already exists
    let queriesdataFiltered = queriesdata.filter((str) => str !== newQueries);

    // Add the new string to the beginning of the array
    queriesdataFiltered.unshift(newQueries);

    // Keep only the latest five strings
    if (queriesdataFiltered.length > 5) {
      queriesdataFiltered.pop();
    }
    return queriesdataFiltered;
  }

  const handleSearch = async (payload) => {
    setSearchResult([]);
    setSearchInput("");
    setShowQuery(false);
    localStorage.setItem(
      "queries",
      JSON.stringify(addToLatestQueries(payload))
    );
    const data = await axios.post(`${baseUrl}/search`, {
      query: payload,
    });
    setSearched(true);
    setSearchResult(data.data.Search);
  };

  return (
    <div
      // style={{
      //   background: `url(${currentMovie?.Poster}) no-repeat center/cover`,
      // }}
      className="banner w-full min-h-screen p-5 md:pl-10 md:pr-10 flex flex-col "
    >
      {/* Navbar */}
      <div className=" flex justify-between items-center top-0 left-0 right-0 sticky">
        {/* logo */}
        <h1 className=" hidden md:block text-white text-3xl font-extrabold logo">
          MOVIFY
        </h1>
        {/* searchbar Cont */}
        <div className=" relative w-full md:w-[40%]">
          {/* searchbar  */}
          <div className=" w-full h-10 rounded-2xl flex items-center justify-between gap-4 searchbar">
            <FaSearch className=" text-white w-7 h-7 lg:w-5 lg:h-5 ml-4" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onClick={() => setShowQuery((prev) => !prev)}
              placeholder="Search For Movies.."
              className=" w-full  h-full outline-none bg-transparent text-white text-lg placeholder:text-white"
            />
            <div
              onClick={() => {
                handleSearch(searchInput);
              }}
              className=" rounded-lg h-full w-[150px] text-white center niceBorder border-2 cursor-pointer"
            >
              Search
            </div>
          </div>
          {/* query list  */}
          {showQuery && (
            <div className="z-[100] w-full rounded-lg absolute top-[50px] flex flex-col gap-2 p-3 bg-transparent queryCont niceBorder">
              {queriesdata?.map((query) => {
                return (
                  <p
                    onClick={() => handleSearch(query)}
                    key={query}
                    className=" text-white text-lg cursor-pointer queryList p-2 rounded-xl"
                  >
                    {query}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/* Content */}
      <div className=" mt-[50px]  w-full flex justify-center items-center flex-1 gap-7">
        {route === "home" ? (
          <Home
            noMovie={noMovie}
            queriesdata={queriesdata}
            searched={searched}
            setCurrentMovie={setCurrentMovie}
            searchResult={searchResult}
            setRoute={setRoute}
            showQuery={showQuery}
          />
        ) : (
          <Details
            showQuery={showQuery}
            noMovie={noMovie}
            setRoute={setRoute}
            currentMovie={currentMovie}
          />
        )}
      </div>
    </div>
  );
}

export default App;
