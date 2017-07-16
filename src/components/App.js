import * as firebase from 'firebase'
import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import NavBar from './NavBar'
import Home from './Home'
// import Students from './Students'
// import Teachers from './Teachers'
import Signin from './Signin'
import Signup from './Signup'
import UserPanel from './UserPanel'
import Loading from './Loading'



// const Heading = props=>(<h1 className="text-center">{props.child}</h1>);
class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={ 
      user: null
      // load: true,
      // dataBase: null
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(()=>{
      var uid = firebase.auth().currentUser.uid;
      // var dataBase;
      // firebase.database().ref('student').once('value',(snapshot)=>{
      //   // alert('a')
      //   if (snapshot.hasChild(uid)) {                   
      //     let value =firebase.database().ref("student").child(uid);
      //     value.once("value", (snap)=>{
      //       dataBase = snap.val()
      //       this.setState({dataBase,load: true})
      //     })
      //   }else{                  
      //     let value =firebase.database().ref("company").child(firebase.auth().currentUser.uid)
      //     value.once("value", (snap)=>{
      //       dataBase = snap.val()
      //       this.setState({dataBase,load: true})
      //     })
      //   }
      // });
      // console.log("dtatabasa:"+dataBase)
      this.setState({
          user: firebase.auth().currentUser
      })
    })
  }
  render() {
    return (
    <div className="container-fluid">
      
      <Router>
        <div>
          <NavBar/>
          <Route exact path="/" component={Home}/>
                  {/*<Route path="/user/admin/alljobs" component={AdminAllCV}/>
                  <Route path="/user/admin/allcv" component={AdminAllJobs} />
                  <Route path="/user/admin/allstudent" component={AdminAllCompanies} />
                  <Route path="/user/admin/allcompany" component={AdminAllStudents} />
                  <Route path="/user/student/alljobs" component={()=><Loading text="alljobs"/>}/>
                  <Route path="/user/student/mycv" component={()=><Loading text="mycv"/>} />
                  <Route path="/user/company/ourjobs" component={()=><Loading text="alljobs"/>}/>
                  <Route path="/user/student/allcv" component={()=><Loading text="mycv"/>} />*/}
          <Route path="/user" component={UserPanel}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signin" component={Signin}/>
        </div>
      </Router>
      
    </div>
    );
  }
}

export default App;

