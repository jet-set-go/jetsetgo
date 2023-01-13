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
    sunset:number
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
const imgOpts = new Map()
imgOpts.set('Drizzle', './images/rainy-jetsetgo.jpg')
imgOpts.set('Rain', './images/rainy-jetsetgo.jpg')
imgOpts.set('Snow', './images/snowy-jetsetgo.jpg')
imgOpts.set('Haze', './images/foggyMist-jetsetgo.jpg')
imgOpts.set('Smoke', './images/foggyMist-jetsetgo.jpg')
imgOpts.set('Mist', './images/foggyMist-jetsetgo.jpg')
imgOpts.set('Dust', './images/rainy-jetsetgo.jpg')
imgOpts.set('Fog', './images/rainy-jetsetgo.jpg')
imgOpts.set('Sand', './images/rainy-jetsetgo.jpg')
imgOpts.set('Ash', './images/rainy-jetsetgo.jpg')
imgOpts.set('Squall', './images/rainy-jetsetgo.jpg')
imgOpts.set('Tornado', './images/stormy-jetsetgo.jpg')
imgOpts.set('Clear', './images/sunny-jetsetgo.jpg')
imgOpts.set('Clear-night', './images/clear-night-jetsetgo.jpg')
imgOpts.set('Clouds', './images/cloudy-jetsetgo.jpg')

//use unix code from apiCall to format date/time
const getDateTime = (unixCode: number) => {
  const date = new Date(unixCode * 1000)
  let [hour, minutes] = [date.getHours(), date.getMinutes().toString()]
  //get HH:MM AM format
  let amPM = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12 ? hour % 12 : 12
  minutes = parseInt(minutes) < 10 ? '0' + minutes : minutes
  return [date.toDateString(), `${hour}:${minutes} ${amPM}`]
}

const WeatherSummary: React.FC<Props> = ({ lat, lon, location }) => {
  const [apiResults, setApiResults] = useState<ApiResponse | null>(null)
  const [scale, setscale] = useState('imperial')
  const [img, setImg] = useState(imgOpts.get('Clear'))

  const url = `/api/weather?lat=${lat}&lon=${lon}&scale=${scale}`
  useEffect(() => {
    const getData = async (url: string) => {
      const response = await fetch(url)
      const data = await response.json()
      setApiResults(data)

      if ((data.current.weather[0].main === 'Clear') && (data.current.dt >= data.current.sunset))
         setImg(imgOpts.get('Clear-night'))
      else
      setImg(imgOpts.get(data.current.weather[0].main))
    }
    getData(url)
  }, [lat, lon, scale])

  return !apiResults ? (
    <div className={styles.container}>...loading</div>
  ) : (
    <div className={styles.container}>
        <img src={ img } alt="img"/>
      <div className={styles.containerLeft}>
        <div className={styles.containerConditions}>
          <WeatherIcon condition={apiResults.current.weather[0].main} />
          <div>{apiResults.current.weather[0].main}</div>
        </div>
        <div className={styles.containerTemps}>
          <div className={styles.currentTemp}>
            {Math.floor(apiResults.current.temp) >= 10
              ? Math.floor(apiResults.current.temp)
              : '0' + Math.floor(apiResults.current.temp)}
          </div>
          <div>{scale === 'imperial' ? 'F' : 'C'}</div>
          <div>
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

export default WeatherSummary
