import React, { useState, useEffect } from 'react'
import styles from './Weather.module.css'
import Switch from '@mui/material/Switch'
import WeatherIcon, { icons } from './WeatherIcon'


export default function WeatherSummary({ lat, lon, location, start, end }: Props): React.ReactNode {
  const [apiResults, setApiResults] = useState<ApiResponse | null>(null)
  const [scale, setscale] = useState('imperial')
  const [img, setImg] = useState(icons.get('Clear')[1])
  const url = `/api/weather?lat=${lat}&lon=${lon}&scale=metric`

  useEffect(() => {
    getData(url, setApiResults, setImgState, setImg)
  }, [lat, lon, scale])

  if (!apiResults) return <div className={styles.container}>...loading</div>

  const temperature =
    scale === 'metric'
      ? Math.floor(apiResults.current.temp)
      : Math.floor(apiResults.current.temp * 1.8) + 32

  return (
    <div className={styles.container}>
      <img src={img} alt="img" />
      <div className={styles.containerLeft}>
        <div className={styles.containerConditions}>
          <WeatherIcon condition={apiResults.current.weather[0].main} />
          <div>{apiResults.current.weather[0].main}</div>
        </div>
        <div className={styles.containerTemps}>
          <div className={styles.currentTemp}>{temperature.toString()}</div>
          <div>{scale === 'imperial' ? 'F' : 'C'}</div>
          <div>
            <Switch
              onClick={() => setscale((prev) => (prev === 'imperial' ? 'metric' : 'imperial'))}
            />
          </div>
        </div>
      </div>

      <div className={styles.containerRight}>
        <div className={styles.time}>{getDateTime(apiResults.current.dt * 1000)[1]}</div>
        <div className={styles.date}>{getDateTime(apiResults.current.dt * 1000)[0]}</div>
        <div className={styles.location}>{location}</div>
      </div>
    </div>
  )
}


function getDateTime(code: number | Date): string[] {
  const date = new Date(code)
  let [hour, minutes] = [date.getHours(), date.getMinutes().toString()]
  //get HH:MM AM format
  let amPM = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12 ? hour % 12 : 12
  minutes = parseInt(minutes) < 10 ? '0' + minutes : minutes
  return [date.toDateString(), `${hour}:${minutes} ${amPM}`]
}

async function getData(
  url: string,
  setApiResults: Function,
  setImgState: Function,
  setImg: Function
) {
  const response = await fetch(url)
  const data = await response.json()
  setApiResults(data)
  setImgState(data, setImg)
}

function setImgState(data: ApiResponse, setImg: Function) {
  if (
    data.current.weather[0].main === 'Clear' &&
    (data.current.dt >= data.current.sunset || data.current.dt <= data.current.sunrise)
  )
    setImg(icons.get('Clear-night')[1])
  else setImg(icons.get(data.current.weather[0].main)[1])
}

interface Props {
  lat: number
  lon: number
  location: string
  start: Date
  end: Date
}

//interface model of response from api call
interface ApiResponse {
  current: {
    dt: number
    sunset: number
    sunrise: number
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
      dt: number
      temp: {
        min: number
        max: number
      }
    }
  ]
}
// <div className={styles.time}>{getDateTime(apiResults.current.dt * 1000)[1]}</div>
// <div className={styles.date}>{getDateTime(apiResults.current.dt * 1000)[0]}</div>
// CSS TEST COMP
//   return (
//     <div className={styles.container}>
//       <div className={styles.containerLeft}>
//         <div className={styles.containerConditions}>
//           <WeatherIcon condition={'Clear'} />
//           <div>{'Clear'}</div>
//         </div>
//         <div className={styles.containerTemps}>
//           <div className={styles.currentTemp}>
//             {'58' + ' ' + 'F'}
//             <Switch
//             // onClick={() => setscale((prev) => (prev === 'imperial' ? 'metric' : 'imperial'))}
//             />
//           </div>
//         </div>
//       </div>
//
//       <div className={styles.containerRight}>
//         <div className={styles.time}>{'9:30 PM'}</div>
//         <div className={styles.date}>{'Wed Jan 11 2023'}</div>
//         <div className={styles.location}>{'Tampa, US'}</div>
//       </div>
//     </div>
//   )
// }
