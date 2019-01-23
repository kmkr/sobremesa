import { h, Component } from "preact";

class EnterCodeComponent extends Component {
  constructor() {
    super();
    this.state = {
      code: ""
    };
  }

  updateCode = e => {
    const code = e.currentTarget.value;
    this.setState({
      code
    });
  };

  openCode = e => {
    e.preventDefault();
    const code = this.state.code.replace(/\s/, "-");
    window.location.href = [
      window.location.origin,
      "?",
      "spirit",
      "=",
      code
    ].join("");
  };

  render({ missingUser }, { code }) {
    return (
      <div>
        <p>Hei! Skriv inn koden du har fått av oss (ett ord pluss ett dyr).</p>

        <form onSubmit={this.openCode}>
          <input
            class="mr2"
            type="text"
            required
            value={code}
            onInput={this.updateCode}
            placeholder="akrobatisk-sommerfugl"
          />
          <button type="submit">Zing</button>
          {!!missingUser && (
            <p class="error">
              {missingUser.split(" ").length > 1 ? (
                <span>
                  Uhm, fant ikke noe med kombinasjonen '{missingUser}', sikker
                  på at du skrev riktig?
                </span>
              ) : (
                <span>
                  Koden er en kombinasjon av et ord og et dyr. Du skrev '
                  {missingUser}'.
                </span>
              )}
            </p>
          )}
        </form>
      </div>
    );
  }
}

export default EnterCodeComponent;
