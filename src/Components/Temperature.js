import React, { useEffect, useState } from "react";
import "./Temperature.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Temperature() {
  const apiKey = "2fd8f03c6b1f00afdc6327d6b7d8bede";
  const [data, setdata] = useState({});
  const [InputCity, setInputCity] = useState("");

  const getWeatherDeatils = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setdata(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleSearch = () => {
    getWeatherDeatils(InputCity);
  };
  const handleChange = (e) => {
    setInputCity(e.target.value);
  };

  useEffect(() => {
    getWeatherDeatils("delhi");
  }, []);

  return (
    <>
      <div id="weatherbg" className="col-md-12">
        <div className="title">
          <h1 id="weatherTitle">Weather App</h1>

          <div className="d-grid gap-3">
            <input
              value={InputCity}
              type="text"
              className="form-control"
              onChange={handleChange}
            />
            <button onClick={handleSearch} className="btn btn-primary">
              Search
            </button>
          </div>
          <div className="shadow rounded weatherResultBox">
            <img
              className="weatherIcon"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWDIWlzWpiqAs7M8kcQF9rkLrn8D-7P7g_39r8Reuht0OUGr7tVF6QXE45fabhWJo8GYA&usqp=CAU"
              alt=""
            />
            <h5 className="weathercity">{data?.name}</h5>
            <h6 className="weatherTemp">
              {(data?.main?.temp - 273.15).toFixed(2)}°C
            </h6>
          </div>
        </div>
      </div>
      <div className="col-md-12 text-center mt-5"></div>
    </>
  );
}

export default Temperature;
