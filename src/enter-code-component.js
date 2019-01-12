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

  openCode = () => {
    const code = this.state.code.replace(/\s/, "-");
    window.location.href = [
      window.location.href,
      "?",
      "spirit",
      "=",
      code
    ].join("");
  };

  render({}, { code }) {
    return (
      <div>
        <p>Hei! Skriv inn koden du har fått av oss.</p>

        <input
          value={code}
          onInput={this.updateCode}
          placeholder="akrobatisk-sommerfugl"
        />
        <button onClick={this.openCode}>Zing</button>
      </div>
    );
  }
}

export default EnterCodeComponent;
