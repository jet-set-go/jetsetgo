import { Response, Request, NextFunction } from 'express'
import fetch from 'node-fetch'

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { lat, lon, scale } = req.query
  const key = process.env.WEATHER_API_KEY2
  const apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${scale}&exclude=minutely,hourly&appid=${key}`

  const response = await fetch(apiURL)
  const data = await response.json()
  res.locals.data = data
  return next()
}

export default controller
