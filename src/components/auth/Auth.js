import React from 'react';
import classnames from 'classnames';
import './Auth.css';

import Login from '../login/Login';
import Signup from '../signup/Signup';
import Profile from '../profile/Profile';

class Auth extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menu: false
    }

    this.logout = this.logout.bind(this);
    this.menuState = this.menuState.bind(this);
  }

  menuState() {
    // Don't forget, setting state is basd
    this.setState({
      menu: !this.state.menu,
    });
  }

  logout(evt) {
    evt.preventDefault();
    this.props.logout();
  }

  renderSignOut() {
    return (
      <div className="logout">
        <button className="logout__btn" onClick={ this.logout }>
          Signout
        </button>
      </div>
    )
  }

  render() {

    const user = this.props.user;

    const signOutButton = user ? this.renderSignOut() : null;

    const authClass = classnames('authentication', {
      'active': this.state.menu,
    });

    return (
      <div className={ authClass }>
        <div className="bars">
          <i className="fa fa-bars" onClick={ this.menuState } ></i>
        </div>

        <Profile user={ this.props.user} uploadPicture={ this.props.uploadPicture } />

        <Login user={ this.props.user || null } />
        <Signup user={ this.props.user || null } />

        { signOutButton }

      </div>
    );
  }

}

export default Auth;
