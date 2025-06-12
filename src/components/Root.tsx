import React, { useContext } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import AppContext from '../context/AppContext';
import authProvider from '../utils/auth';
import AuthStatus from './AuthStatus/AuthStatusComponent';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { ROOT_PATH } from '../utils/constants';

ModuleRegistry.registerModules([AllCommunityModule]);

function Link({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick?: () => void;
}) {
  const location = useLocation();

  return (
    <>
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          isActive && location.pathname === to ? 'active' : ''
        }
      >
        {label}
      </NavLink>
      <span className="nav-separator">|</span>
    </>
  );
}

function Navigation(): React.ReactElement | null {
  const [width] = useWindowDimensions();

  const context = useContext(AppContext);
  const { open, setOpen } = context ?? {};

  if (width < 768 && !open) {
    return null;
  }

  return (
    <nav className="app-nav">
      <Link to={ROOT_PATH} label="Home" onClick={() => setOpen?.(false)} />
      <Link to={`${ROOT_PATH}/projects`} label="Projects" onClick={() => setOpen?.(false)} />
      <Link to={`${ROOT_PATH}/products`} label="Products" onClick={() => setOpen?.(false)} />
      <Link to={`${ROOT_PATH}/reports`} label="Reports" onClick={() => setOpen?.(false)} />
      <Link to={`${ROOT_PATH}/about`} label="About" onClick={() => setOpen?.(false)} />
    </nav>
  );
}

function Root(): React.ReactElement {
  authProvider.checkAuth();

  const context = useContext(AppContext);
  const { message, setOpen } = context ?? {};
  const [width] = useWindowDimensions();

  return (
    <>
      {message && <div className="app-status">{message}</div>}
      <header className="app-header" style={{ width: width }}>
        <div>
          <h3>Portfolio - Admin</h3>
          <i
            className="fa-solid fa-bars main-menu"
            onClick={() => setOpen?.((prev) => !prev)}
          ></i>
        </div>
        <AuthStatus />
        <a href="https://ath-portfolio.ca" className="auth-link">
          <i className="fa-solid fa-stairs"></i>
        </a>
      </header>
      <Navigation />
      <section className="app-content">
        <Outlet />
      </section>
    </>
  );
}

export default Root;
