import { h, render, Component } from "preact";

import EnterEmailComponent from "./enter-email-component";

class App extends Component {
  render({ userName, welcomeMsg }) {
    if (welcomeMsg) {
      return <EnterEmailComponent userName={userName} msg={welcomeMsg} />;
    }

    return <div>Enter code</div>;
  }
}

export default App;
