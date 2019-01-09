import { h, render, Component } from "preact";

render(
  <div>
    <span>Hello, world!</span>
    <button onClick={e => alert("hi!")}>Click Me</button>
  </div>,
  document.body
);
