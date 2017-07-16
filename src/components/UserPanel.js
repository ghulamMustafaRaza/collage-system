import React,{Component as C} from 'react'
import * as firebase from "firebase"
import userImg from "../img/user.png"
import Loading from "./Loading"
import CVMaker from "./CVMaker"
import JobMaker from "./JobMaker"
import StudentAllJobs from "./StudentAllJobs"
import CompanyAllCV from "./CompanyAllCV"
import CompanyOldJobs from "./CompanyOldJobs"
import {AdminAllCV,AdminAllJobs,AdminAllCompanies,AdminAllStudents} from './Admin'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class UserPanel extends C{
    constructor(props){
        super(props)
        this.state={
            user:null,
            dataBase: null,
            load: false,
        }
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(()=>{
            var user = firebase.auth().currentUser;
            if(user){
                var uid = firebase.auth().currentUser.uid;
                firebase.database().ref('user/'+uid).once('value',(snapshot)=>{
                    let localD = snapshot.val();
                    this.setState({dataBase:localD,load: true});
                }).catch((err)=>{
                    console.log(err)
                })
                this.setState({
                    user: firebase.auth().currentUser
                })
            }
            else{
                this.props.history.push('/signin')
            }
        })
    }
    
    render(){
        return(
            <div className="">
                {!this.state.load?
                    <Loading/>
                :
                <Router>
                    <div className="container">
                        <div className="container userpanel">
                            <div className="row">
                                <div className="col-xs-4">
                                    <img src={((this.state.user&&this.state.user.photoURL)||userImg)} alt="" style={{width:200,maxWidth:"100%"}}  />
                                </div>
                                <div style={{fontSize:"120%"}} className="col-xs-8" >
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>User Type:</th>
                                                <th> {this.state.dataBase.type}</th>
                                            </tr>
                                            <tr>
                                                <th>User Email:</th>
                                                <th>{this.state.dataBase.email}</th>
                                            </tr>
                                            <tr>
                                                <th>User Name:</th>
                                                <th>{this.state.dataBase.name}</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {this.state.dataBase.type === "admin"?
                                <div>
                                    <Link className="btn" to="/user/admin/alljobs">all jobs</Link>
                                    <Link className="btn" to="/user/admin/allcv">all CV</Link>
                                    <Link className="btn" to="/user/admin/allstudent">all Student</Link>
                                    <Link className="btn" to="/user/admin/allcompany">all Company</Link>
                                </div>
                            :this.state.dataBase.type === "student"?
                                <div>
                                    <Link className="btn" to="/user/student/alljobs">all jobs</Link>
                                    <Link className="btn" to="/user/student/mycv">My CV</Link>
                                </div>
                            :
                                <div>
                                    <Link className="btn" to="/user/company/postAJob">Post A Job</Link>
                                    <Link className="btn" to="/user/company/ourJobs">Ouer Old Jobs</Link>
                                    <Link className="btn" to="/user/company/allCV">All CV's</Link>
                                </div>
                            }
                        </div>
                        <div style={{margin: 80}}>
                            {this.state.dataBase.type === "admin"?
                                <div>
                                <Route path="/user/admin/allcv" component={AdminAllCV}/>
                                <Route path="/user/admin/alljobs" component={AdminAllJobs} />
                                <Route path="/user/admin/allcompany" component={AdminAllCompanies} />
                                <Route path="/user/admin/allstudent" component={AdminAllStudents} />
                                </div>
                            :this.state.dataBase.type === "student"?
                                <div>
                                <Route path="/user/student/alljobs" component={StudentAllJobs}/>
                                <Route path="/user/student/mycv" component={CVMaker} />
                                </div>
                            :
                                <div>
                                <Route path="/user/company/postAJob" component={JobMaker} />
                                <Route path="/user/company/ourJobs" component={CompanyOldJobs}/>
                                <Route path="/user/company/allCV" component={CompanyAllCV}/>
                                </div>
                            }
                        {/*{this.props.child}*/}
                        </div>
                    </div>
                </Router>
                }
            </div>
        )
    }
}
