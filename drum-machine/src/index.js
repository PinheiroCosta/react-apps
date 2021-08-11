import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';


const defaultKeys = {
    q: {
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
            sample: "heater"    
        },
    w: {
            url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
            sample: "open-hi-hat"
        },
    e: {
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
            sample: "heater-2"
        },
    a: {
            url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
            sample: "heater-3"
        },
    s: {
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
            sample: "heater-4"
        },
    d: {
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
            sample: "heater-6"
        },
    z: {
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
            sample: "open-hat"
        },
    x: {
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
            sample: "kick-n-hat"
        },
    c: {
            url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
            sample: "kick"
        }        
    }

class KeyButton extends React.Component {
    render() {
        return (
            <button
                className="drum-pad"
                id={this.props.id}                
                >
                {this.props.name}
                <audio 
                    id={this.props.name} 
                    src={this.props.url}                
                    className="clip">                
                </audio>
            </button>
        );
    }
}

class DrumConfig extends React.Component {
    render() {
        return (
            <div id="drum-config">
                <div id="display">{this.props.display}</div>       
            </div>
        )
    }
}

class KeyPad extends React.Component {
    renderKeyButton(key, url, sample){        
        return (
            <KeyButton name={key} id={sample} url={url}/>
        );
    }    
    renderKeyPad(){
        const allKeys = Object.entries(defaultKeys);
        let keyboard = [];
        var index = 0;
        
        // create a 3x3 2D array with a button element in each cell
        for (let row = 0; row < 3; row++){
            let keyRow = [];            
            const aditionalClass = String("row" + (row + 1));
            
            for (let column = 0; column < 3; column++){
                keyRow.push(
                    this.renderKeyButton(
                        allKeys[index][0].toUpperCase(),
                        allKeys[index][1].url,
                        allKeys[index][1].sample,
                    )
                )
                index++
            }
            
            keyboard.push(
                <div className={String("board-row " + aditionalClass)}>
                    {keyRow}
                </div>
            )
        }
        return (keyboard)
    }      
    render() {
        return (
            <div id="key-pad">
                {this.renderKeyPad()}
            </div>
        )
    };
}

class DrumMachine extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentSample: null,            
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.playSound = this.playSound.bind(this);
    }    
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        document.addEventListener('click', this.handleClick);
    }    
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }   
    handleClick(event) {
        const element = event.target;
        if (element.className === 'drum-pad') {
            this.setState({
                currentSample: element.id
            })
            this.playSound(element.lastElementChild.id);
        }        
    }    
    handleKeyDown(event) {
        const keyEvent = event.key.toLowerCase();
        if(keyEvent in defaultKeys){
            var objKey = defaultKeys[keyEvent];
            var element = document.getElementById(objKey.sample);
            this.playSound(keyEvent.toUpperCase())
            element.classList.add("drum-pad-pressed");
            this.setState({
                currentSample: objKey.sample
            })
        }
    }        
    handleKeyUp(event) {
        const keyEvent = event.key.toLowerCase();
        if(keyEvent in defaultKeys){
            var objKey = defaultKeys[keyEvent];
            var element = document.getElementById(objKey.sample);
            element.classList.remove("drum-pad-pressed");
        }
    }    
    playSound(key) {
        const sound = document.getElementById(key);
        sound.currentTime = 0;
        sound.play()
    }    
    render() {
        return (
            <div id="drum-machine">
                <DrumConfig 
                    display={this.state.currentSample} 
                    onClick={this.handleClick}/>
                <KeyPad/>                
            </div>
        )
    }
}

// ===========================================================

ReactDOM.render(
    <DrumMachine />,
    document.getElementById('root')
);
