import React, { Component } from 'react';
import firebase from 'firebase';

import logo from './logo.svg';
import './App.css';

import Auth from './components/auth/Auth';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }

    this.logout = this.logout.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log('logged in');
        this.getCurrentUser(user);
      } else {
        // No user is signed in.
        console.log('no user');
      }
    });
  }

  getCurrentUser(user) {

    // const user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      this.setState({
        user: user.email,
        userImg: user.photoUrl,
      });
      console.log(user);
    } else {
      // No user is signed in.
    }
  }

  logout() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log('Signout successful');
      this.setState({
        user: null,
      });
    }).catch((error) => {
      // An error happened.
      console.log('Logging out error ', error);
    });
  }

  getUserProfileDetails() {

    // Storage Bucket for image store
    // Map full profile to an Object
    const user = firebase.auth().currentUser;
    let name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }
  }

  uploadPicture(file) {

    console.log('uploaded files from App', file);

    let storageRef = this.props.storage.ref();

    let imagesRef = storageRef.child('profile_images');

    // if (imagesRef.location.path === 'profile_images') {
      let fileName = `${this.state.user}/image`;

      let profileRef = imagesRef.child(fileName);

      let path = profileRef.fullPath

      let name = profileRef.name

      // Points to 'images'
      let imagesRefP = profileRef.parent;

      let fileToSave = file;

      profileRef.put(file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
      });
    // }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Firebase Authentication</h2>
          <h4>Using email and password</h4>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Auth
          user={ this.state.user }
          logout={ this.logout }
          uploadPicture={ this.uploadPicture }
        />
      </div>
    );
  }
}

export default App;
