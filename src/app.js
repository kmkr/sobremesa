import { h, render, Component } from "preact";

import EnterEmailComponent from "./enter-email-component";
import EnterCodeComponent from "./enter-code-component";
import WelcomeComponent from "./welcome";

class App extends Component {
  render({ assets, user, missingUser }) {
    if (user) {
      return (
        <div>
          <WelcomeComponent assets={assets} user={user}>
            <EnterEmailComponent userName={user.name} />
          </WelcomeComponent>
        </div>
      );
    }

    return (
      <div class="block">
        <EnterCodeComponent missingUser={missingUser} />
      </div>
    );
  }
}

export default App;
