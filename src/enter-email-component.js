import { h, Component } from "preact";

import { post } from "./fetch-wrapper";

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

class EnterEmailComponent extends Component {
  updateEmail = e => {
    const { hasSubmitted } = this.state;
    const email = e.currentTarget.value;
    this.setState({
      sucess: false,
      email
    });

    if (hasSubmitted) {
      this.setState({
        invalid: !validateEmail(email)
      });
    }
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.saveEmail();
    }
  };

  saveEmail = () => {
    const { userName } = this.props;
    const { email } = this.state;
    this.setState({
      success: false,
      hasSubmitted: true
    });
    if (!validateEmail(email)) {
      this.setState({
        invalid: true
      });
      return;
    }
    if (email)
      this.setState({
        error: false,
        loading: true
      });
    post("/user", {
      userName,
      email
    })
      .then(() => {
        this.setState({
          email: "",
          success: true,
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true
        });
      });
  };

  render({ msg }, { error, email, invalid, loading, success }) {
    return (
      <div>
        <p>Helllo!</p>

        <p>{msg}</p>

        {error && <p>Uffda, det fungerte ikke. Prøv på nytt?</p>}
        <input
          disabled={loading}
          type="email"
          value={email}
          onKeyDown={this.handleKeyDown}
          onInput={this.updateEmail}
        />
        <button onClick={this.saveEmail} disabled={loading}>
          Zing
        </button>
        {invalid && <p>Vi trenger en gyldig e-postadresse</p>}
        {success && <p>Yay! Takk.</p>}
      </div>
    );
  }
}

export default EnterEmailComponent;
