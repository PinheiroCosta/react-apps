import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

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
            display: 0,
            history: [],
            expression: []
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }
    handleClick(event) {        
        // valor mostrado no display
        const displayVisor = this.state.display;
        // quantidade de caracteres do visor
        const displayLength = displayVisor.length-1;
        // Ultimo digito do visor
        const lastDigitDisplayed = displayVisor[displayLength];
        // está dentro do limite de caracteres?
        const notInMaxLimit = displayVisor.toString().length < 25;
        // o primeiro digito é zero?
        const firstIsZero = displayVisor === 0;              
        // Id do elemento clicado
        const clickedId = event.target.id;
        // nome do botao baseado no id do elemento clicado
        const clickedKey = buttonConfig[clickedId];
        // o botao clicado é um número inteiro?
        const isNumber = Number.isInteger(clickedKey);
        // o botão clicado é um operador?
        const clickedInOperator = ["+", "-", "/", "X"]
        .some((value) => value === clickedKey);
        // existe algum operador no ultimo digito?
        const lastDisplayIsOperator = ["+", "-", "/", "X"].
        some(
            (value) => value === displayVisor
            .toString()[displayLength]
        );
        // lista de termos matematicos
        const terms = String(displayVisor)
        .split(/\-|\+|\/|\X/g);
        // cópia do histórico com o ultimo botao clicado
        const history = this.state.history.concat(
                                displayVisor + clickedKey
                            )
        
        if (clickedId in buttonConfig){
            // se o id do elemento clicado estiver na lista de botões...
            switch(true){
                case (isNumber):
                    // caso o primeiro clique seja zero...
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
                            history: history,
                            expression: history[history.length-1]
                        }))
                    }                    
                    // se NÃO estiver no limite de caracteres.
                    else {
                        console.log("max reached")
                    }                    
                    break;

                case (clickedKey === "." 
                      && displayVisor[displayVisor.length-1] !== "."):
                    // caso o clique seja em "." e o último digito diferente
                    
                    // retorna verdadeiro se último termo tiver "."
                    const dotInLastTerm = terms[terms.length-1]
                    .split("")
                    .some((value) => value === ".");

                    if (!dotInLastTerm) {
                        // se não houver "." no último termo...
                        this.setState({
                            display: String(
                                displayVisor + clickedKey
                            )
                        })    
                    }                                        
                    break;                    
                case (clickedInOperator):
                    // caso o clique seja em algum operador matemático
                    if (!lastDisplayIsOperator) { 
                        // BUG 5 * - + 5 should be = 10
                        // se o último digito do display NÃO for um operador...
                        this.setState({
                            // atualiza o estado do display com o botão clicado
                            display: String(displayVisor + clickedKey)
                        })
                    } else {
                        // se o último digito for um operador
                        // penultimo é um operador ?
                        const beforeLastIsOperator = ["+", "-", "/", "X"].
                        some(
                            (value) => value === displayVisor
                            .toString()[displayLength-1]
                        );
                        if (clickedKey === "-") {
                            // se o botao clicado for subtração
                            this.setState({
                                // atualiza o estado do display
                                display: !beforeLastIsOperator 
                                ? String(displayVisor + clickedKey)
                                : String(displayVisor.slice(
                                0, displayLength) + clickedKey)
                            })
                        } else {
                        this.setState({
                            display: beforeLastIsOperator 
                            ? String(displayVisor.slice(
                                0, displayLength-1) + clickedKey)
                            : String(displayVisor.slice(
                                0, displayLength) + clickedKey)
                        })
                        }
                    }
                    break;
                case (clickedKey === "="):
                    // Caso o clique seja no sinal de igual
                    // substitui X por * na formula
                    const formula = String(this.state.expression)
                    .replace("X", "*");
                    // computa o resultado da expressao matematica
                    const result = Number(eval(formula));
                    this.setState({
                        // atualiza o estado do display com o resultado
                        display: result,
                        // reseta o histórico
                        history: [],
                        // atualiza  o estado da expressão com o resultado
                        expression: result
                    })
                    break;
                case (clickedKey == "AC"):
                    this.setState({
                        // reseta todos os estados
                        display: 0,
                        history: []
                    })
                    break;
            }
        }
        console.log(String("expression: " + this.state.expression));
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