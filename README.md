# Movify React App

Welcome to the Movify React App! This application allows users to search for movies and view details about them.

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running the App](#running-the-app)
- [Features](#features)
- [Contributing](#contributing)

## Overview
This React app provides a user-friendly interface to search for movies and access their details. It uses the Movify API for fetching movie data.

## Project Structure
The project structure is organized as follows:
- `src/`: Contains the source code of the React app.
  - `App.css`: Stylesheet for the app.
  - `App.js`: Main component that integrates various components.
  - `component/`: Directory containing different components.
    - `Home/`: Home component for displaying movie search results.
    - `MovieDetails/`: Component for displaying details about a selected movie.
  - `network/`: Directory for network-related configurations.
    - `baseUrl.js`: File containing the base URL for API requests.

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/movify-react-app.git
   cd movify-react-app
   
## Install dependencies
1. npm install

## Start command 
1. npm run dev

## Features
- `Search Movies /`: Enter keywords to search for movies.
- `Latest Queries/`: Displays the last five search queries.
- `View Movie Details/`: Click on a movie to view detailed information.
- `Change View/`: You can Change the View Style of the Display either to Swipe or Grid View.
- `Tinder Like Swipeable Card/`: The (swipe view) allow to swipe between the movie smoothly just by double tapping and dragging either to the left or right on desktop view but on mobile view you only need to swipe to your desired direction.
- `Grid View/`: (Grid view) allow you to easily glance through the movie collection.


