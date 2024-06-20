import { useEffect, useState } from "react";
import "./App.css";
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/weatherService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [query, setQuery] = useState({ q: "Passo Fundo" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getFormattedWeatherData({ ...query, units });
        toast.success(`Busca finalizada para ${data.name}, ${data.country}`);
        setWeather(data);
      } catch (error) {
        console.error('Erro ao buscar dados de clima, por favor tente digitar outra cidade', error);
        toast.error('Erro ao buscar dados de clima, por favor tente digitar outra cidade', error);
      }
    };

    const message = query.q || "Minha Cidade Atual";
    toast.info(`Buscando previsão para ${message}`);

    fetchWeather();
  }, [query, units]);

  useEffect(() => {
    const formatBackground = () => {
      if (!weather) return "from-cyan-700 to-blue-700";
      const threshold = units === "metric" ? 25 : 70;
      return weather.temp <= threshold ? "from-cyan-700 to-blue-700" : "from-yellow-700 to-orange-500";
    };

    document.body.className = formatBackground();
  }, [weather, units]);

  return (
    <div className={`mx-auto max-w-screen-md mt-11 py-8 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-900`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />

          <Forecast title="previsão hora" items={weather.hourly} />
          <Forecast title="previsão dias" items={weather.daily} />
        </>
      )}

      <ToastContainer autoClose={4000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;