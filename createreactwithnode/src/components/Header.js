
import React,{Component} from "react";
import {Link} from "react-router-dom";
import '../styles/Header.css';


//this is the main screen from where you can log in to the login screen
class Header extends Component{


    constructor(props){
        super(props);

        console.log(this.props)

    }


render() {
    return (
        <header className="header">
            <h1>Welcome to Time Tracking System</h1>
            <p>Please proceed to the login screen on the click of this button</p><br/>
            <Link to="/login" ><button className="buttonOnHeader">Click to go to Login Screen</button></Link>
        </header>
    );
}
}

export default Header;