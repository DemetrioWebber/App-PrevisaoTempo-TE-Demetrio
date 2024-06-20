import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

const TemperatureAndDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    humidity,
    feels_like,
    sunrise,
    sunset,
    speed,
    timezone,
  },
}) => {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{details}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={iconUrlFromCode(icon)} className="w-20" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <DetailLine icon={<UilTemperature size={18} />} label="Sensação" value={`${feels_like.toFixed()}°`} />
          <DetailLine icon={<UilTear size={18} />} label="Humidade" value={`${humidity.toFixed()}%`} />
          <DetailLine icon={<UilWind size={18} />} label="Vento" value={`${speed.toFixed()} km/h`} />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center space-x-2 text-white text-sm py-3">
        <DetailLine icon={<UilSun />} label="Amanhece" value={formatToLocalTime(sunrise, timezone, "hh:mm a")} />
        <DetailLine icon={<UilSunset />} label="Anoitece" value={formatToLocalTime(sunset, timezone, "hh:mm a")} />
        <DetailLine icon={<UilSun />} label="Máxima" value={`${temp_max.toFixed()}°`} />
        <DetailLine icon={<UilSun />} label="Mínima" value={`${temp_min.toFixed()}°`} />
      </div>
    </div>
  );
};

const DetailLine = ({ icon, label, value }) => (
  <div className="flex items-center justify-center font-light text-sm">
    {icon}
    <span className="ml-1">
      {label}:<span className="font-medium ml-1">{value}</span>
    </span>
  </div>
);

export default TemperatureAndDetails;