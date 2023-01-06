import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Layout/Navigation';
import ErrorPage from './routes/Error';
import HomePage from './routes/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  // Additional routes go here
]);

const App: React.FC = () => {
  return (
    <Navigation>
      <RouterProvider router={router} />
    </Navigation>
  );
};

export default App;
