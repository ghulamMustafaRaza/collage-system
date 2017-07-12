import React from 'react'
import {Link} from 'react-router-dom'
class Students extends React.Component{
    render(){
        return(
            <div className="">
                <div className="fullheight">
                    <nav className="navbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/signin"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                        </ul>
                    </nav>
                    <h1 className="text-center">Student</h1>                    
                </div>
            </div>
        )
    }
}
export default Students