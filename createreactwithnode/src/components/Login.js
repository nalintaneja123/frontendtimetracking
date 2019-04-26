import React, {Component} from 'react';


import '../styles/Login.css';
import {Link, Redirect} from "react-router-dom";

////Login screen
class Login extends Component {


    constructor(props) {

        super(props)


        this.state = {

            userId: ' ',
            password: ' ',
            message: ' ',
            redirect: false,
            errors: []
        }


        this.handleLogin = this.handleLogin.bind(this);
    }

//login button
    handleLogin = (e) => {

        e.preventDefault();


        const user = {

            userId: this.userId.value,
            password: this.password.value
        }


        const errors = validate(user.userId, user.password);


        if (errors.length > 0) {
            this.setState({errors});
            setTimeout(() => this.setState({errors: []}), 1000);

            return;
        }
        else {


            fetch('/authenticateUser', {

                method: 'POST',
                body: JSON.stringify({

                    userId: user.userId,
                    password: user.password

                }),
                headers: {"Content-Type": "application/json"}

            })
                .then(function (response) {


                    if (response.ok) {
                        // return response.json();
                        this.setState({
                            redirect: true
                        })

                    }
                    else if (response.status === 401) {
                        this.setState({message: "Either Username or password are incorrect..Authorization failed"});
                        setTimeout(() => this.setState({message: ''}), 1000);
                    }

                }.bind(this))


        }

    }
///////////////////login button ends//////////////////////////////////////////////////////////////////////

    render() {

        let {redirect} = this.state;


        if (redirect) {

            return (
                <Redirect to="/timer"/>
            )
        } else {


            const {errors} = this.state;
            console.log("State is " + errors)
            return (

                <div>
                    <h2>Login:Time Tracking System</h2>

                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <div className="submissionMessage">{this.state.message}</div>
                    <br/>
                    <br/>
                    <br/>

                    <form onSubmit={(e) => this.handleLogin(e)}>

                        {errors.map(error => (

                            <div className="submissionMessage" key={error}>{error}</div>

                        ))}


                        <table align="center" cellPadding="10" className="logintable">
                            <tbody>
                            <tr>
                                <td>UserID:</td>
                                <td><input type="text" ref={(input) => this.userId = input}/></td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>Password:</td>
                                <td><input type="password" ref={(input) => this.password = input}/></td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td colSpan="2">
                                    <button className="buttons">Login</button>
                                    <Link to="/signup">
                                        <button>Signup</button>
                                    </Link></td>
                            </tr>
                            </tbody>


                        </table>

                    </form>


                </div>
            )
        }


    }


}

//validating userid and password
function validate(userId, password) {
    const errors = [];
    if (userId.length === 0) {
        errors.push("User ID cannot be empty")
    }
    else if (password.length === 0) {
        errors.push("Password cannot be empty")
    }
    return errors;


}

export default Login