import React from "react"

export default class JobsView extends React.Component{
    render(){
        var Job = this.props.Job;
        if(Job.apply){
            var applyList = [];
            for(let a in Job.apply){
                applyList.push(Job.apply[a])
            }
        }
        return(
            <div className="jumbotron">
                <table className="table">
                    <tbody>
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
                    </tbody>
                </table>
                <div className="modal fade" id={"model"+this.props.key} role="dialog">
                    <div className="modal-dialog">
                        {/*<!-- Modal content-->*/}
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Job From {Job.companyName}</h4>
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    <tbody>
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
                                        {applyList && 
                                            <tr>
                                                <td colSpan={2}>
                                                    <h2 className="text-center">Apply By {applyList.length} Candidats</h2>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Email</th>
                                                                <th>Phone</th>
                                                                <th>Skills</th>
                                                                <th>Interest</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {applyList.map((cv, key)=>(
                                                                <tr key={key}>
                                                                    <td>{(cv.name       || '-')}</td>
                                                                    <td>{(cv.email      || '-')}</td>
                                                                    <td>{(cv.mobile     || '-')}</td>
                                                                    <td>{(cv.skill      || '-')}</td>
                                                                    <td>{(cv.interest   || '-')}</td>                                                               
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                {this.props.onApply && <button type="button" className="btn btn-primary" data-dismiss="model" onClick={()=>{this.props.onApply()}}>Apply Now</button>}
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-info" data-toggle="modal" data-target={"#model"+this.props.key}>View Details</button>

                {this.props.onDelete && <div className="btn btn-denger pull-right" onClick={()=>{this.props.onDelete()}} > delete </div>}
            </div>
        )
    }
}