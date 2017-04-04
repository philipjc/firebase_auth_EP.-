import React from 'react';
import firebase from 'firebase';

class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }

    this.emailChange = this.emailChange.bind(this);
    this.buttonSubmit = this.buttonSubmit.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.validateUserDetails = this.validateUserDetails.bind(this);
  }

  emailChange(evt) {
    this.setState({
      email: evt.target.value
    });
  }

  passwordChange(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  validateUserDetails() {
    const email = this.state.email;
    const password = this.state.password;

    if (email !== '' && password !== '') {
      return true;
    }

    return false;

  }

  buttonSubmit(e) {
    e.preventDefault();

    const validated = this.validateUserDetails();

    if (validated) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
      });
    }
    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    return (
      <div className="Signup">

        <div className="Signup-header">
          <h2>Signup</h2>
        </div>

        <div className="Signup-email">
          <label htmlFor="email">
            <input
              type="text"
              id="email"
              onChange={ this.emailChange }
              value={ this.state.email }
            />
          </label>
        </div>

        <div className="Signup-password">
          <label htmlFor="password">
            <input
              type="text"
              id="password"
              onChange={ this.passwordChange }
              value={ this.state.password}
            />
          </label>
        </div>

        <div>
          <button onClick={ this.buttonSubmit } >Signup</button>
        </div>

      </div>
    );
  }

}

export default Signup;
