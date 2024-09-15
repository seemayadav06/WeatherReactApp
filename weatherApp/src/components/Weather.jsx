import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import rain_icon from '../assets/rain.jpg'
import clear_icon from '../assets/sun.png'
import cloud_icon from '../assets/cloudsun.png'
import drizzle_icon from '../assets/drizzle.jpeg'
import snow_icon from '../assets/snowfall.jpg'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'


const Weather=()=>{

  const inputRef=useRef()
  const [weatherData,seWeatherData]=useState(false);

  const allIcons={
    "01d" : clear_icon,
    "01n" : clear_icon,
    "02d" : cloud_icon,
    "02n" : cloud_icon,
    "03d" : cloud_icon,
    "03n" : cloud_icon,
    "04d" : drizzle_icon,
    "04n" : drizzle_icon,
    "09d" : rain_icon,
    "09n" : rain_icon,
    "010d" : rain_icon,
    "010n" : rain_icon,
    "013d" : snow_icon,
    "013n" : snow_icon,
     
  }

  const search=async(city)=>{
       if(city===""){
        alert("Enter City Name");
        return;
       }
      try{
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

        const response=await fetch(url);
        const data=await response.json();

        if(!response.ok){
          alert(data.message);
          return;
        }
        console.log(data);
        const icon=allIcons[data.weather[0].icon]|| clear_icon;

        seWeatherData({
          humidity:data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon:icon
        })
      }
      catch(error){
              seWeatherData(false);
              console.error("Error in fetching weather data");
      }
  }
  useEffect(()=>{
      search("jhansi");
  },[])
  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search'/>
            <img src={search_icon} alt="" onClick={()=>search(
              inputRef.current.value
            )}/>
        </div>
        {weatherData?<>
          <img src={weatherData.icon} alt="" className='weather-icon'></img>
        <p className='temperature'>
          {weatherData.temperature}°C
        </p>
        <p className='location'>
          {weatherData.location}
        </p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt=""/>
             <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
             </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt=""/>
             <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
             </div>
          </div>
        </div>
        </>:<></>}
 
    </div>
  )
}
export default Weather