import * as firebase from 'firebase'
import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import NavBar from './NavBar'
import Home from './Home'
import Students from './Students'
import Teachers from './Teachers'
import Admin from './Admin'
import Signin from './Signin'
import Signup from './Signup'


// const Heading = props=>(<h1 className="text-center">{props.child}</h1>);
class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={ 
      user: {
        displayName :null,
        email : null,
        emailVerified : null,
        photoURL : null,
        isAnonymous : null,
        uid : null,
        providerData : null
      }
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      this.setState({
      user: {
        displayName : user.displayName,
        email : user.email,
        emailVerified : user.emailVerified,
        photoURL : user.photoURL,
        isAnonymous : user.isAnonymous,
        uid : user.uid,
        providerData : user.providerData
      }
    })
    console.log(this.state)
      // ...
    } else {
      // User is signed out.
      this.setState({
        user: {
          displayName :null,
          email : null,
          emailVerified : null,
          photoURL : null,
          isAnonymous : null,
          uid : null,
          providerData : null
        }
      })
    }
  }.bind(this));
  }
  render() {
    return (
    <div className="container-fluid">
      <Router>
        <div>
          <NavBar user={this.state.user}/>
          <Route exact path="/" component={Home}/>
          <Route path="/students" component={Students}/>
          <Route path="/teachers" component={Teachers}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/signup" component={()=><Signup user={this.state.user}/>}/>
          <Route path="/signin" component={(props)=>(<Signin user={this.state.user}/>)}/>
        </div>
      </Router>
    </div>
    );
  }
}

export default App;

