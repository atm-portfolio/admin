import { createBrowserRouter, redirect, Navigate } from 'react-router-dom';

import { ProductSummary, ProductDetail } from '../pages/Products';
import { ProjectSummary, ProjectDetail } from '../pages/Projects';
import AboutPage from '../pages/About/AboutPage';
import ErrorPage from '../pages/Error/ErrorSummary';
import HomePage from '../pages/Home/HomeSummary';
import LoginPage from '../pages/Login/LoginSummary';
import ReportSummary from '../pages/Reports';
import Root from '../components/Root';

import { loginLoader, loginAction } from '../data/login';
import authProvider from '../utils/auth';
import productAction from '../data/products';
import projectAction from '../data/projects';
import restrictedLoader from '../data/restricted';
import { ROOT_PATH } from '../utils/constants';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to={ROOT_PATH} />,
  },
  {
    id: 'root',
    path: ROOT_PATH,
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: `${ROOT_PATH}/login`,
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: `${ROOT_PATH}/about`,
        Component: AboutPage,
      },
      {
        path: `${ROOT_PATH}/projects`,
        loader: restrictedLoader,
        Component: ProjectSummary,
      },
      {
        path: `${ROOT_PATH}/projects/:id`,
        loader: restrictedLoader,
        Component: ProjectDetail,
        action: projectAction,
      },
      {
        path: `${ROOT_PATH}/products`,
        loader: restrictedLoader,
        Component: ProductSummary,
      },
      {
        path: `${ROOT_PATH}/products/:id`,
        loader: restrictedLoader,
        Component: ProductDetail,
        action: productAction,
      },
      {
        path: `${ROOT_PATH}/reports`,
        loader: restrictedLoader,
        Component: ReportSummary,
      },
    ],
  },
  {
    path: `${ROOT_PATH}/logout`,
    async action() {
      await authProvider.signOut();
      return redirect(ROOT_PATH);
    },
  },
]);
