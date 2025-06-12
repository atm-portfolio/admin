import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import authProvider from '../../utils/auth';
import { apiWithToken } from '../../utils/service';
import { apiBaseUrl, ROOT_PATH } from '../../utils/constants';
import stateProvider from '../../utils/state';

export async function productAction({ request }: LoaderFunctionArgs) {
  if (!authProvider.isAuthenticated) {
    return redirect(`${ROOT_PATH}/login`);
  }

  const formData = await request.formData();

  const id = formData.get('_id') as string | null;
  const name = formData.get('name') as string | null;
  const description = formData.get('description') as string | null;
  const code = formData.get('code') as string | null;

  const formDataJson = Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, value])
  ) as Record<string, string | null>;

  if (!name) {
    return {
      error: 'Product must have a name',
    };
  }

  if (!description || description.length < 9 || description.length > 300) {
    return {
      error:
        'Description is required and must be between 10 and 300 characters',
    };
  }

  if (!code || !/^[\d]{3}-[A-Z]{3}-[\d]{3}$/.test(code)) {
    return {
      error: 'Code is required and must be in the format 111-AAA-111',
    };
  }

  // for the purpose of this portfolio I will not allow images in order to avoid uploading large files or impropriate images
  const image = 'https://example.com/image.jpg';

  const payload = {
    name: formDataJson.name,
    description: formDataJson.description,
    code: formDataJson.code,
    image,
  };

  stateProvider.isLoading = true;

  if (!id || id.length === 0) {
    const apiResponse = await apiWithToken()
      .post(`${apiBaseUrl}/products`, { ...payload })
      .then(() => {
        stateProvider.isLoading = false;
        return null;
      })
      .catch(() => {
        stateProvider.isLoading = false;
        return {
          error: 'Failed to create product.',
        };
      });

    if (apiResponse?.error) {
      stateProvider.isLoading = false;
      return { error: apiResponse?.error };
    }

    stateProvider.isLoading = false;
    return redirect(`${ROOT_PATH}/products`);
  }

  const apiResponse = await apiWithToken()
    .put(`${apiBaseUrl}/products/${id}`, { ...payload })
    .then(function () {
      stateProvider.isLoading = false;
      return null;
    })
    .catch(function () {
      stateProvider.isLoading = false;
      return {
        error: 'Failed to edit product',
      };
    });

  if (apiResponse?.error) {
    stateProvider.isLoading = false;
    return { error: apiResponse?.error };
  }

  stateProvider.isLoading = false;
  return redirect(`${ROOT_PATH}/products`);
}
