import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import '../styles/Signup.css';


//Signup screen
class Signup extends Component {

    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: ' ',
            userId: ' ',
            password: ' ',
            message: ' ',

            errors: [],
            redirect: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset=this.handleReset.bind(this);

    }


    ///clicking submit button
    handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            userId: this.userId.value,
            password: this.password.value
        }


        const errors = validate(user.firstName, user.lastName, user.userId, user.password);

        console.log(errors.length)
        console.log("FirstName :" + user.firstName)
        console.log("LastName :" + user.lastName)
        console.log("UserID :" + user.userId)
        console.log("Password :" + user.password)

        if (errors.length > 0) {
            this.setState({errors});
            setTimeout(() => this.setState({errors: []}), 1000);
            return;
        }
        else {
            fetch('/createUser', {
                method: 'POST',
                body: JSON.stringify({

                    firstName: user.firstName,
                    lastName: user.lastName,
                    userId: user.userId,
                    password: user.password

                }),
                headers: {"Content-Type": "application/json"}

            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (body) {
                    console.log(body);

                })


            this.setState({
                message: "User Created",

            });

            setTimeout(() => this.setState({message: '', redirect: true}), 1000);


            this.firstName.value = "";
            this.lastName.value = "";
            this.userId.value = "";
            this.password.value = "";
            this.setState({

                errors: []
            })
        }


    }


    handleReset=(e)=>{

        e.preventDefault();
        this.firstName.value = "";
        this.lastName.value = "";
        this.userId.value = "";
        this.password.value = "";

    }

    render() {

        const {errors} = this.state;
        console.log("State is " + errors)

        if (this.state.redirect === true) {

            return (

                <Redirect to="/login"/>
            )

        }
        else {


            return (
                <div>
                    <h2>Time Tracking System:Signup Form</h2>

                    <br/>
                    <br/>
                    <br/>


                    <div className="submissionMessage">{this.state.message}</div>
                    <br/>
                    <br/>
                    <br/>

                    <form onSubmit={(e) => this.handleSubmit(e)}>

                        {errors.map(error => (

                            <div className="submissionMessage" key={error}>{error}</div>


                        ))}


                        <table className="signuptable" cellPadding="5">

                            <tbody>
                            <tr>
                                <td>FirstName:</td>
                                <td><input type="text" ref={(input) => this.firstName = input}/></td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>LastName:</td>
                                <td><input type="text" ref={(input) => this.lastName = input}/></td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>UserID :</td>
                                <td><input type="text" ref={(input) => this.userId = input}/></td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>Password :</td>
                                <td><input type="password" ref={(input) => this.password = input}/></td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td colSpan="2">
                                    <button type="submit" className="buttonforSignup">Signup</button>
                                    <button type="submit" className="buttonforReset" onClick={this.handleReset}>Reset</button>
                                </td>

                            </tr>
                            </tbody>

                        </table>


                    </form>


                </div>
            );

        }

    }


}

//validation of firstName,lastname,userid,password
function validate(firstName, lastName, userId, password) {
    const errors = [];
    if (firstName.length === 0) {
        errors.push("First Name cannot be empty")
    }
    else if (lastName.length === 0) {
        errors.push("Last Name cannot be empty")
    }
    else if (userId.length < 5) {
        errors.push("UserId should be at least 5 characters long")
    }
    else if (userId.split("").filter(x => x === '@').length !== 1) {
        errors.push("UserID should contain a @");
    }
    else if (userId.indexOf(".") === -1) {
        errors.push("UserID should contain a dot")
    }
    else if (password.length < 6) {
        errors.push("password should be atleast 6 characters long")
    }

    return errors;


}

export default Signup;
