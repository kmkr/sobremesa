import { h, render } from "preact";
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

import App from "./app";

const { sobr } = window;

render(
  <App assets={sobr.assets} user={sobr.user} missingUser={sobr.missingUser} />,
  document.getElementById("app")
);
