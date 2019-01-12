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

  saveEmail = e => {
    e.preventDefault();
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
        <form onSubmit={this.saveEmail}>
          <input
            class="mr2"
            type="text"
            disabled={loading}
            required
            type="email"
            value={email}
            onInput={this.updateEmail}
          />
          <button type="submit" disabled={loading}>
            Zing
          </button>
          {invalid && <p class="error">Vi trenger en gyldig e-postadresse</p>}
          {success && <p class="success">Yay! Takk.</p>}
        </form>
      </div>
    );
  }
}

export default EnterEmailComponent;
