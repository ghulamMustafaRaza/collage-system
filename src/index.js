import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyALcgX5WfqyWShcm_c-DCZ0LoHNWOfT3hA",
    authDomain: "react-todo-app-7085b.firebaseapp.com",
    databaseURL: "https://react-todo-app-7085b.firebaseio.com",
    projectId: "react-todo-app-7085b",
    storageBucket: "react-todo-app-7085b.appspot.com",
    messagingSenderId: "472061485174"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();