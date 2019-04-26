

import {BrowserRouter,Route,Switch} from "react-router-dom";
import React from "react"
import Login from "../components/Login";
import Signup from "../components/Signup";
import Header from "../components/Header";
import Timer from "../components/Timer"




//routes for various pages
const AppRouter=()=>(

    <BrowserRouter>
        <div>
            <Switch>

                <Route path="/" component={Header} exact={true}/>
                <Route path="/login" component={Login} exact={true}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/timer" component={Timer}/>

            </Switch>
        </div>

    </BrowserRouter>


)


export default AppRouter;