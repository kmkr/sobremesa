import { h, render, Component } from "preact";

import EnterEmailComponent from "./enter-email-component";
import EnterCodeComponent from "./enter-code-component";
import WelcomeComponent from "./welcome";

class App extends Component {
  render({ user, missingUser }) {
    if (user) {
      return (
        <div>
          <WelcomeComponent user={user} />
          <EnterEmailComponent userName={user.name} />
        </div>
      );
    }

    return <EnterCodeComponent missingUser={missingUser} />;
  }
}

export default App;
