import { h, render, Component } from "preact";

import WelcomeComponent from "./welcome-component";

class App extends Component {
  render({ userName, welcomeMsg }) {
    if (welcomeMsg) {
      return <WelcomeComponent userName={userName} msg={welcomeMsg} />;
    }

    return <div>Enter code</div>;
  }
}

export default App;
