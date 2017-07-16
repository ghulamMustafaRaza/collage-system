import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyBboHSN7YU3XXM1qVwUgWNsOVdmU42xASk",
    authDomain: "campus-recruitment-syste-a2588.firebaseapp.com",
    databaseURL: "https://campus-recruitment-syste-a2588.firebaseio.com",
    projectId: "campus-recruitment-syste-a2588",
    storageBucket: "",
    messagingSenderId: "393166413721"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, root);
registerServiceWorker(); 