import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
  Link
} from 'react-router-dom'

export default class CvBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentCountExp:0,
            currentCountEdu:0,
        }
        this.addExp = this.addExp.bind(this);
        this.addEdu = this.addEdu.bind(this);
        this.counter = this.counter.bind(this);
        this.counter1 = this.counter1.bind(this);
        this.CVGenerator = this.CVGenerator.bind(this);

    }

    CVGenerator(ev){
        ev.preventDefault();
        var enname = this.refs.name.value;
        var enemail = this.refs.email.value;
        var enmobile = this.refs.mobile.value;
        var enaddress = this.refs.address.value;
        var enskill = this.refs.skill.value;

        var eninterest = this.refs.interest.value;
        var qualifications=[];
        for(let i = 0; i <= this.state.currentCountEdu; i++)
        {
            qualifications.push({
                schooling: this.refs['schooling' + i].value,
                degree:  this.refs['degree' + i].value,
                since: this.refs['since' + i].value,
                till: this.refs['till' + i].value
            })
        }
        var experiance=[];
        for(let i = 0; i <= this.state.currentCountExp; i++)
        {
            experiance.push({
                company: this.refs['company' + i].value,
                post:  this.refs['post' + i].value,
                from: this.refs['from' + i].value,
                to: this.refs['to' + i].value
            })
        }
        firebase.database().ref("CV/"+firebase.auth().currentUser.uid).set({
            persnolInfo:{
                name: enname,
                email: enemail,
                mobile: enmobile,
                address: enaddress
            },
            experiance,
            qualifications,
            skill: enskill,
            interest: eninterest

           })
    }

    counter() {
        const {currentCountExp} = this.state;
        this.setState({
            currentCountExp : currentCountExp + 1
        })
        return(currentCountExp)
    }

    counter1() {
        const {currentCountEdu} = this.state;
        this.setState({
            currentCountEdu : currentCountEdu + 1
        })
        return(currentCountEdu)
    }

    addExp() {
        var a = this.counter();
        return(
            document.getElementById("addexpe").innerHTML+=`
            <div class="form-group">
                <label for="company${a}">Organization:</label>
                <input ref="company${a}" type="text" class="form-control" id="company${a}" placeholder="Enter organization" name="company${a}" />
            </div>
            <div class="form-group">
                <label for="post${a}">Position:</label>
                <input ref="post${a}" type="text" class="form-control" id="post${a}" placeholder="Enter position" name="post${a}" />
            </div>
            <div class="form-group">
                <label for="from${a}">From:</label>
                <input ref="from${a}" type="date" class="form-control" id="from${a}" name="from${a}" />
            </div>
            <div class="form-group">
                <label for="to${a}">To:</label>
                <input ref="to${a}" type="date" class="form-control" id="to${a}" name="to${a}" />
            </div>
            <hr />`
        )
    }

    addEdu() {
        var b = this.counter1();        
        return(
            document.getElementById("addeduc").innerHTML+=`
            <div class="form-group">
                <label for="schooling${b}">School/College/University:</label>
                <input ref="schooling${b}" type="text" class="form-control" id="schooling${b}" placeholder="Enter School/College/University" name="schooling${b}" />
            </div>
            <div class="form-group">
                <label for="degree${b}">Degree Name:</label>
                <input ref="degree${b}" type="text" class="form-control" id="degree${b}" placeholder="Enter degree" name="degree${b}" />
            </div>
            <div class="form-group">
                <label for="since${b}">From:</label>
                <input ref="since${b}" type="date" class="form-control" id="since${b}" name="since${b}" />
            </div>
            <div class="form-group">
                <label for="till${b}">Till:</label>
                <input ref="till${b}" type="date" class="form-control" id="till${b}" name="till${b}" />
            </div>
            <hr />`
        )
    }


    render() {
        return(
            <div className="container">
                <h2>Build your CV</h2>
                <form onSubmit= {this.CVGenerator}>
                    <fieldset> <legend>
                    <h3>Your Personal Information</h3></legend>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input ref="name" type="name" className="form-control" id="name" placeholder="Enter name" name="name" />
                    </div>
                      <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input ref="email" type="email" className="form-control" id="email" placeholder="Enter email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mob">Mobile:</label>
                        <input ref="mobile" type="text" className="form-control" id="mob" placeholder="Enter contact info" name="mob" />
                    </div>
                     <div className="form-group">
                        <label htmlFor="add">Address:</label>
                        <input ref="address" type="text" className="form-control" id="add" placeholder="Enter address" name="add" />
                    </div>
                    </fieldset>
                    <div className="clearfix">
                        <fieldset id="addexpe"><legend>
                            <h3>Your Work Experience</h3></legend>
                        </fieldset>
                        <i className="btn btn-primary pull-right" onClick={this.addExp} aria-hidden="true">Add</i>
                    </div>
                    <fieldset><legend>
                    <h3>Your Skills</h3></legend>
                    <div className="form-group">
                        <label htmlFor="skill">Skills:</label>
                        <textarea className="form-control" ref="skill" rows="5" id="skill"></textarea>
                    </div>
                    </fieldset>
                    <div className="clearfix">
                        <fieldset id="addeduc"><legend>
                            <h3>Your Education</h3></legend>
                        </fieldset>
                        <i className="btn btn-primary pull-right" onClick={this.addEdu} aria-hidden="true">Add</i>
                    </div>
                    <fieldset><legend>
                    <h3>Your Interests</h3></legend>
                    <div className="form-group">
                        <label htmlFor="interest">Interests:</label>
                        <textarea className="form-control" ref="interest" rows="5" id="interest"></textarea>
                    </div>   
                    </fieldset><br />
                    <button type="submit" className="btn btn-default">Save</button>
                    <Link to="/user" className="btn btn-danger pull-right">Cancel</Link>
                </form>
            </div>
        )
    }
}