"use strict";
let cache = require("./cache.js");
const axios = require("axios");
module.exports = getWeather;

async function getWeather(lat, lon) {
  const key = "weather-" + lat + lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${lat}&lon=${lon}`;
  console.log(url);
  if (cache[key] && Date.now() - cache[key].timestamp < 10800000) {
    console.log("Cache hit");
  } else {
    console.log("Cache miss");
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
      .get(url)
      .then((response) => parseWeather(response.data));
  }
  console.log("Data: ", cache[key].data);
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    console.log("WeatherData: ", weatherData);
    const weatherSummaries = weatherData.data.map((day) => {
      return new Forecast(day);
    });
    console.log("Data: ", weatherSummaries);
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
}

function Forecast(day) {
  this.day = day.valid_date;
  this.description = day.weather.description;
}
