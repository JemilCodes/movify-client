import "./App.css";

import React, { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "./network/baseUrl";
import Home from "./component/Home/Home";
import Details from "./component/MovieDetails/Details";

function App() {
  useEffect(() => {
    if (document && document?.querySelector(".banner")) {
      document.querySelector(".banner").style.backgroundImage =
        "url('https://movify-api.onrender.com/banner.jpg')";
    }
  }, []);
  const [showQuery, setShowQuery] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentMovie, setCurrentMovie] = useState({});
  const [feedback, setFeedback] = useState("No Movies to show");

  var banner = document.querySelector(".banner");

  function changeBanner(url) {
    banner.style.backgroundImage = "url(" + url + ")";
  }

  const [route, setRoute] = useState("home");

  let noMovie = searchResult?.length === 0;

  let firstTime = false;
  let queriesdata = JSON.parse(localStorage.getItem("queries"));
  if (!Array.isArray(queriesdata)) {
    firstTime = true;
    queriesdata = [];
  }
  useEffect(() => {
    if (firstTime) {
      setFeedback(
        "It's your first time, and you haven't searched for any movies yet."
      );
    } else {
      setFeedback("Searching...");
    }

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
            // making sure it only string
            query: queryResultItem.toString().trim(),
          });
          setFeedback("Here are movies from your last five searches");
          setSearchResult((prev) => {
            const newSearchResults = data?.data?.Search;

            // Check if newSearchResults is defined and is an array
            if (Array.isArray(newSearchResults)) {
              return [...prev, ...newSearchResults];
            } else {
              // Handle the case where newSearchResults is not iterable
              // console.error(
              //   "Search results are not iterable:",
              //   newSearchResults
              // );
              return prev; // or handle it in a different way based on your requirements
            }
          });
        } catch (error) {
          // Handle errors here
          setFeedback("Server is not responding, try again");
        }
      }
    };
    getMovies();
  }, []);

  function addToLatestQueries(newQueries) {
    // Check if queriesdata is an array before trying to use array methods
    if (!Array.isArray(queriesdata)) {
      // console.error("queriesdata is not an array");
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
    setFeedback("Searching...");
    payload.toString().trim();
    setSearchResult([]);
    setSearchInput("");
    setShowQuery(false);
    localStorage.setItem(
      "queries",
      JSON.stringify(addToLatestQueries(payload))
    );
    try {
      const data = await axios.post(`${baseUrl}/search`, {
        query: payload,
      });
      if (data?.data?.Response === "False") {
        setFeedback("Movie Not Found");
        setSearchResult([]);
        return;
      }
      setRoute("home");
      setFeedback("Here are your search result");
      setSearchResult((prev) => {
        const newSearchResults = data?.data?.Search;

        // Check if newSearchResults is defined and is an array
        if (Array.isArray(newSearchResults)) {
          return newSearchResults;
        } else {
          // Handle the case where newSearchResults is not iterable
          // console.error("Search results are not iterable:", newSearchResults);
          return prev; // or handle it in a different way based on your requirements
        }
      });
    } catch (error) {
      setFeedback("Server not responding, try again");
    }
  };

  return (
    <div
      // style={{
      //   background: `url(${currentMovie?.Poster}) no-repeat center/cover`,
      // }}
      className="banner w-full h-screen p-5 md:pl-10 md:pr-10 flex flex-col  "
    >
      {/* Navbar */}
      <div className=" flex justify-between items-center top-0 left-0 right-0 sticky">
        {/* logo */}
        <h1 className=" hidden md:block text-white text-xl font-extrabold logo">
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
          {showQuery && !firstTime && (
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
      <div className=" w-full h-full flex items-center justify-center">
        {route === "home" ? (
          <Home
            noMovie={noMovie}
            queriesdata={queriesdata}
            feedback={feedback}
            setFeedback={setFeedback}
            setCurrentMovie={setCurrentMovie}
            searchResult={searchResult}
            setRoute={setRoute}
            showQuery={showQuery}
            changeBanner={changeBanner}
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
