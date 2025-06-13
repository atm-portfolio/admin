import React from 'react';

import playwrightLogo from '../../assets/images/playwright.svg';
import reactLogo from '../../assets/images/react.svg';
import reactRouterLogo from '../../assets/images/reactRouter.svg';
import sassLogo from '../../assets/images/sass.svg';
import typescriptLogo from '../../assets/images/typescript.svg';
import viteLogo from '../../assets/images/vite.svg';
import renderLogo from '../../assets/images/render.svg';
import restApiLogo from '../../assets/images/rest-api.svg';
import nodeJsLogo from '../../assets/images/nodejs.svg';
import mongoDbLogo from '../../assets/images/mongodb.svg';
import netlifyLogo from '../../assets/images/netlify.svg';
import githubSourceLogo from '../../assets/images/github-source.svg';

export default function AboutPage(): React.ReactElement {
  return (
    <div className="app-about">
      <h3>About this application</h3>
      <hr />
      <h4>Tech stack used</h4>
      <section>
        <a href="https://react.dev/" target="_blank" rel="noreferrer">
          <img src={reactLogo} alt="React logo" width={24} height={24} />
          <span>React</span>
        </a>
      </section>
      <section>
        <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">
          <img src={viteLogo} alt="Vite logo" width={24} height={24} />
          <span>Vite</span>
        </a>
      </section>
      <section>
        <a
          href="https://www.typescriptlang.org/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={typescriptLogo}
            alt="Typescript logo"
            width={24}
            height={24}
          />
          <span>Typescript</span>
        </a>
      </section>
      <section>
        <a href="https://sass-lang.com/" target="_blank" rel="noreferrer">
          <img src={sassLogo} alt="SASS logo" width={24} height={24} />
          <span>SASS</span>
        </a>
      </section>
      <section>
        <a href="https://reactrouter.com/" target="_blank" rel="noreferrer">
          <img
            src={reactRouterLogo}
            alt="React Router logo"
            width={24}
            height={24}
          />
          <span>React Router</span>
        </a>
      </section>
      <section>
        <a href="https://playwright.dev/" target="_blank" rel="noreferrer">
          <img
            src={playwrightLogo}
            alt="Playwright logo"
            width={24}
            height={24}
          />
          <span>Playwright</span>
        </a>
      </section>

      <hr />
      <h4>Architecture</h4>
      <section>
        <a href="https://render.com/" target="_blank" rel="noreferrer">
          <img src={renderLogo} alt="Render logo" width={24} height={24} />
          <span>Render - Cloud Application Platform</span>
        </a>
      </section>
      <section>
        <a
          href="https://www.redhat.com/en/topics/api/what-is-a-rest-api"
          target="_blank"
          rel="noreferrer"
        >
          <img src={restApiLogo} alt="Rest Api logo" width={24} height={24} />
          <span>Rest Api</span>
        </a>
      </section>
      <section>
        <a href="https://nodejs.org/en" target="_blank" rel="noreferrer">
          <img src={nodeJsLogo} alt="Node JS logo" width={24} height={24} />
          <span>Node JS</span>
        </a>
      </section>
      <section>
        <a href="https://nodejs.org/en" target="_blank" rel="noreferrer">
          <img src={mongoDbLogo} alt="Mongo DB logo" width={24} height={24} />
          <span>Mongo DB</span>
        </a>
      </section>

      <hr />
      <h4>Hosted on</h4>
      <section>
        <a href="https://www.netlify.com" target="_blank" rel="noreferrer">
          <img src={netlifyLogo} alt="Netlify logo" width={24} height={24} />
          <span>Netlify</span>
        </a>
      </section>

      <hr />
      <h4>Source code</h4>
      <section>
        <a
          href="https://github.com/atm-portfolio/admin"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={githubSourceLogo}
            alt="Github repo logo"
            width="24"
            height="24"
          />
          <span>Github Repo</span>
        </a>
      </section>
    </div>
  );
}
