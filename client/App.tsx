import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './routes/CreateTrip';
import ErrorPage from './routes/Error';
import HomePage from './routes/Home';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Root from './routes/Root';
import TripDashboard, { loader as tripLoader } from './routes/TripDashboard';
import WeatherSummary from './components/Weather/Weather';
import TripPage from './routes/TripPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/trip/new",
        element: <CreateTrip />,
      },
      {
        path: "/trip/:tripId",
        element: <TripDashboard />,
        loader: tripLoader,
      },
      // Additional routes go here
      {
        path: '/tripdetails/',
        element: <TripPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/signin',
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
]);

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
