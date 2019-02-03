import { h, render } from "preact";

import App from "./app";

const { sobr } = window;

render(
  <App assets={sobr.assets} user={sobr.user} missingUser={sobr.missingUser} />,
  document.getElementById("app")
);
