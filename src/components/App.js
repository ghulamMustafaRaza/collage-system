import * as firebase from 'firebase'
import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import NavBar from './NavBar'
import Home from './Home'
import Signin from './Signin'
import Signup from './Signup'
import UserPanel from './UserPanel'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={ 
      user: null
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(()=>{
      this.setState({
          user: firebase.auth().currentUser
      })
    })
  }
  render() {
    return (
    <div className="container-fluid">
      
      <Router>
        <div>
          <NavBar/>
          <Route exact path="/" component={Home}/>
          <Route path="/user" component={UserPanel}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signin" component={Signin}/>
        </div>
      </Router>
      
    </div>
    );
  }
}

export default App;

