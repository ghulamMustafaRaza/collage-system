import React from "react"
import {Link} from "react-router-dom"
import logo from '../logo.gif'

const NavBar = function(props){
    console.log(props.user)
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
                {props.user.email?<ul className="nav navbar-nav"><li>
                        <Link to="/students">Student's Portal</Link>
                    </li>
                    <li>
                        <Link to="/teachers">Teacher's Portal</Link>
                    </li>
                    <li>
                        <Link to="/admin">Admin panel</Link>
                    </li></ul>
                    :
                    <ul className="nav navbar-nav"><li>
                        <Link to="/signin">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">SignUp</Link>
                    </li></ul>}
                </div>
            </div>
        </nav>
    )
}

export default NavBar;