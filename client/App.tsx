import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import ErrorPage from './routes/Error';
import HomePage from './routes/Home';
import Login from './auth/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  // Additional routes go here
  { 
    path: '/login',
    element: <Login />, 
    errorElement: <ErrorPage />
  },
]);

const App: React.FC = () => {
  return (
    <Navigation>
      <RouterProvider router={router} />
    </Navigation>
  );
};

export default App;
