import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from "firebase";
// import Redux from 'redux'
// import {Provider} from 'react-redux'
// import { createStore, applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'

// var userReducer = (state , action)=>{
//     switch (action.type) {
//         case 'SET_USER':
//             state ={
//                 ...state,
//                 user:action.payload
//             }
//         break;
//     }
// }
// var store = createStore(userReducer,{user:null},applyMiddleware(thunk)) 
// store.subscribe((a,b,c,d)=>{
//     console.log(a,b,c,d)
// })
// store.dispatch({
//     type: 'SET_USER',
//     payload:{
//         name:"ghulam"
//     }
// })
var config = {
    apiKey: "AIzaSyD0bFCG6AYvsLYwgWpcChT-GsVZD7PlhWM",
    authDomain: "college-system.firebaseapp.com",
    databaseURL: "https://college-system.firebaseio.com",
    projectId: "college-system",
    storageBucket: "",
    messagingSenderId: "731872611024"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, root);
registerServiceWorker(); 