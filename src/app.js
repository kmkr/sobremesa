import { h, render, Component } from "preact";

import EnterEmailComponent from "./enter-email-component";
import EnterCodeComponent from "./enter-code-component";

class App extends Component {
  render({ userName, welcomeMsg, missingUser }) {
    if (userName) {
      return <EnterEmailComponent userName={userName} msg={welcomeMsg} />;
    }

    return <EnterCodeComponent missingUser={missingUser} />;
  }
}

export default App;
