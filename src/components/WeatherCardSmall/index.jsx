import { useState, useEffect } from "react";
import "./styles.css";

const WeatherCardSmall = ({ weather }) => {
  const [weekday, setWeekday] = useState();

  useEffect(() => {
    const week = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    week.map((day) => {
      if (
        weather.weekday.substring(0, 3) ===
        day.substring(0, 3)
      ) {
        setWeekday(day);
      }
    });
  }, [weather.weekday]);

  return (
    <section className="weather-card-sm">
      <p>{weekday}</p>
      <p>({weather.date})</p>
      <img
        style={{ width: "48px", height: "48px" }}
        src={`./icons-weather/${weather.condition}.svg`}
        alt={weather.description}
      />
      <div className="min-max-sm">
        <span>
          {weather.min} / {weather.max}°
        </span>
      </div>
    </section>
  );
};
export default WeatherCardSmall;
