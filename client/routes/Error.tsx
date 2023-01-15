import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthorizationStatus } from './Root';

interface ErrorResponse {
  data: AuthorizationStatus;
}

const ErrorPage: React.FC = () => {
  const { data: error } = useRouteError() as ErrorResponse;
  console.error('Error in navigating to desired route: ', error);
  // const navigate = useNavigate();

  // React.useEffect(() => {
  //   if (error.status === 401) {
  //     console.log('Redirecting...');
  //     navigate('/signin', { replace: true });
  //   }
  // }, [error, navigate]);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error && <i>{error.statusText || error.status}</i>}</p>
    </div>
  );
};

export default ErrorPage;
