import { Navigate } from 'react-router-dom';

import Form from '../../components/Form';
import Input from '../../components/Input';

import authProvider from '../../utils/auth';
import { ROOT_PATH } from '../../utils/constants';

function LoginPage() {
  if (authProvider.isAuthenticated) {
    return <Navigate to={ROOT_PATH} />;
  }

  return (
    <div className="app-login">
      <h3>Login</h3>
      <Form>
        <Input label="Email" name="email" type="text" />
        <Input label="Password" name="password" type="password" />
      </Form>
      {authProvider.isLoading && (
        <p>Please wait while we are logging you in...</p>
      )}
    </div>
  );
}

export default LoginPage;
