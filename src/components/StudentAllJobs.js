import React from 'react'
import Loading from "./Loading"
import * as firebase from "firebase"
import JobsView from "./views/JobsView"

export default class StudentAllJobs extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            snapObj :{},
            Jobs : [],
            JobsObj:{},
            JobsKeys : [],
            pureKeys: [],
            pureVals: [],
            loading:true
        }
    }
    componentDidMount(){
        firebase.database().ref('Jobs').once('value').then((snap)=>{
            var snapObj = snap.val();
            var unCVals = [];
            var unCKeys = [];
            for(let o in snapObj){
                unCKeys.push(o)
                unCVals.push(snapObj[0])
            }
            var snapVals = [];
            var snapKeys = [];
            for(let obj in snapObj){
                let value =[];
                let key =[];
                for(let a in snapObj[obj]){
                    // console.log(a)
                    key.push(a)
                    value.push(snapObj[obj][a])
                }
                snapVals = [...snapVals , ...value]
                snapKeys = [...snapKeys , ...key]
            }
            this.setState({
                Jobs : snapVals,
                JobsKeys : snapKeys,
                JobsObj: snapObj,
                pureKeys: unCKeys,
                pureVals: unCVals,
                loading: false,
                snapObj
            })
            // console.log(this.props.cvs)
            console.log(this.state.cvs)

            // alert('run')
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
                                    <JobsView Job={Job}/>
                                </div>
                            ))}
                    </div>
                }
            </div>
        )
    }
}