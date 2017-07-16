import React from "react"
import * as firebase from "firebase"

export default class JobMaker extends React.Component{
    handleSubmit(ev){
        ev.preventDefault()
        let currentUser = firebase.auth().currentUser;
        let companyName = currentUser.displayName;
        let salary = this.refs.salary.value;
        let jobTitle = this.refs.jobTitle.value;
        let requirements = this.refs.requirements.value;
        firebase.database().ref("Jobs").push({
            salary,
            companyName,
            companyUid: currentUser.uid,
            jobTitle,
            requirements
        })
        // .then((snap)=>{
        //     firebase.database().ref("Jobs/"+snap.key+"/key").set(snap.key)
        // })
        this.props.history.push('/user')
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit.bind(this)} className="form clearfix">
                    <div className="form-group">
                        <label htmlFor="jobTitle">Job Title</label>
                        <input type="text" ref="jobTitle" id="jobTitle" placeholder="Job Title" className="form-control"/>                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="salary">Salary</label>
                        <input type="text" ref="salary" id="salary" placeholder="salary" className="form-control"/>                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="jobTitle">Requirements</label>
                        <textarea type="text" ref="requirements" id="requirements" rows="10" placeholder="Requirements" className="form-control"></textarea>
                    </div>
                    <input type="submit" value="Add Job" className="btn btn-primary"  />
                </form>
            </div>
        )
    }
}