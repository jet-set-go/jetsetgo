import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './routes/CreateTrip';
import ErrorPage from './routes/Error';
import HomePage from './routes/Home';
import Root from './routes/Root';

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
      // Additional routes go here
    ],
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
