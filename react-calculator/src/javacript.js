const buttonConfig = {
    clear: "AC",    
    divide: "/",
    multiply: "X",
    seven: 7,
    eight: 8, 
    nine: 9,
    subtract: "-",
    four: 4, 
    five: 5,
    six: 6,
    add: "+",
    one: 1,
    two: 2,
    three: 3,
    zero: 0,
    decimal: ".",
    equals: "=",
};

class Display extends React.Component {
    // componente de visor da calculadora
    render() {
        return (
            <div id="display">{this.props.value}</div>
        )
    }
}

class KeyButton extends React.Component {
    // componente de botão da calculadora
    render() {
        return (
            <div className={this.props.style}>
                <button id={this.props.id}>
                    {this.props.value}
                </button>
            </div>
        )
    }
}

class KeyPad extends React.Component {
    renderKeyButton(value, id=null, style="gridBlock") {
        // renderiza um botão na tela
        return(
            <KeyButton 
                value={value} 
                style={style} 
                id={id}/>
        )        
    }
    renderKeyPad() {
        /* renderiza todos os botões definidos na configuração */
        
        // lista com o nome dos botões
        const key = Object.keys(buttonConfig); 
        const buttons = [];
        for (let i=0; i < key.length; i++) {
            // para cada botão nas configurações
            const keySign = buttonConfig[key[i]];  // o valor do botão
            // verdadeiro, ou falso se o botão for um operador
            const isOperator = ["/", "X", "-", "+"]
            .some((name) => name === keySign);

            switch(true) {
                    /* condições para acrescentar o componente na lista
                  de botoes a serem renderizados */
                case (key[i] === "clear"):
                    buttons.push(
                        this.renderKeyButton(
                            keySign, key[i], "clear"
                        )
                    )
                    break;
                case (key[i] === "equals"):
                    buttons.push(
                        this.renderKeyButton(
                            keySign, key[i], "equals"
                        )
                    )
                    break;
                case (key[i] === "zero"):
                    buttons.push(
                        this.renderKeyButton(
                            keySign, key[i], "zero"
                        )
                    )
                    break;
                case (isOperator):
                    if (buttonConfig[key[i]] === "X") {
                        buttons.push(
                            this.renderKeyButton(
                                keySign, key[i], "multiply"
                            )
                        )
                    } else {
                        buttons.push(
                            this.renderKeyButton(
                                keySign, key[i], "operator"
                            )
                        )
                    }

                    break;                
                default:
                    buttons.push(
                        this.renderKeyButton(
                            keySign, key[i]
                        )
                    )
            }
        }        
        return (buttons);   // retorna lista de botões renderizados
    } 
    render() {

        return (            
            <div id="keyboard">     
                {this.renderKeyPad()}               
            </div>
        )
    }
}

class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // estado do display
            display: 0,
            // histórico do display
            history: []            
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }
    handleClick(event) {
        const displayVisor = this.state.display;
        const displayLength = displayVisor.length;
        const notInMaxLimit = displayVisor.toString().length < 25;
        const firstIsZero = displayVisor === 0;
        const displayVisorHasDot = displayVisor
        .toString()
        .split('')
        .some((value) => value == ".");

        const clickedId = event.target.id;
        const clickedKey = buttonConfig[clickedId];
        const isNumber = Number.isInteger(clickedKey);
        const clickedInOperator = ["+", "-", "/", "X"]
        .some((value) => value === clickedKey);
        const lastDisplayIsOperator = ["+", "-", "/", "X"].
        some(
            (value) => value === displayVisor
            .toString()[displayLength-1]
        );    
        // se o id do elemento clicado estiver na lista de botões...
        if (clickedId in buttonConfig){            
            switch(true){
                case (isNumber):
                    // se o primeiro click for zero...
                    if (firstIsZero && clickedKey === 0){
                        console.log(
                            "left zeroes now allowed"
                        )
                    } 
                    // se estiver dentro do limite de caracteres...
                    else if (notInMaxLimit) {
                        this.setState(({
                            // atualiza o estado do display
                            display: String(
                                displayVisor + clickedKey
                            ),
                            // atualiza o estado do histórico
                            history: this.state.history.concat(
                                displayVisor + clickedKey
                            )                            
                        }))
                        console.log(this.state.history);
                    } 
                    // se NÃO estiver no limite de caracteres.
                    else {
                        console.log("max reached")
                    }                    
                    console.log(clickedKey, "<-- numérico");
                    break;

                case (clickedKey === "." && !displayVisorHasDot):
                    this.setState({
                        display: String(
                            displayVisor + clickedKey
                        )
                    })                    
                    console.log(clickedKey, "<-- decimal");
                    break;                    
                case (clickedInOperator):
                    // se o último caracter clicado NÃO for um operador...
                    if (!lastDisplayIsOperator) {
                        this.setState({
                            // atualiza o estado do display
                            display: String(
                                displayVisor + clickedKey
                            )
                        })
                    }
                    console.log(clickedKey, "<-- operador");
                    break;
                case (clickedKey === "="):
                    console.log(clickedKey, "<-- sinal de igual");
                    break;
                case (clickedKey == "AC"):
                    this.setState({
                        // reseta todos os estados
                        display: 0,
                        history: []
                    })
                    console.log(clickedKey, "<-- clear button");
                    break;
            }
        }
    }
    render() {
        return(
            <div id="calculator">
                <Display value={this.state.display}/>
                <KeyPad/>
            </div>
        )
    }
}

// ===========================================================

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);
