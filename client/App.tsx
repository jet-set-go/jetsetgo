import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import ErrorPage from './routes/Error'
import HomePage from './routes/Home'
import WeatherSummary from './components/Weather/Weather'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/weather',
    element: <WeatherSummary lat={27.95} lon={-82.45} /* scale={'imperial'} */ location={'Tampa, US'}/>,
    errorElement: <ErrorPage />,
  },
  // Additional routes go here
])

const App: React.FC = () => {
  return (
    <Navigation>
      <RouterProvider router={router} />
    </Navigation>
  )
}

export default App
