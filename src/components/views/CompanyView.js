import React from "react"

export default class CompanyView extends React.Component{
    render(){
        var company = this.props.company;
        return(
            <div className="jumbotron">
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Name:</th>
                            <td>{company.name}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{company.email}</td>
                        </tr>
                        <tr>
                            <th>Type:</th>
                            <td>{company.type}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}