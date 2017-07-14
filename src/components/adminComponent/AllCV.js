import React from 'react'
import Loading from "../Loading"
import * as firebase from "firebase"
import CVView from "../views/CVView"

export default class AdminAllCV extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            cvs : [],
            csvObj:{},
            cvsKeys : [],
            loading:true
        }
        this.updatState = this.updatState.bind(this);
    }
    onDelete(ind){
        let cvsKeys = [...this.state.cvsKeys]
        console.log(cvsKeys[ind])
        firebase.database().ref('CV').child(cvsKeys[ind]).remove(function (error) {
            if (!error) {
                console.log("remove from firebase")
            }
            else{
                console.log('not removed')
            }
        })
        this.updatState()
    }
    componentDidMount(){
        this.updatState()
    }
    updatState(){
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
                        {/*{
                            JSON.stringify(this.state.cvs)
                        }*/}
                            {this.state.cvs.map((cv,key)=>(
                                <div key={key}>
                                    <CVView cv={cv} onDelete={this.onDelete.bind(this, key)}/>
                                </div>
                            ))}
                            {/*{
                            JSON.stringify(this.props.cvs)
                            }*/}
                    </div>
                }
            </div>
        )
    }
}
