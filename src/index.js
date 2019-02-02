import { h, render } from "preact";

import App from "./app";

const { sobr, sobrMissingUser } = window;

render(
  <App user={sobr.user} missingUser={sobrMissingUser} />,
  document.getElementById("app")
);
