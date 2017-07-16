import React from "react"

export default class CVView extends React.Component{
    render(){
        var cv = this.props.cv;
        return(
            <div className="jumbotron">
                <table className="table">
                    <tbody>
                        {cv.name &&
                            <tr>
                                <th>Name:</th>
                                <td>{cv.name}</td>
                            </tr>
                        }
                        {cv.skill &&
                            <tr>
                                <th>Skill:</th>
                                <td>{cv.skill}</td>
                            </tr>
                        }
                        {cv.interest &&
                            <tr>
                                <th>Interenst:</th>
                                <td>{cv.interest}</td>
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
                                <h4 className="modal-title">CV From {cv.persnolInfo.name}</h4>
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    <tbody>
                                        {cv.persnolInfo.name &&<tr>
                                            <th>from:</th>
                                            <td>{cv.persnolInfo.name}</td>
                                        </tr>}
                                        {cv.persnolInfo.email &&<tr>
                                            <th>Email:</th>
                                            <td>{cv.persnolInfo.Email}</td>
                                        </tr>}
                                        {cv.persnolInfo.mobile &&<tr>
                                            <th>Phone:</th>
                                            <td>{cv.persnolInfo.mobile}</td>
                                        </tr>}
                                        {cv.qualifications &&
                                            <tr>
                                                <th>Qualification:</th>
                                                <td><ol>{cv.qualifications.map((qual,key)=>(
                                                    <li key={key}>
                                                        {')'} {qual.degree} From {qual.schooling} since {qual.since} till {qual.till}
                                                    </li>
                                                ))}</ol></td>
                                            </tr>
                                        }
                                        {cv.experiance &&
                                            <tr>
                                                <th>Experiance:</th>
                                                <td><ol>{cv.experiance.map((exp,key)=>(
                                                    <li key={key}>
                                                        {')'} {exp.post} at {exp.company} From {exp.from} to {exp.to} 
                                                    </li>
                                                ))}</ol></td>
                                            </tr>
                                        }
                                        {cv.skill &&
                                            <tr>
                                                <th>Skill:</th>
                                                <td>{cv.skill}</td>
                                            </tr>
                                        }
                                        {cv.interest &&
                                            <tr>
                                                <th>Interenst:</th>
                                                <td>{cv.interest}</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
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