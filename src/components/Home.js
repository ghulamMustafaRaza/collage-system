import React from 'react'
import * as firebase from 'firebase'
import Loading from './Loading'
class Home extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(()=>{
            var CU = firebase.auth().currentUser;
            if(CU){
                this.props.history.push("/user")            
            }
            else{
                this.props.history.push("/signin")            
            }
        })
    }
    render(){
        return(
            <div>
                <Loading/>
            </div>
        )
    }
}
export default Home