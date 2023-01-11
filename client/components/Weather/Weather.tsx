import React, { useState, useEffect } from 'react'
import styles from './Weather.module.css'
import Switch from '@mui/material/Switch'
import WeatherIcon from './WeatherIcon'

interface Props {
  lat: number
  lon: number
  location: string
}

//interface model of response from api call
interface ApiResponse {
  current: {
    dt: number
    temp: number
    weather: [
      {
        main: string
        description: string
      }
    ]
  }
  daily: [
    {
      temp: {
        min: number
        max: number
      }
    }
  ]
}
//use unix code from apiCall to format date/time
const getDateTime = (unixCode: number) => {
  const date = new Date()
  let [hour, minutes] = [date.getHours(), date.getMinutes().toString()]
  //get HH:MM AM format
  let amPM = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12 ? hour % 12 : 12
  minutes = parseInt(minutes) < 10 ? '0' + minutes : minutes
  return [date.toDateString(), `${hour}:${minutes} ${amPM}`]
}

const WeatherSummary: React.FC<Props> = ({ lat, lon, location }) => {
  const key = process.env.WEATHER_API_KEY2
  const [apiResults, setApiResults] = useState<ApiResponse | null>(null)
  const [scale, setscale] = useState('imperial')

  const apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${scale}&exclude=minutely,hourly&appid=${key}`

  useEffect(() => {
    const getData = async (url: string, setFunc: Function) => {
      const response = await fetch(url)
      const data = await response.json()
      setFunc(data)
    }
    getData(apiURL, setApiResults)
  }, [lat, lon, scale])

  return !apiResults ? (
    <div className={styles.container}>...loading</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <div className={styles.containerConditions}>
          <WeatherIcon condition={apiResults.current.weather[0].main}/>
          <div>{apiResults.current.weather[0].main}</div>
        </div>
        <div className={styles.containerTemps}>
          <div className={styles.currentTemp}>
            {Math.floor(apiResults.current.temp) + ' ' + (scale === 'imperial' ? 'F' : 'C')}
            <Switch
              onClick={() => setscale((prev) => (prev === 'imperial' ? 'metric' : 'imperial'))}
            />
          </div>
        </div>
      </div>

      <div className={styles.containerRight}>
        <div className={styles.time}>{getDateTime(apiResults.current.dt)[1]}</div>
        <div className={styles.date}>{getDateTime(apiResults.current.dt)[0]}</div>
        <div className={styles.location}>{location}</div>
      </div>
    </div>
  )
}

export default WeatherSummary
