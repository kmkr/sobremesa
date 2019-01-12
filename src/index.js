import { h, render } from "preact";

import App from "./app";

const { sobrWelcomeMsg, sobrUserName, sobrMissingUser } = window;

render(
  <App
    welcomeMsg={sobrWelcomeMsg}
    userName={sobrUserName}
    missingUser={sobrMissingUser}
  />,
  document.body
);
