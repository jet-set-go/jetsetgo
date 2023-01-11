import React, {useState, useEffect } from 'react'
import CloudIcon from '@mui/icons-material/Cloud'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import TornadoIcon from '@mui/icons-material/Tornado';
import OpacityIcon from '@mui/icons-material/Opacity';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

interface Props {
  condition: string
} 
// 'Drizzle'
// 'Rain'
// 'Snow'
// 'Mist'
// 'Smoke'
// 'Haze'
// 'Dust'
// 'Fog'
// 'Sand'
// 'Ash'
// 'Squall'
// 'Tornado'
// 'Clear'
// 'Clouds'

const icons = new Map() 
icons.set('Thunderstorm', <ThunderstormIcon/>)
icons.set('Drizzle', <OpacityIcon/>)
icons.set('Rain', <OpacityIcon/>)
icons.set('Snow', <AcUnitRoundedIcon/>)
icons.set('Mist', <OpacityIcon/>)
icons.set('Smoke', <PriorityHighRoundedIcon/>)
icons.set('Dust', <PriorityHighRoundedIcon/>)
icons.set('Fog', <PriorityHighRoundedIcon/>)
icons.set('Sand', <PriorityHighRoundedIcon/>)
icons.set('Ash', <PriorityHighRoundedIcon/>)
icons.set('Squall', <PriorityHighRoundedIcon/>)
icons.set('Tornado', <TornadoIcon/>)
icons.set('Clouds', <CloudIcon/>)
icons.set('Clear', <WbSunnyRoundedIcon/>)




const WeatherIcon: React.FC<Props> = ({condition}) => {
  return (
    icons.get(condition)
  )
}

export default WeatherIcon
