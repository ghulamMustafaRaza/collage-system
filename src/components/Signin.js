import React from 'react'
import Loading from './Loading'
import * as firebase from "firebase"
import {BrowserRouter as Router} from "react-router-dom"
// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });

class Signin extends React.Component{
  constructor(props){
    super(props)
    this.state={
      user:null,
      email: '',
      password:'',
      load:false
    }
    this.handleInput=this.handleInput.bind(this)
  }
  handleInput(ev){
    if(ev.target.type==="email"){
      this.setState({
        email: ev.target.value
      })
    }
    else if(ev.target.type==="password"){
      this.setState({
        password: ev.target.value
      })
    }
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user=>this.setState({user, load:true}))
  }
  handleSubmit(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(data=>{
      console.log(data)
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      console.log(errorCode)
      // ...
    });
  }
  render(){
    return(
      <div>
        {!this.state.load?<Loading/>
        :
        <div>
          {!this.state.user?
            <form className="form" id="loginform" onSubmit={ev=>ev.preventDefault()}>
            <div className="form-group">
              <label className="control-label" htmlFor="email">Email:</label>
              <div>
                <input type="email" className="form-control" id="email" onChange={this.handleInput} placeholder="Enter email" name="email"/>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="pwd">Password:</label>
              <div className="">          
                <input type="password" className="form-control" id="pwd" onChange={this.handleInput} placeholder="Enter password" name="pwd"/>
              </div>
            </div>
            <div className="form-group">        
              <div>
                  <button type="submit" onClick={this.handleSubmit.bind(this)} className="btn btn-default">Login</button>
              </div>
            </div>
          </form>
          :
          <div>
            <h1 className="text-center">logged in with {this.state.user.email}</h1>
            <div className="btn btn-danger" onClick={()=>{
              firebase.auth().signOut().then((data)=>{
                console.log(data)
              })
            }}>logout</div><div className="btn btn-primary" onClick={()=>{
              this.props.history.push('/user')  
            }}>Go To User Panel</div>
          </div>
          }
        </div>
        }
      </div>
    )
  }
}

export default Signin