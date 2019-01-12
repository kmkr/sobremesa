import { h, render } from "preact";

import App from "./app";

const { sobrWelcomeMsg, sobrUserName } = window;

render(
  <App welcomeMsg={sobrWelcomeMsg} userName={sobrUserName} />,
  document.body
);
