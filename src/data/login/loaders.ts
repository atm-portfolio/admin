import { redirect, LoaderFunctionArgs } from 'react-router-dom';

import authProvider from '../../utils/auth';
import { ROOT_PATH } from '../../utils/constants';

export async function loginLoader() {
  if (authProvider.isAuthenticated) {
    return redirect(ROOT_PATH);
  }
  return null;
}

export function protectedLoader({ request }: LoaderFunctionArgs) {
  authProvider.checkAuth();
  if (!authProvider.isAuthenticated) {
    authProvider.storeRedirectUrl(new URL(request.url).pathname);
    return redirect(`${ROOT_PATH}/login`);
  }
  return null;
}
