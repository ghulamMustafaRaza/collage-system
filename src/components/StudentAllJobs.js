import React from 'react'
import Loading from "./Loading"
import * as firebase from "firebase"
import JobsView from "./views/JobsView"

export default class StudentAllJobs extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            Jobs : [],
            JobsObj:{},
            JobsKeys : [],
            loading:true
        }
    }
    onApply(ind){
        let currentUser = firebase.auth().currentUser;
        let key = this.state.JobsKeys[ind];
        firebase.database().ref('CV/'+currentUser.uid).once('value').then(snap=>{
            var userCV = snap.val();
            if(!userCV) {
                userCV = {
                    name: currentUser.displayName,
                    email: currentUser.email
                }
            }
            firebase.database().ref('Jobs/'+key).child('apply').child(currentUser.uid).set(userCV)
        })
    }
    componentDidMount(){
        firebase.database().ref('Jobs').once('value').then((snap)=>{
            var snapObj = snap.val();
            var snapVals = [];
            var snapKeys = [];
            for(let o in snapObj){
                snapVals.push((snapObj[o]))
                snapKeys.push(o)
            }
            this.setState({
                Jobs : snapVals,
                JobsKeys : snapKeys,
                JobsObj: snapObj,
                loading: false
            })
        }).catch(err=>{console.log(err)})
    }
    render(){
        return(
            <div>
                <div className="page-header">
                    All Jobs's
                </div>
                {
                    this.state.loading? <Loading/>
                    :
                    !this.state.Jobs.length?
                        <h1 className="text-senter">No Jobs In This </h1>
                    :
                    <div>
                            {this.state.Jobs.map((Job,key)=>(
                                <div key={key}>
                                    <JobsView ind={key} onApply={this.onApply.bind(this, key)} Job={Job}/>
                                </div>
                            ))}
                    </div>
                }
            </div>
        )
    }
}