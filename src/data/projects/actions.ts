import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import authProvider from '../../utils/auth';
import { apiWithToken } from '../../utils/service';
import { apiBaseUrl, ROOT_PATH } from '../../utils/constants';
import stateProvider from '../../utils/state';

export async function projectAction({ request }: LoaderFunctionArgs) {
  if (!authProvider.isAuthenticated) {
    return redirect(`${ROOT_PATH}/login`);
  }

  const formData = await request.formData();

  const id = formData.get('_id') as string | null;
  const name = formData.get('name') as string | null;
  const description = formData.get('description') as string | null;
  const products = Array.from(formData.getAll('products')).map((item) =>
    item.toString()
  ) as string[];

  const formDataJson = Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, value])
  ) as Record<string, string | null>;

  if (!name) {
    return {
      error: 'Project must have a name',
    };
  }

  if (!description || description.length < 9 || description.length > 300) {
    return {
      error:
        'Description is required and must be between 10 and 300 characters',
    };
  }

  const payload = {
    name: formDataJson.name,
    description: formDataJson.description,
    products,
  };

  stateProvider.isLoading = true;

  if (!id || id.length === 0) {
    const apiResponse = await apiWithToken()
      .post(`${apiBaseUrl}/projects`, {
        name,
        description,
        products,
      })
      .then(() => {
        stateProvider.isLoading = false;
        return null;
      })
      .catch(() => {
        stateProvider.isLoading = false;
        return {
          error: 'Failed to create project',
        };
      });

    if (apiResponse?.error) {
      stateProvider.isLoading = false;
      return { error: apiResponse?.error };
    }

    stateProvider.isLoading = false;
    return redirect(`${ROOT_PATH}/projects`);
  }

  const apiResponse = await apiWithToken()
    .put(`${apiBaseUrl}/projects/${id}`, { ...payload, products })
    .then(function () {
      stateProvider.isLoading = false;
      return null;
    })
    .catch(function () {
      stateProvider.isLoading = false;
      return {
        error: 'Failed to edit project',
      };
    });

  if (apiResponse?.error) {
    stateProvider.isLoading = false;
    return { error: apiResponse?.error };
  }

  stateProvider.isLoading = false;
  return redirect(`${ROOT_PATH}/projects`);
}
