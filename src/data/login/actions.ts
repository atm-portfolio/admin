import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import authProvider from '../../utils/auth';
import { ROOT_PATH } from '../../utils/constants';

export async function loginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  if (!email) {
    return {
      error: 'You must provide an email to log in',
    };
  }

  if (!password) {
    return {
      error: 'You must provide a password to log in',
    };
  }

  await authProvider.signIn(formData);

  if (authProvider.isAuthenticated) {
    const redirectUrl = authProvider.redirectUrl || ROOT_PATH;
    authProvider.redirectUrl = null;
    return redirect(redirectUrl);
  }

  return {
    error: 'Failed to log in',
  };
}
