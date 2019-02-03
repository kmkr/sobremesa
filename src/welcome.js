import { h, Component } from "preact";
import EnterEmailComponent from "./enter-email-component";

class WelcomeComponent extends Component {
  render({ assets, user }) {
    const inviterSpecificMsg =
      user.inviter === "km"
        ? "E-post lagres krypta og regnes ikke som påmelding."
        : "Vi lover å ikke selge e-post til tredjeparter, og den regnes ikke som påmelding.";
    return (
      <div id="welcome-component" class="tc">
        <h1>Juni 2020</h1>
        <div class="image-wrapper">
          <img src={assets.iceCream} alt="Wedding on top" />
        </div>

        <div class="block">
          <p>{user.welcomeMsg}</p>

          <h2>Litt praktisk info</h2>

          <p>
            Du får snart mer informasjon angående nøyaktig dato og hvor det hele
            skal skje. For å gi deg denne informasjonen trenger vi din e-post.{" "}
            {inviterSpecificMsg}
          </p>
        </div>
      </div>
    );
  }
}

export default WelcomeComponent;
