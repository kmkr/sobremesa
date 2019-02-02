import { h, Component } from "preact";
import EnterEmailComponent from "./enter-email-component";

class WelcomeComponent extends Component {
  render({ msg }) {
    return (
      <div>
        <h1>April 2020</h1>

        <p>{msg}</p>
      </div>
    );
  }
}

export default WelcomeComponent;
