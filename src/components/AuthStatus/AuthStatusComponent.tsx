import { useFetcher, Link } from 'react-router-dom';

import authProvider from '../../utils/auth';
import { ROOT_PATH } from '../../utils/constants';

const AuthStatus = () => {
  const fetcher = useFetcher();

  const user = authProvider.name;
  const isLoggingOut = fetcher.formData != null;

  if (!user) {
    return (
      <div className="auth-header">
        <Link to={`${ROOT_PATH}/login`} data-testid="login-link">
          <i className="fa-solid fa-right-to-bracket"></i>
        </Link>
      </div>
    );
  }

  return (
    <div className="auth-header">
      <p>Welcome {user}!</p>
      <fetcher.Form method="post" action={`${ROOT_PATH}/logout`}>
        <button type="submit" disabled={isLoggingOut}>
          <i className="fa-solid fa-person-walking-dashed-line-arrow-right"></i>
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AuthStatus;
