import { api } from './service';
import { apiBaseUrl } from './constants';
import jwtDecoder from './decoders';
import stateProvider from './state';
import Storage from '../utils/storage';

interface AuthProvider {
  isLoading: boolean;
  isAuthenticated: boolean;
  name: null | string;
  checkAuth(): boolean;
  signIn(formData: FormData): Promise<void>;
  signOut(): Promise<void>;
  redirectUrl: string | null;
  storeRedirectUrl(url: string): void;
  getRole(): string;
}

function certifyAuthentication(token: string) {
  if (!token) {
    stateProvider.isLoading = false;
    return false;
  }

  const jwt = jwtDecoder(token);
  const { name } = JSON.parse(jwt);

  authProvider.isAuthenticated = true;
  authProvider.name = name;
  stateProvider.isLoading = false;

  Storage.set('token.admin', token);
  return true;
}

async function retry(formDataJson: Record<string, string | null>) {
  try {
    const response = await api.post(`${apiBaseUrl}/authenticate`, {
      ...formDataJson,
      scope: 'ADMIN',
    });
    return certifyAuthentication(response.data);
  } catch {
    stateProvider.isLoading = false;
    return false;
  }
}

const authProvider: AuthProvider = {
  isLoading: false,
  isAuthenticated: false,
  name: null,
  redirectUrl: null,
  checkAuth() {
    const token = Storage.get('token.admin');

    if (!token) {
      authProvider.isAuthenticated = false;
      authProvider.name = null;
      return false;
    }

    const decodedToken = jwtDecoder(token);
    const { exp: expirationTime, name: userName } = JSON.parse(decodedToken);

    if (Date.now() >= expirationTime * 1000) {
      Storage.remove('token.admin');
      authProvider.isAuthenticated = false;
      authProvider.name = null;
      return false;
    } else {
      authProvider.isAuthenticated = true;
      authProvider.name = userName;
      return true;
    }
  },
  getRole() {
    const token = Storage.get('token.admin');

    if (!token) {
      return false;
    }

    const decodedToken = jwtDecoder(token);
    const { role } = JSON.parse(decodedToken);
    return role;
  },
  storeRedirectUrl(url: string) {
    authProvider.redirectUrl = url;
  },
  async signIn(formData: FormData) {
    const formDataJson = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, value])
    ) as Record<string, string | null>;

    stateProvider.isLoading = true;

    await api
      .post(`${apiBaseUrl}/authenticate`, { ...formDataJson, scope: 'ADMIN' })
      .then(function (response) {
        return certifyAuthentication(response.data);
      })
      .catch(function (error) {
        const { code } = error;
        if (code === 'ERR_NETWORK') {
          return retry(formDataJson);
        }

        stateProvider.isLoading = false;
        return false;
      });
  },
  async signOut() {
    authProvider.isAuthenticated = false;
    authProvider.name = null;
    Storage.remove('token.admin');
  },
};

export default authProvider;
