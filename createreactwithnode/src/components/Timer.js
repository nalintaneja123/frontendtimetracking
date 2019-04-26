import React, {Component} from 'react';
import ms from 'pretty-ms'
import '../styles/Timer.css';
import {Link} from "react-router-dom";


//user can start and stop and reset timer
class Timer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time: 0,
            start: 0,
            pause: false

        }


        this.TimerStart = this.TimerStart.bind(this)
        this.TimerStop = this.TimerStop.bind(this)
        this.TimerReset = this.TimerReset.bind(this)

    }

    TimerStart() {

        this.setState({

            time: this.state.time,
            start: Date.now(),
            pause: true

        })

        console.log(this.state.time)

        if (this.state.time !== 0) {
            this.timer = setInterval(() => this.setState({
                time: this.state.time + 1,

            }), 1)
        }
        else {
            this.timer = setInterval(() => this.setState({
                time: Date.now() - this.state.start,

            }), 1)

        }
        console.log(this.state.start)
        console.log("start");


    }

    TimerStop() {

        this.setState({isOn: false});
        clearInterval(this.timer)
        console.log("stop")
    }

    TimerReset() {

        this.setState({time: 0})
        console.log("Reset");
    }

    render() {


        return (

            <div class="timerdiv">
                <h1>Timer</h1>
                <Link to="/login"><button className="logoutontimer">Logout</button></Link>
                <h3>Time would be displayed here:{ms(this.state.time)}</h3>
                <button onClick={this.TimerStart}>Start</button>
                <button onClick={this.TimerStop}>Stop</button>
                <button onClick={this.TimerReset}>Reset</button>
            </div>
        )
    }


}


export default Timer;
