import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCPF_KgqSqqBN8P47LClidabBa-0Jsh-cs",
  authDomain: "authtest-25bea.firebaseapp.com",
  databaseURL: "https://authtest-25bea.firebaseio.com",
  storageBucket: "authtest-25bea.appspot.com",
  messagingSenderId: "475464838187"
};

firebase.initializeApp(config);

const storage = firebase.storage();


ReactDOM.render(
  <App storage={ storage } />,
  document.getElementById('root')
);
