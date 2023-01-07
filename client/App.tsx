import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
  // TODO: Wrap this with a header and footer or similar
  return <RouterProvider router={router} />;
};

export default App;
