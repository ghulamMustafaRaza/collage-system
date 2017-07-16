import React from 'react'
import Loading from "../Loading"
import * as firebase from "firebase"
import CompanyView from "../views/CompanyView"

export default class AllCompany extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            users: null,
            companys: null,
            companyKey: null,
            companyData: null
        }
        this.updateState = this.updateState.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }
    onDelete(ind){
        let refKey = this.state.companyKey[ind];
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
            let companys = {};
            for(let a in users){
                if(users[a].type === "company"){
                    companys[a] = users[a];
                }
            }
            let companyKey = [];
            let companyData = [];
            for(let b in companys){
                companyKey.push(b);
                companyData.push(companys[b]);
            }

            this.setState({
                loading: false,
                users,
                companys,
                companyKey,
                companyData
            })
        })
    }
    render(){
        var companyData = this.state.companyData;
        return(
            <div>
                {this.state.loading?<Loading/>
                :
                    <div>
                        <div className="page-header">All Companyies</div>
{                        companyData.map((company,key)=>(
                            <div key={key}>
                                <CompanyView company={company} onDelete={this.onDelete.bind(null,key)}/>
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}