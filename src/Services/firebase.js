import React from 'react';
import * as firebase from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyCS9vQPBl9eAXrioxlZn__qgE250rY_I3o",
  authDomain: "react-project-967f1.firebaseapp.com",
  databaseURL: "https://react-project-967f1.firebaseio.com",
  projectId: "react-project-967f1",
  storageBucket: "react-project-967f1.appspot.com",
  messagingSenderId: "670880918875",
  appId: "1:670880918875:web:c67ae57fe8422608e33e7e",
  measurementId: "G-1P5NTFYVZ9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;
