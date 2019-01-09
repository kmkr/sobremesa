import { h, render, Component } from "preact";

const { sobrWelcomeMsg: welcomeMsg } = window;

render(
  <div>
    <p>Helllo!</p>

    {!!welcomeMsg && <p>{welcomeMsg}</p>}

    <button onClick={e => alert("hi!")}>Click Me</button>
  </div>,
  document.body
);
