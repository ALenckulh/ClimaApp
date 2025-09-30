import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import WeatherCardSmall from "./components/WeatherCardSmall";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const [city, setCity] = useState();

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newCity = formData.get("search-input");
    setCity(newCity);
    console.log(newCity);
  };

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    } else {
      console.error("Geolocalização não é suportada por este navegador.");
    }
  }, []);

  useEffect(() => {
    async function fetchWeather() {
      if (!city && (!latitude || !longitude)) return;

      const url = city
      ? `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=${city}`
      : `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&lat=${latitude}&lon=${longitude}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results) {
          setWeather(data.results);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API", error);
      }
    }

    fetchWeather();
  }, [city, latitude, longitude]);

  return (
    <div className="app-container">
      <SearchBar onSubmit={handleSearch} />
      {weather ? (
        <>
          <div>
            <h1>{weather.city}</h1>
            <p style={{ fontSize: "14px" }}>
              Nascer do sol: {weather.sunrise} | Pôr do sol: {weather.sunset}
            </p>
          </div>
          <WeatherCard weather={weather} />
          <div style={{ display: "flex", gap: "10px" }}>
            {items.map((item) => (
              <WeatherCardSmall weather={weather.forecast[item.id]} />
            ))}
          </div>
        </>
      ) : (
        <h1
          style={{
            height: "550px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Carregando...
        </h1>
      )}
    </div>
  );
}

export default App;
