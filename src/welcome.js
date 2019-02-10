import { h, Component } from "preact";
import { throttle } from "throttle-debounce";
import EnterEmailComponent from "./enter-email-component";

function onScroll() {
  const arrowDown = document.querySelector(".arrow-down");
  const imageWrapper = document.querySelector(".image-wrapper");

  const currentPos = window.scrollY;
  const threshold = Math.min(
    window.innerHeight,
    imageWrapper.offsetTop + imageWrapper.offsetHeight
  );

  const showBefore = threshold / 3.5;

  const arrowHeight = 30;

  if (currentPos < showBefore) {
    arrowDown.style.opacity = "1";
    arrowDown.style.top = `${threshold - arrowHeight * 2 - 20}px`;
    arrowDown.style.left = "20px";
  } else {
    arrowDown.style.opacity = "0";
  }
}

class WelcomeComponent extends Component {
  componentDidMount() {
    this.throttled = throttle(300, onScroll);
    window.addEventListener("scroll", this.throttled);
  }

  componentWllUnmount() {
    if (this.throttled) {
      this.throttled.cancel();
      window.removeEventListener("scroll", this.throttled);
    }
  }

  render({ assets, children, user }) {
    return (
      <div id="welcome-component" class="tc">
        <div class="image-wrapper fw400 f3">
          <p>Mye kos. Litt bryllup.</p>
          <p>ca dd.mm.åååå</p>
          <img src={assets.iceCream} alt="Wedding on top" />
          <img
            onLoad={onScroll}
            class="arrow-down"
            src={assets.arrowDown}
            alt="Arrow pointing down"
          />
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
              e-post. E-post lagres krypta og regnes ikke som påmelding.
            </p>

            <div class="pt3">{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomeComponent;
