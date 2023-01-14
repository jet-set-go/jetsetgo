import React, { useState, useEffect } from 'react'
import CloudIcon from '@mui/icons-material/Cloud'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'
import TornadoIcon from '@mui/icons-material/Tornado'
import OpacityIcon from '@mui/icons-material/Opacity'
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded'
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'

interface Props {
  condition: string
}

export const icons = new Map()
icons.set('Thunderstorm', [<ThunderstormIcon />, '/images/stormy-jetsetgo.jpg'])
icons.set('Drizzle', [<OpacityIcon />, '/images/rainy-jetsetgo.jpg'])
icons.set('Rain', [<OpacityIcon />, '/images/rainy-jetsetgo.jpg'])
icons.set('Snow', [<AcUnitRoundedIcon />, '/images/snowy-jetsetgo.jpg'])
icons.set('Mist', [<OpacityIcon />, '/images/foggyMist-jetsetgo.jpg'])
icons.set('Smoke', [<PriorityHighRoundedIcon />, '/images/foggyMist-jetsetgo.jpg'])
icons.set('Dust', [<PriorityHighRoundedIcon />, '/images/foggyMist-jetsetgo.jpg'])
icons.set('Fog', [<PriorityHighRoundedIcon />, '/images/foggyMist-jetsetgo.jpg'])
icons.set('Sand', [<PriorityHighRoundedIcon />, '/images/foggyMist-jetsetgo.jpg'])
icons.set('Ash', [<PriorityHighRoundedIcon />, '/images/foggyMist-jetsetgo.jpg'])
icons.set('Squall', [<PriorityHighRoundedIcon />, '/images/foggyMist-jetsetgo.jpg'])
icons.set('Tornado', [<TornadoIcon />, '/images/stormy-jetsetgo.jpg'])
icons.set('Clouds', [<CloudIcon />, '/images/cloudy-jetsetgo.jpg'])
icons.set('Clear', [<WbSunnyRoundedIcon />, '/images/sunny-jetsetgo.jpg'])
icons.set('Clear-night', [<WbSunnyRoundedIcon />, '/images/clear-night-jetsetgo.jpg'])
const WeatherIcon: React.FC<Props> = ({ condition }) => {
  return icons.get(condition)[0]
}

export default WeatherIcon
