// Comunicacao com a API

import {DateTime} from "luxon";

// Minha API key, se quiser pode trocar
const API_KEY = "4c35c9907567344bc0cd96e83b337ad1";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lon,
    lat,
    temp,
    feels_like,
    temp_max,
    temp_min,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
    humidity,
  };
};

const formatForecastWeather = (data) => {
        let {
            timezone,
            daily,
            hourly
        } = data;

        daily = daily.slice(1,6).map(d => {
            return {
                title : formatToLocalTime(d.dt, timezone, "ccc"),
                temp : d.temp.day,
                icon : d.weather[0].icon
            }
        });

        hourly = hourly.slice(1,6).map(d => {
            return {
                title : formatToLocalTime(d.dt, timezone, "hh:mm a"),
                temp : d.temp,
                icon : d.weather[0].icon
            }
        });

        return {timezone, daily, hourly};
}

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const {lat ,lon} = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat, lon, exclude : "current, minutely, alerts", units : searchParams.units
  }).then(formatForecastWeather);

  return {...formattedCurrentWeather, ...formattedForecastWeather};
};

export default getFormattedWeatherData;

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local Time : 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode =  (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export { formatToLocalTime, iconUrlFromCode};