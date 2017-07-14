import React from 'react'
import Loading from "./Loading"
import * as firebase from "firebase"
import CVView from "./views/CVView"

export default class CompanyAllCV extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            cvs : [],
            csvObj:{},
            cvsKeys : [],
            loading:true
        }
    }
    componentDidMount(){
        firebase.database().ref('CV').once('value').then((snap)=>{
            var obj = snap.val();
            var value = [];
            var key = [];
            for(let a in obj){
                key.push(a)
                value.push(obj[a])
            }
            this.setState({
                cvs : value,
                cvsKeys : key,
                csvObj: obj,
                loading: false
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
                    All CV's
                </div>
                {
                    this.state.loading? <Loading/>
                    :
                    !this.state.cvs.length?
                        <h1 className="text-senter">No CV In This</h1>
                    :
                    <div>
                        {this.state.cvs.map((cv,key)=>(
                            <div key={key}>
                                <CVView cv={cv} onDelete={this.onDelete.bind(this, key)}/>
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}
