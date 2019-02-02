import { h, render, Component } from "preact";

import EnterEmailComponent from "./enter-email-component";
import EnterCodeComponent from "./enter-code-component";
import WelcomeComponent from "./welcome";

class App extends Component {
  render({ userName, welcomeMsg, missingUser }) {
    if (userName) {
      return (
        <div>
          <WelcomeComponent msg={welcomeMsg} />
          <EnterEmailComponent userName={userName} />
        </div>
      );
    }

    return <EnterCodeComponent missingUser={missingUser} />;
  }
}

export default App;
