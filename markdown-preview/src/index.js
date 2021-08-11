import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const placeholder = `# Visualizador Markdown

### Escreva textos formatados com facilidade

Enfatize seus trechos de código ao escreve-los entre 3 sinais de crase e ele fica assim:

\`\`\`
// Citação em múltiplas linhas:

function citacaoMultipla(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return textoCitado;
  }
}
\`\`\`

Texto em **negrito** e em _itálico_.
Ou ainda das **_duas formas_**
Dá até pra riscar ~~coisas desnecessárias~~.

É possível criar [hyperlinks](https://en.wikipedia.org/wiki/Hyperlink), e

> citações em bloco
> olha que legal!

Para criar tabelas também é fácil:

Nome | Profissão | Idade
------------ | ------------- | -------------
Xyn Xai | Freelancer | 25
Maria | Empresária | 82
Goku | Lutador de MMA | 33
----
- E é claro, dá pra criar listas.
  - Aninhadas.
     - Com diferentes níveis de identação.
        - Ficam assim.


1. Listas ordenadas numericamente.
1. use números seguidos de um ponto (1.) antes da frase
1. E finalmente imagens:

![thumbsup](https://cdn.onlinewebfonts.com/svg/img_530165.png)

Agora clique na aba **Editor** e experimente!
 
`;

// INSERTS target="_blank" INTO HREF TAGS (required for Codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class Editor extends React.Component {   
    render() {
        
        return(
            <div                 
                className={
                    `container tab-pane
                    ${this.props.status}`}>       
                <textarea 
                    id="editor"
                    type="text" 
                    onChange=
                    {this.props.charEvent}>
                    {placeholder}
                </textarea>                
            </div>
        );
    }
}

class Preview extends React.Component {
    createMarkup() {
        /* its needed to render raw html elements
            in the page, otherwise the text its
            rendered <p>like this<div> */
        var rawMarkup = marked(this.props.value, {
            renderer: renderer,
            breaks: true,
            highlight: (code) => Prism.highlight(code, Prism.languages.javascript, 'javascript')
        });
        return {__html: rawMarkup};
    }
    
    render() {
        return (
            <div 
                id="preview" 
                className={`container tab-pane fade ${this.props.status}`}
                dangerouslySetInnerHTML={this.createMarkup()}>
                
            </div>
        )
    }
}

class MarkdownPreview extends React.Component {    
     constructor(props) {
         super(props);
         this.state = {
             editor: '',
             preview: 'active show',
             input: '',   
         };
     }    
      
     handleClick() {
         this.setState({
             editor: this.state.preview,
             preview: this.state.editor,
         })
     }
    
     handleChange(event) {
         this.setState({
             input: event.target.value,
        })
    };
    
    componentDidMount() {
        this.setState({
            input: placeholder
        })
    };    
    
     render() {         
         return (             
            <div className="wrapper">
                 <ul className={`nav nav-pills`}
                     role="tablist">
                      <li className="nav-item">
                        <a  
                            onClick={() => this.handleClick()}
                            className={`nav-link ${this.state.editor}`}
                            data-toggle="pill"
                            href="#editor">
                            <i class="bi bi-code-slash"></i>
                            Editor
                        </a>                          
                      </li>
                      <li className="nav-item">
                        <a 
                            onClick={() => this.handleClick()}
                            className={`nav-link ${this.state.preview}`} 
                            data-toggle="pill"
                            href="#preview">
                            <i class="bi bi-eye"></i>
                            Preview
                        </a>
                      </li>
                </ul>
                <div className="tab-content">
                    <Editor 
                        status={this.state.editor}                   
                        charEvent={this.handleChange.bind(this)}>
                    </Editor>
                    <Preview 
                        status={this.state.preview} 
                        value={this.state.input}>                  
                    </Preview>                    
                </div>                 
            </div>
         );
     }
 }

// ===========================================================

ReactDOM.render(
    <MarkdownPreview />,
    document.getElementById('app')
);
