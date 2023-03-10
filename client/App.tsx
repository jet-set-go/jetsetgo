import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './routes/CreateTrip';
import ErrorPage from './routes/Error';
import HomePage from './routes/Home';
import SignIn from './auth/SignIn';
import SignUp from './auth/Signup';
import Root from './routes/Root';
import TripDashboard, { loader as tripLoader } from './routes/TripDashboard';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/trip/new',
        element: <CreateTrip />,
      },
      {
        path: '/trip/:tripId',
        element: <TripDashboard />,
        loader: tripLoader,
      },
      // Additional routes go here
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#F68C02',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#073064',
    },
  },
});

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
