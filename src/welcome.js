import { h, Component } from "preact";
import EnterEmailComponent from "./enter-email-component";

class WelcomeComponent extends Component {
  render({ assets, children, user }) {
    const inviterSpecificMsg =
      user.inviter === "km"
        ? "E-post lagres krypta og regnes ikke som påmelding."
        : "Vi lover å ikke selge e-post til tredjeparter, og den regnes ikke som påmelding.";
    return (
      <div id="welcome-component" class="tc">
        <div class="image-wrapper b f3">
          <p>Mye kos. Litt bryllup.</p>
          <p>ca dd.mm.åååå</p>
          <img src={assets.iceCream} alt="Wedding on top" />
        </div>

        <div class="block">
          <div class="pv4">
            <h2>{user.welcomeTitle}</h2>
            <p>{user.welcomeMsg}</p>
          </div>
        </div>

        <div class="pv4 bg-blue">
          <div class="block">
            <h2>Kult. Hva nå?</h2>

            <p>
              Du får snart mer informasjon angående nøyaktig dato og hvor det
              hele skal skje. For å gi deg denne informasjonen trenger vi din
              e-post. {inviterSpecificMsg}
            </p>

            <div class="pt3">{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomeComponent;
