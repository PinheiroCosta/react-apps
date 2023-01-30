//All pokemons --> https://pokeapi.co/api/v2/pokemon/?offset=0&limit=899

class Header extends React.Component {
	render() {
		return (
			 <header class="header">
    			<h1 id="title" class="text-center">UnownGram</h1>
   				<p id="description" class="text-center">Decifrador de Anagrama Pokemon</p>
  			</header>
		)
	}
}
class App extends React.Component {
	renderResult(anagrama){
		return(
			<label 
				id="result-label" 
				for="result"
				>{this.props.output}
			</label>
		)
	}
    render() {
        return (
            <form id="app" onSubmit={this.handleSubmit}> 
				<button
					type="button"
					className="decifrar"
					width="50"
					height="50"
					onClick={this.handleClick}
					href="#"
				>DECIFRAR
				</button>
				<input 
					type="text"
					name="anagrama"
					id="anagrama-input"					
					placeholder="ex: UZBTA"
					onKeyPress={this.handleEnter}
					required
				/>				
				<label 
					id="result-label" 
					for="result"
				>{this.renderResult(this.props.output)}
				</label>				
            </form>
        )
    }
}

class UnownGram extends React.Component {
	
	constructor(props){
        super(props);
        this.state = {
            userinput: '',
			output: 'Pokemon'			
        }
		
		this.handleClick = this.handleClick.bind(this);
		this.handleEnter = this.handleEnter.bind(this);
		this.verifica_anagrama = this.verifica_anagrama.bind(this);
		this.decifra = this.decifra.bind(this);
		
	}	
	async componentDidMount() {
		const API = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898";
		
		document.addEventListener('click', this.handleClick);
		document.addEventListener('keypress', this.handleEnter);
		
		await fetch(API)
      		.then(res => res.json())
      		.then(json => this.setState({ 
				data: json["results"] }));
  	}

	handleEnter(e) {
		const keypressed = e.key;
		if (keypressed == "Enter"){
			e.preventDefault();
		}
	}
	handleClick(event){
			this.decifra(event);
	}
	async decifra(event){
		const element = event.target;
		const userinput = document.getElementById("anagrama-input").value;
		
        if (element.className === 'decifrar' || event.key == "Enter") {	
			console.log(event.key);
			const pokemons = this.state.data;
			this.setState({
				output: this.verifica_anagrama(
					userinput.toUpperCase(), 
					pokemons)[0].replace(/^\w/, (c) => c.toUpperCase())})
        }	
	}
	verifica_anagrama(userinput, pokelist) {
		// Busca uma lista com todos os pokemons que formam o anagrama com a entrada
		let anagram = [];
		let sorted_input = userinput.split('').sort().join('').toUpperCase();
		for(let pokemon = 0; pokemon < pokelist.length; pokemon++){
			// reordena os caracteres da entrada do usuário, 
			// e do pokemon em ordem alfabética 			
			let sorted_pokemon = pokelist[pokemon].name.split('').sort().join('').toUpperCase();
			
			// Compara a entrada do usuário é igual ao nome do pokemon
			if (sorted_input === sorted_pokemon) {
				console.log("Anagrama encontrado:", pokelist[pokemon].name);
				anagram.push(pokelist[pokemon].name);
			}
		};
		if (anagram.length < 1) {
			anagram.push("Not Found");
		} 
		return anagram;		
	};
	
	render() {
        return (
            <main>
				<Header/>
				<App output={this.state.output}/>
            </main>
        )
    } 
}

//===========================================================

ReactDOM.render(
    <UnownGram />,
    document.getElementById('root')
);