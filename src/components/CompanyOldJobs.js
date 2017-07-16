import React from 'react'
import Loading from "./Loading"
import * as firebase from "firebase"
import JobsView from "./views/JobsView"

export default class AdminAllJobs extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            Jobs : [],
            JobsObj:{},
            JobsKeys : [],
            loading:true
        }
        this.updateState = this.updateState.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    onDelete(ind){
        var keyForFind = this.state.JobsKeys[ind];
        firebase.database().ref('Jobs').child(keyForFind).remove(function (error) {
            if (!error) {
                console.log("remove from firebase")
            }
            else{
                console.log('not removed')
            }
        });
        this.updateState()        
    }
    componentDidMount(){
        this.updateState()
    }
    updateState(){
        firebase.database().ref('Jobs').orderByChild("companyUid").equalTo(firebase.auth().currentUser.uid).once('value').then((snap)=>{
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
                                    <JobsView Job={Job} onDelete={this.onDelete.bind(null, key)}/>
                                </div>
                            ))}
                    </div>
                }
            </div>
        )
    }
}