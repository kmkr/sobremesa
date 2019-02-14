import { h, Component } from "preact";
import { throttle } from "throttle-debounce";

class WelcomeComponent extends Component {
  constructor() {
    super();
    this.scrollToWelcomeContent = this.scrollToWelcomeContent.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.throttled = throttle(100, this.onScroll);
    window.addEventListener("scroll", this.throttled);
  }

  onScroll() {
    const currentPos = window.scrollY;
    const showArrow =
      currentPos + window.innerHeight < this.welcomeTitleElem.offsetTop + 70;

    this.arrowDownElem.style.opacity = showArrow ? "1" : "0";
  }

  componentWllUnmount() {
    if (this.throttled) {
      this.throttled.cancel();
      window.removeEventListener("scroll", this.throttled);
    }
  }

  scrollToWelcomeContent() {
    if (this.welcomeTitleElem) {
      this.welcomeTitleElem.scrollIntoView({ behavior: "smooth" });
    }
  }

  render({ children, user }) {
    return (
      <div id="welcome-component" class="tc">
        <div class="image-wrapper fw400 f3">
          <p>Mye kos. Litt bryllup.</p>
          <p>ca 19. juni 2020</p>
          <img
            src="https://s3.eu-north-1.amazonaws.com/sobremesa.xyz/images/icecream-264.png"
            alt="Wedding on top"
          />
          <img
            ref={arrowDownElem => (this.arrowDownElem = arrowDownElem)}
            onLoad={this.onScroll}
            onClick={this.scrollToWelcomeContent}
            class="arrow-down"
            src="https://s3.eu-north-1.amazonaws.com/sobremesa.xyz/images/arrow-down.png"
            alt="Arrow pointing down"
          />
        </div>

        <div
          class="block"
          ref={welcomeTitleElem => (this.welcomeTitleElem = welcomeTitleElem)}
        >
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
