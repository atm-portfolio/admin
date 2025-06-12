import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage(): React.ReactElement {
  const error = useRouteError() as { statusText: string; message: string };

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Go back to the home page</Link>
    </div>
  );
}
