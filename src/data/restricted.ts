import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import authProvider from '../utils/auth';
import { ROOT_PATH } from '../utils/constants';

function restrictedLoader({ request }: LoaderFunctionArgs) {
  authProvider.checkAuth();
  if (!authProvider.isAuthenticated) {
    authProvider.storeRedirectUrl(new URL(request.url).pathname);
    return redirect(`${ROOT_PATH}/login`);
  }
  return null;
}

export default restrictedLoader;
