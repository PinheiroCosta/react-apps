import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';


class Button extends React.Component {
  render() {
    return(
      <a id={this.props.id} href={this.props.href}>
        <i className={this.props.icon}></i>
      </a>
    )
  }
}

class LengthControl extends React.Component {
  render() {
    const title = this.props.title;
    return(
      <div id={String(title + '-label')}>
        {title.charAt(0).toUpperCase() + title.slice(1)}
        <Button 
          id={String(title + '-increment')}
          href={this.props.href}
          icon='bi bi-caret-up-fill'
          />
        
        <div id={String(title+ '-length')}>
          {this.props.value}
        </div>
        
        <Button 
          id={String(title + '-decrement')} 
          href={this.props.href}
          icon="bi bi-caret-down-fill"
          />
      </div>
    )
  }  
}

class Pomodoro extends React.Component {
  render() {
    return(
      <div id="pomodoro">
        <LengthControl 
          title='break'
          value={this.props.break}
          href="#"
          />
        <LengthControl 
          title='session'
          value={this.props.session}
          href="#"
          />
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
        <Button 
          id="play" 
          href="#"
          icon="bi bi-play-fill"            
        /> 
        <Button 
          id="pause" 
          href="#"
          icon="bi bi-pause-fill"           
        />         
        <Button 
          id="stop" 
          href="#"
          icon="bi bi-stop-fill"
        />        
      </div>
    )
  }
}

class TimerApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      timer: 1500,
      break: 5,
      session: 25,
      timerActive: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.clockFormat = this.clockFormat.bind(this);
  } 
  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  handleClick(event) {
    const element = event.target.parentElement;
    console.log(element.tagName);
  }
  
  clockFormat() { // [String]
    // return the time in mm:ss format
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    return  String(minutes +":"+ seconds)
  }
  
  getMinutes() { // [string]
    // Return the minutes of the timer with a leading zero
    let minutes = Math.floor(this.state.timer / 60);
    if (minutes < 10) {
      return String('0' + minutes);
    } else {
      return String(minutes);
    }
  }
  
  render() {
    const breakLength = this.state.break;
    const sessionLength = this.state.session;
    
    return(
      <div id="timerApp">
        <Pomodoro 
          session={sessionLength} 
          break={breakLength}
          onClick={this.handleClick}
          />
        <Clock timer={this.clockFormat()}/>
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