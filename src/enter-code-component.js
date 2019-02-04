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
      <div id="enter-code-component" class="block">
        <div>
          <h1>Hei!</h1>

          <p>Skriv inn koden din (tildelt ord pluss ditt spirit animal).</p>

          <form onSubmit={this.openCode}>
            <input
              type="text"
              value={code}
              onInput={this.updateCode}
              placeholder="akrobatisk-sommerfugl"
            />
            <button class="bl0" type="submit">
              Zing
            </button>
            {!!missingUser && (
              <p class="error">
                {missingUser.split(/[\s-]/).length > 1 ? (
                  <span>
                    Uhm, fant ikke noe med kombinasjonen '{missingUser}', sikker
                    på at du skrev riktig?
                  </span>
                ) : (
                  <span>
                    Koden er en kombinasjon av ett ord og ett dyr. Du skrev '
                    {missingUser}'.
                  </span>
                )}
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default EnterCodeComponent;
