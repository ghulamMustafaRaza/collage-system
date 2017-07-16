import React from 'react'
import Loading from './Loading'
import * as firebase from "firebase"
import {Link} from "react-router-dom"

class Signin extends React.Component{
  constructor(props){
    super(props)
    this.state={
      email: '1q2w3e.gm@gmail.com',
      password:'123456',
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
    firebase.auth().onAuthStateChanged(()=>{
      if(firebase.auth().currentUser){
        this.props.history.push('/user')
      }else{
        this.setState({load: true})
      }
    })
  }
  handleSubmit(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(data=>{
      console.log(data)
    }).catch(function(error) {
      alert(error.message)
    });
  }
  render(){
    return(
      <div>
        {!this.state.load?<Loading/>
        :
          <form className="form" id="loginform" onSubmit={ev=>ev.preventDefault()}>
            <div className="form-group">
              <label className="control-label" htmlFor="email">Email:</label>
              <div>
                <input type="email" className="form-control" value={this.state.email} id="email" onChange={this.handleInput} placeholder="Enter email" name="email"/>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="pwd">Password:</label>
              <div className="">          
                <input type="password" className="form-control" id="pwd" value={this.state.password} onChange={this.handleInput} placeholder="Enter password" name="pwd"/>
              </div>
            </div>
            <div className="form-group">        
              <div>
                  <button type="submit" onClick={this.handleSubmit.bind(this)} className="btn btn-default">Login</button>
              </div>
            </div>
            <Link className="pull-left" to="/signup">Create A Account</Link>
          </form>
        }
      </div>
    )
  }
}

export default Signin