import React from "react"
import * as firebase from 'firebase'
import {Link} from "react-router-dom"
import logo from '../logo.gif'

class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:null
        }
    }
    componentWillMount(){
        firebase.auth().onAuthStateChanged(user=>this.setState({user}))
    }
    render(){
        return(
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>                        
                    </button>
                        <Link  to="/"><img src={logo} alt="logo" className="navbar-brand" /></Link>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                    {this.state.user?<ul className="nav navbar-nav navbar-right">
                            <li onClick={()=>{firebase.auth().signOut()}}> <Link to="/signin"><span className="glyphicon glyphicon-log-out"></span> Log Out</Link></li>
                            <li>
                                <Link to="/user"><span className="glyphicon glyphicon-user"></span> UserPanel</Link>                                
                            </li>
                        </ul>
                        :
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/signin"><span className="glyphicon glyphicon-log-in"></span> Login</Link>
                            </li>
                            <li>
                                <Link to="/signup"><span className="glyphicon glyphicon-user"></span> SignUp</Link>
                            </li>
                        </ul>}
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar;