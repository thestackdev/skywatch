import Spinner from "@/components/Spinner";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

function Home() {
  const [weather, setWeather] = useState(null);

  async function getWeather(location) {
    try {
      const response = await fetch(
        `/api?lat=${location.latitude}&lng=${location.longitude}`
      ).then((res) => res.json());
      setWeather({
        current_weather: response.current,
        hourly_weather: response.hourly.slice(1, 16),
        timezone: response.timezone,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) getWeather(position.coords);
    });
  }, []);

  if (!weather) return <Spinner />;

  return (
    <div className="bg-gradient-to-r from-[#4B79A1] to-[#283E51] h-screen w-screen flex flex-col items-center pt-8">
      <div className="flex flex-col items-center  h-3/4 w-2/5 text-white gap-4">
        <span className="text-2xl">
          {DateTime.fromSeconds(weather.current_weather.dt)
            .setZone(weather.timezone)
            .toFormat("cccc, dd LLL yyyy' | Local time: 'hh:mm a")}
        </span>
        <span className="text-xl">Mansoorabad, IN</span>
        <span className="text-xl">
          {weather.current_weather.weather[0].description}
        </span>
        <div className="flex items-center justify-between w-full">
          <img
            src={`http://openweathermap.org/img/wn/${weather.current_weather.weather[0].icon}@2x.png`}
            alt="weather_icon"
          />
          <span className="text-4xl">
            {weather.current_weather.temp.toFixed(1)}°C
          </span>
          <div className="flex flex-col justify-around gap-2">
            <span className="flex gap-2">
              <img
                className="inline white-stroke"
                height={10}
                width={23}
                src="/pressure.svg"
              />
              <b>Pressure: </b>
              {weather.current_weather.pressure}
            </span>
            <span className="flex gap-2">
              <img
                className="inline white-stroke"
                height={10}
                width={23}
                src="/humidity.svg"
              />
              <b>Humidity: </b>
              {weather.current_weather.humidity} %
            </span>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <span className="flex gap-2">
            <img
              className="inline white-stroke"
              height={10}
              width={23}
              src="/sunrise.svg"
            />
            <b>rise: </b>{" "}
            {DateTime.fromSeconds(weather.current_weather.sunrise)
              .setZone(weather.timezone)
              .toFormat("hh:mm a")}
          </span>
          <span className="flex gap-2">
            <img
              className="inline white-stroke"
              height={10}
              width={23}
              src="/sunset.svg"
            />
            <b>set: </b>{" "}
            {DateTime.fromSeconds(weather.current_weather.sunset)
              .setZone(weather.timezone)
              .toFormat("hh:mm a")}
          </span>
          <span className="flex gap-2">
            <img
              className="inline white-stroke"
              height={10}
              width={23}
              src="/speed.svg"
            />
            <b>speed: </b>
            {weather.current_weather.wind_speed} km/h
          </span>
          <span className="flex gap-2">
            <img
              className="inline white-stroke"
              height={10}
              width={23}
              src="/direction.svg"
            />
            <b>direction: </b>
            {weather.current_weather.wind_deg} km/h
          </span>
        </div>
        <div className="w-full">
          <span>Hourly Forecast</span>
          <hr className="w-full my-3" />
          <div className="flex flex-wrap items-center justify-center gap-6">
            {weather.hourly_weather.map((hour, key) => (
              <div key={key} className="flex flex-col items-center my-4">
                <span>
                  {DateTime.fromSeconds(hour.dt)
                    .setZone(weather.timezone)
                    .toFormat("hh:mm a")}
                </span>
                <img
                  src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                  alt="weather_icon"
                  width={90}
                />
                <span>{hour.temp.toFixed(1)}°C</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
