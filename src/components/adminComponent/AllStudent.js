import React from 'react'
import Loading from "../Loading"
import * as firebase from "firebase"
import StudentView from "../views/StudentView"

export default class AllStudent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            users: null,
            students: null,
            studentKey: null,
            studentData: null
        }
        this.updateState = this.updateState.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }
    onDelete(ind){
        let refKey = this.state.studentKey[ind];
        firebase.database().ref('user/'+refKey).remove(err=>{
            err?console.log("Not Deleted"):console.log("Deleted From Database")
        })
    }
    componentDidMount(){
        this.updateState()
    }
    updateState(){
        firebase.database().ref('user').once('value').then(snap=>{
            let users = snap.val();
            let students = {};
            for(let a in users){
                if(users[a].type === "student"){
                    students[a] = users[a];
                }
            }
            let studentKey = [];
            let studentData = [];
            for(let b in students){
                studentKey.push(b);
                studentData.push(students[b]);
            }

            this.setState({
                loading: false,
                users,
                students,
                studentKey,
                studentData
            })
            console.log(this.state)
        })
    }
    render(){
        var studentData = this.state.studentData;
        return(
            <div>
                {this.state.loading?<Loading/>
                :
                    studentData.map((student,key)=>(
                        <div key={key}>
                            <StudentView student={student} onDelete={this.onDelete.bind(null,key)}/>
                        </div>
                    ))
                }
            </div>
        )
    }
}