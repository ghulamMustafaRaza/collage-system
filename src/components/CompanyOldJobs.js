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
        this.onDelete = this.onDelete.bind(this)
        this.updateState = this.updateState.bind(this);
    }
    onDelete(ind){
        // let obj = {...this.state.csvObj};
        // var keyForFind = this.state.JobsKeys[ind];
        // var findedObjKey; 
        // var obj = this.state.snapObj;
        // for(let a in obj){
        //     let childObj = obj[a];
        //     if(keyForFind in childObj){
        //         findedObjKey = a;
        //     }
        // }
        // console.log({keyForFind,findedObjKey})
        firebase.database().ref('Jobs').child(firebase.auth().currentUser.uid).child(this.state.JobsKeys[ind]).remove(function (error) {
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
        firebase.database().ref('Jobs/'+ firebase.auth().currentUser.uid).once('value').then((snap)=>{
            var snapObj = snap.val();
            var snapVals = [];
            var snapKeys = [];
            for(let key in snapObj){
                snapKeys.push(key)
                snapVals.push(snapObj[key])
            }
            this.setState({
                Jobs : snapVals,
                JobsKeys : snapKeys,
                JobsObj: snapObj,
                loading: false
            })
            console.log(this.state.cvs)
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