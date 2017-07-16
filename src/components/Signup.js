import React from 'react'
import * as firebase from "firebase"
import Loading from "./Loading"
import {Link} from "react-router-dom"
// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });

class Signup extends React.Component{
  constructor(props){
    super(props)
    this.state={
      user:null,
      email: '',
      password:'',
      name:'',
      type:'student',
      load: false
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
    else if(ev.target.type==="text"){
      this.setState({
        name: ev.target.value
      })
    }
  }
  handleSubmit(){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      // ...
    })
    .then((data)=>{
      console.log('data',data)
      firebase.auth().currentUser.updateProfile({
        displayName: this.state.name
      })
      var uid = firebase.auth().currentUser.uid;
      firebase.database().ref('user/'+uid).set({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        type: this.state.type
      })
      this.state.type === "student"?
        this.props.history.push("/user/student/mycv")
      :
        this.props.history.push("/user/company/postAJob")
    })
  }
  handleRadio(ev){
    this.setState({
      type: ev.target.value
    })
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user=>this.setState({user,load:true}))
  }
  render(){
    return(
      <div>
        {!this.state.load?<Loading/>
        :
        <div>
          {!this.state.user?<form className="form" id="loginform" onSubmit={ev=>ev.preventDefault()}>
            <div className="form-group">
              <label className="" htmlFor="email">Name:</label>
              <div className="">
                <input type="text" className="form-control" id="name" onChange={this.handleInput} placeholder="Enter Name" name="email"/>
              </div>
            </div>
            <div className="form-group">
              <label className="" htmlFor="email">Email:</label>
              <div className="">
                <input type="email" className="form-control" id="email" onChange={this.handleInput} placeholder="Enter email" name="email"/>
              </div>
            </div>
            <div className="form-group">
              <label className="" htmlFor="pwd">Password:</label>
              <div className="">          
                <input type="password" className="form-control" id="pwd" onChange={this.handleInput} placeholder="Enter password" name="pwd"/>
              </div>
            </div>
            <div className="form-group radio" style={{}}>        
              <div className="radio" value={this.state.type}>
                <input type="radio" name="type" className="" value="student" onClick={this.handleRadio.bind(this)} id="student"/><label htmlFor="student">student</label>
              </div>
              <div className="radio" value={this.state.type}>
                <input type="radio" name="type" className="" value="company" onClick={this.handleRadio.bind(this)} id="company"/><label htmlFor="company">company</label>              
              </div>
            </div>
            <div className="form-group">        
              <div className="">
                <button type="submit" onClick={this.handleSubmit.bind(this)} className="btn btn-default">Submit</button>
              </div>
            </div>
            <Link className="pull-left" to="/signin">Already A Account</Link>
          </form>
          :
          <div>
            <h1 className="text-center">logged in with {this.state.user.email}</h1>
            <div className="btn btn-danger" onClick={()=>{
              firebase.auth().signOut().then((data)=>{
                console.log(data)
              })
            }}>logout</div>
            <div className="btn btn-primary" onClick={()=>{
              this.props.history.push('/user')  
            }}>Go To User Panel</div>
            <div className="btn btn-primary" onClick={()=>{
              this.props.history.push('/user/student/mycv')  
            }}>updat cv</div>
            
          </div>
          }
        </div>
        }
      </div>
    )
  }
}

export default Signup