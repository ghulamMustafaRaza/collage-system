import React from "react"

export default class CVView extends React.Component{
    render(){
        var cv = this.props.cv;
        return(
            <div className="jumbotron">
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
                {this.props.onDelete && <div className="btn btn-denger pull-right" onClick={()=>{this.props.onDelete()}} > delete </div>}
            </div>
        )
    }
}