import React from "react"

export default class JobsView extends React.Component{
    render(){
        var Job = this.props.Job;
        return(
            <div className="jumbotron">
                <table className="table">
                    <tbody>
                        {Job.companyName &&
                            <tr>
                                <th>from:</th>
                                <td>{Job.companyName}</td>
                            </tr>
                        }
                        {Job.jobTitle &&
                            <tr>
                                <th>Job Title:</th>
                                <td>{Job.jobTitle}</td>
                            </tr>
                        }
                        {Job.salary &&
                            <tr>
                                <th>Salary:</th>
                                <td>{Job.salary}</td>
                            </tr>
                        }
                        {Job.requirements &&
                            <tr>
                                <th>Requirements:</th>
                                <td>{Job.requirements}</td>
                            </tr>
                        }
                    </tbody>
                </table>
                {this.props.onDelete && <div className="btn btn-denger pull-right" onClick={()=>{this.props.onDelete()}} > delete </div>}
            </div>
        )
    }
}