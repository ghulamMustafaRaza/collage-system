import React from "react"

export default class StudentView extends React.Component{
    render(){
        var student = this.props.student;
        return(
            <div className="jumbotron">
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Name:</th>
                            <td>{student.name}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{student.email}</td>
                        </tr>
                        <tr>
                            <th>Type:</th>
                            <td>{student.type}</td>
                        </tr>
                    </tbody>
                </table>
                {/*{this.props.onDelete && <div className="btn btn-denger pull-right" onClick={()=>{this.props.onDelete()}} > delete </div>}*/}
            </div>
        )
    }
}