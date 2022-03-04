"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const weather = require("./modules/weather");
const axios = require("axios");
const getWeather = require("./modules/weather.js");
// console.log(getWeather);
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get("/", (request, response) => {
  response.send("This is the Mighty Home Route, bow or die.");
});

app.get("/hello-there", (request, response) => {
  response.send("Hello there. General Kenobi, you are a bold one.");
});

app.get("/weather", weatherHandler);

function weatherHandler(request, response) {
  let lat = request.query.lat;
  let lon = request.query.lon;
  // let searchQuery = request.query.searchQuery;

 getWeather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch(error => {
    console.log(error);
    response.status(500).send('meow meow your request failed.');
  })
};

// app.get("/movies", async (request, response) => {
//   let searchQuery = request.query.searchQuery;
//   console.log(searchQuery);

//   const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&query=${searchQuery}`;
//   console.log(url);

//   try {
//     const movieData = await axios.get(url);
//     console.log(movieData.data.results);
//     const movieArray = movieData.data.results.map((movie) => new Movie(movie));
//     response.status(200).send(movieArray);
//   } catch (error) {
//     console.log(error);
//     response.status(500).send("internal server error");
//   }
// });
// function Movie(movie) {
//   this.title = movie.title,
//   this.overview = movie.overview,
//   this.average_votes = movie.vote_average,
//   this.total_votes = movie.vote_count,
//   this.image_url = "https://image.tmdb.org/t/p/w500" + movie.poster_path,
//   this.popularity = movie.popularity,
//   this.released_on = movie.release_date;
// }

app.use("*", (request, response) => {
  response
    .status(404)
    .send("I'm sorry, these are not the droids you are looking for.");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
