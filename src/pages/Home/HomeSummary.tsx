import React from 'react';

export default function HomePage(): React.ReactElement {
  return (
    <div className="app-home">
      <h3>Welcome to the admin panel</h3>
      <p>
        This page was built using{' '}
        <span style={{ color: '#15650f' }}>
          <b>React</b>
        </span>{' '}
        as client side framework,{' '}
        <span style={{ color: '#15650f' }}>
          <b>Vite</b>
        </span>{' '}
        as the build tool,{' '}
        <span style={{ color: '#15650f' }}>
          <b>SASS</b>
        </span>{' '}
        as the pre-processor for styling,{' '}
        <span style={{ color: '#15650f' }}>
          <b>Typescript</b>
        </span>{' '}
        for type checking,{' '}
        <span style={{ color: '#15650f' }}>
          <b>ESLint</b>
        </span>{' '}
        for linting,{' '}
        <span style={{ color: '#15650f' }}>
          <b>Prettier</b>
        </span>{' '}
        for code formatting, and{' '}
        <span style={{ color: '#15650f' }}>
          <b>Playwright</b>
        </span>{' '}
        for testing. Additionally,{' '}
        <span style={{ color: '#15650f' }}>
          <b>React Router Dom</b>
        </span>{' '}
        is used for routing in data mode.
      </p>
      <p>
        The purpose of this page is to demonstrate how to utilize this
        technology stack to build an administrative panel, which will serve as
        the management interface for a consumer-facing website built with{' '}
        <span style={{ color: '#15650f' }}>
          <b>Vue</b>
        </span>
        .
      </p>
      <p>
        As an authenticated admin user, this page enables you to create projects
        and products, which in turn generate content for the consumer-facing
        website. This functionality serves as a showcase for my skills and
        provides a solid foundation for further development.
      </p>

      <hr />
      <h3>Getting started</h3>
      <p className="icon-explanation">
        <i className="fa-solid fa-right-to-bracket auth-link" />
        <span>
          Click/Tap the icon located at the top-right corner to log in
        </span>
      </p>
      <p className="icon-explanation">
        <i className="fa-solid fa-stairs auth-link" />
        <span>
          Click/Tap the icon located at the top-right corner to exit the
          application.
        </span>
      </p>
      <p>
        To begin, please log in with an account that has admin privileges to
        access all features and functionality.
      </p>

      <p>
        <strong>Important Note:</strong> This application is hosted on a free
        tier service, which means that the server may take a few moments to
        initialize on the first backend call. Please be patient and allow a
        brief delay for the application to fully wake up and respond.
      </p>
      <p>
        <strong>Server Initialization Indicator:</strong> A{' '}
        <span style={{ color: '#cda400' }}>
          <b>orange bar</b>
        </span>{' '}
        will appear at the top of the screen when the application is
        initializing the server. This indicator signals that the server is
        waking up from its dormant state. Once the server is fully up and
        running, the{' '}
        <span style={{ color: '#cda400' }}>
          <b>orange bar</b>
        </span>{' '}
        will disappear, and subsequent endpoint calls will respond promptly.
      </p>
      <p>
        <strong>Optimized Performance:</strong> To minimize wait times, I've
        implemented a mechanism that pings the server every 10 minutes to keep
        it active. This ensures that the server remains responsive and ready to
        handle requests, eliminating long loading times and providing a seamless
        user experience once this app is up and running.
      </p>
      <hr />
      <p>
        <strong>Guest Access:</strong> For a quick preview, you can log in with
        a guest account, allowing you to browse - read only - the application
        without requiring full admin credentials.
      </p>
      <p>
        <strong>Username:</strong> guest@ath-portfolio.ca
      </p>
      <p>
        <strong>Password:</strong> guestPublic
      </p>
      <br />
    </div>
  );
}
