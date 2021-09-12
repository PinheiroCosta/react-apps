import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';


class Pomodoro extends React.Component {
  render() {
    return(
      <div id="pomodoro">
        <div id="break-label">
          Break 
          <a id="break-increment" href="#">
            <i className="bi bi-caret-up-fill"></i>       
          </a>

          <div id="break-length">5</div>

          <a id="break-decrement" href="#">
            <i className="bi bi-caret-down-fill"></i>  
          </a>
        </div>
        <div id="session-label">Session 
          <a id="session-increment" href="#">
            <i className="bi bi-caret-up-fill"></i>  
          </a>

          <div id="session-length">
            {this.props.minutesLeft}
          </div>

          <a id="session-decrement" href="#">
            <i className="bi bi-caret-down-fill"></i>  
          </a>
        </div>
      </div>
    )
  }
}

class Clock extends React.Component {
  render () {  
    return(
      <div>
        <div id="timer-label">Timer</div>
        <div id="time-left">        
          {this.props.timer}
        </div>
      </div>
    )
  }
}

class Player extends React.Component {
  render() {
    return(
      <div id="player">
        <a id="play" href="#"><i className="bi bi-play-fill"></i></a> 
        <a id="pause" href="#"><i className="bi bi-pause-fill"></i></a>         
        <a id="stop" href="#"><i className="bi bi-stop-fill"></i></a>        
      </div>
    )
  }
}

class TimerApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      timer: new Date(0, 0, 0, 0, 25, 0),
    }
  }
  
  render() {
    const clockOptions = {
      minute: '2-digit', 
      second: '2-digit',
    };    
    // handle sixty minutes in session length
    const minutesLeft = this.state.timer.getHours()
    ? 60 
    : this.state.timer.getMinutes();
    // handle sixty minutes in the timer
    const timer = this.state.timer.getHours() 
    ? "60:00"
    : this.state.timer.toLocaleTimeString([],clockOptions);
    
    console.log(timer);
    
    return(
      <div id="timer">
        <Pomodoro minutesLeft={minutesLeft}/>
        <Clock timer={timer}/>
        <Player />
      </div>
    )
  }
}


// ===========================================================

ReactDOM.render(
    <TimerApp />,
    document.getElementById('root')
);
