import { useState, useEffect } from "react";
import axios from "axios";
import { TbTemperatureCelsius, TbWind } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { FaRandom } from "react-icons/fa";

const App = () => {
  const [data, setData] = useState({
    tem: 10,
    name: "kigali",
    humidity: 34,
    windSpeed: 15,
    pressure: 3012,
    weatherType: "Rain",
    weatherDescription: "light rain",
    image: "",
  });

  const [name, setName] = useState("kigali");
  const [error, setError] = useState("");

  useEffect(() => {
    handleClick();
  }, []);

  const handleClick = () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=ceba19717ef05edaec45eae6dd6557f6&units=metric`;
    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res);
        setData({
          ...data,
          tem: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          pressure: res.data.main.pressure,
          windSpeed: res.data.wind.speed,
          image: `https://openweathermap.org/img/w/${res.data.weather[0].icon}.png`,
          weatherType: res.data.weather[0].main,
          weatherDescription: res.data.weather[0].description,
        });
        setError("");
        setName("");
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setError("Invalild city name ");
        }
        console.error(err);
      });
  };

  return (
    <>
      <div className="grid place-items-center lg:min-h-lvh md:min-h-screen xl:min-h-screen min-h-[110vh] px-4 bg-gray-600">
        <div className="card">
          <div className="flex justify-between items-center">
            <input
              type="text"
              autoComplete="on"
              onChange={(e) => setName(e.target.value)}
              className=" input"
              value={name}
              placeholder="Search by city name"
            />
            <button
              onClick={handleClick}
              className="bg-white rounded-lg py-2 px-4 ml-4"
            >
              Search
            </button>
          </div>
          <h1 className="py-2 text-red-600 md:text-xl text-base">{error}</h1>
          <div className="my-2 grid place-items-center">
            <img
              src={data.image}
              alt="weather Image"
              className="w-40 h-36 object-cover"
            />
            <h1 className="text-4xl py-2 flex">
              {data.tem.toFixed(2)}
              <TbTemperatureCelsius />
            </h1>
            <h2 className="text-xl py-3">{data.name}</h2>
          </div>

          <div className="flex justify-between items-center pb-8 md:px-4">
            <div className="flex justify-center items-center gap-4">
              <WiHumidity className="md:w-12 md:h-11 w-7 h-7" />
              <div>
                <h1>{data.humidity}%</h1>
                <h1>humidity</h1>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <TbWind className="md:w-12 md:h-11 w-7 h-7" />
              <div>
                <h1>{data.windSpeed} km/hr</h1>
                <h1>Wind</h1>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pb-4 md:px-4 px-3">
            <div className="flex justify-center items-center gap-4">
              <FaRandom className="md:w-9 md:h-9 w-7 h-7" />
              <div>
                <h1>{data.weatherType}</h1>
                <h1>{data.weatherDescription}</h1>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <TbWind className="md:w-12 md:h-11 w-7 h-7" />
              <div>
                <h1>{data.pressure} Pa</h1>
                <h1>Pressure</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
