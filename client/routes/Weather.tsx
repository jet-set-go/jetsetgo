import React, {useState, useEffect} from "react";  
import './weatherStyle.css'

export default function WeatherSummary() {
  const [weather, setweather] = useState({})      
  useEffect(() => {
    let lat = 44.34
    let lon = 10.99
   let data; 
   const getData = async() => { 
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`)
  .then(response => response.json())
  .then(response => console.log(response))
  }
  getData()}
    , [])
  
  return <div className={"weather-text"}>yep</div>
}
