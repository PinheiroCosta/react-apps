// Configuração padrão
const MAX_IMAGE_LENGTH = 8; // valor inicial

const assets = {
  // Simula as entradas de um banco de dados
  selfies: [
  { id: 1,
    description: "Me and my BFF",
    url: "https://www.dropbox.com/s/q4pcuy7pk15lokd/Cat-dog-selfie.jpg?raw=1" },
  { id: 2,
    description: "wazaaaaa",
    url: "https://www.dropbox.com/s/6h6by1a21kxrhvl/dog-selfie.jpg?raw=1" },
  { id: 3,
    description: "Yo dog!",
    url: "https://www.dropbox.com/s/fpzdoof9buozxvc/dog-selfie2.jpg?raw=1" },
  { id: 4,
    description: "couple",
    url: "https://www.dropbox.com/s/puk1j7jp2ps9tff/dog-selfie3.jpg?raw=1" },
  { id: 5,
    description: "da Gang",
    url: "https://www.dropbox.com/s/v3q5uxpf3rtkao0/selfie-pets.jpg?raw=1" }],

  landscapes: [
  { id: 6,
    description: "Cave",
    url: "https://www.dropbox.com/s/wtrul4mb9ciju2e/gruta.jpg?raw=1" },
  { id: 7,
    description: "Snow",
    url: "https://www.dropbox.com/s/ryzxxfr765qziyv/snow.jpg?raw=1" },
  { id: 8,
    description: "China",
    url: "https://www.dropbox.com/s/222ze77wzvt6mvj/china.jpg?raw=1" }],

  default: [{ id: 0,
    description: "",
    url: "https://www.dropbox.com/s/13rst0wyxvzvxj7/No_picture_available.png?raw=1" }] };


class ImageCard extends React.Component {
  // Cartão de imagem do carrossel
  render() {
    return /*#__PURE__*/(
      React.createElement("figure", { className: "image-card", id: this.props.imageCardId /* id da imagem [string] */ }, /*#__PURE__*/
      React.createElement("img", {
        src: this.props.src
        // adiciona texto alternativo se houver
        , alt: this.props.alt ? this.props.alt : "" }), /*#__PURE__*/

      React.createElement("figcaption", null,
      this.props.description)));



  }}


class Slider extends React.Component {
  // Slider do carrossel
  constructor(props) {
    super(props);
    if (this.props.images) {
      /* + TODO refatorar +
      	Necessário para computar corretamente o laço de repetição
      	do número de âncoras e imagens; 
       	Recebe a quantidade de imagens que existir na lista selecionada
      	pelo banco de dados	ou o máximo de imagens pré estabelecido 
      	na constante MAX_IMAGE_LENGTH
      */
      var maxLengthInitialValue = this.props.images.length > MAX_IMAGE_LENGTH ?
      MAX_IMAGE_LENGTH :
      this.props.images.length <= 1 ?
      1 :
      this.props.images.length;
    } else {
      /* Caso não haja imagens informadas pelo banco de dados
       recebe o valor mínimo de 1*/
      var maxLengthInitialValue = 1;
    }
    this.state = {
      nImages: this.props.maxImages // se maxImages for informado ... [inteiro]
      ? this.props.maxImages // máximo de imagens é definido pelo usuario
      : maxLengthInitialValue, // se não, o máximo de imagens é definido pelo sistema
      showIcons: this.props.icons, // Mostra os ícones?	[boleano]
      sliderTitle: this.props.title, // título do carrossel	[string]
      selectedImages: this.props.images.length >= 1 // Se houver imagens...
      ? this.props.images // recebe as imagens do componente [lista de objetos]
      : assets.default // senão recebe imagem de erro	
    };

    window.addEventListener("hashchange", function () {
      /* move o scroll da página 30px para cima quando
      uma âncora for acionada */
      window.scrollTo(window.scrollX, window.scrollY - 30);
    });

  }
  toggleIcons() {
    // Ativa ou desativa os ícones
    this.setState({
      showIcons: !this.state.showIcons });

  }
  renderSlider(selectedImages) {
    // renderiza o carrossel a partir das imagens selecionadas
    const slider = []; // lista que irá receber os cartões de imagem
    const nImages = this.state.nImages; // número máximo de imagems por slider [inteiro]
    for (let i = 0; i < nImages; i++) {
      // para cara imagem selecionada...
      slider.push( /*#__PURE__*/
      // adiciona um cartão de imagem
      React.createElement(ImageCard, {
        imageCardId: String("slider-" + this.props.
        sliderId + "-img-" + selectedImages[i].id),
        description: selectedImages[i].description,
        src: selectedImages[i].url }));


    }
    return slider;
  }
  renderAnchors(selectedImages) {
    // renderiza uma âncora de referência para cada imagem
    const anchors = []; // lista de referencia das imagens
    const nImages = this.state.nImages; // número de imagens do slider
    for (let i = 0; i < nImages; i++) {
      // para cada imagem selecionada
      anchors.push( /*#__PURE__*/
      // adiciona uma âncora que aponta para o id da imagem correspondente
      React.createElement("a", {
        href: String("#slider-" + this.props.sliderId + "-img-" + selectedImages[i].id),
        className: String("anchor-" + i) }));

    }
    return anchors;
  }
  render() {
    const selectedImages = this.state.selectedImages;
    const sliderTitle = this.state.sliderTitle;
    const sliderId = this.props.id;

    return /*#__PURE__*/(
      React.createElement("div", { className: "slider" }, /*#__PURE__*/

      React.createElement("h2", null,
      this.state.showIcons ? /*#__PURE__*/
      React.createElement("span", { className: "camera icon" }, "\u2609") :
      "",
      sliderTitle), /*#__PURE__*/

      React.createElement("div", { className: "slides", id: sliderId },

      this.renderSlider(selectedImages)),



      this.renderAnchors(selectedImages)));



  }}


class CarouselManager extends React.Component {
  componentDidMount() {
    const adjustSliders = document.getElementsByClassName("anchor-0");
    if (adjustSliders !== null) {
      /* +TODO Refatorar + 
      	Necessário para ajustar as imagens da primeira vez que a página carregar */
      // Se houver âncoras... 
      for (let i = adjustSliders.length - 1; i >= 0; i--) {
        // clica na primeira ancora de cada slider
        adjustSliders[i].click();
      }
    }
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "main-app" }, /*#__PURE__*/
      React.createElement(Slider, {
        sliderId: "0",
        title: "Top Selfies",
        images: assets.selfies,
        icons: true })));


  }}


// ===========================================================

ReactDOM.render( /*#__PURE__*/
React.createElement(CarouselManager, null),
document.getElementById('root'));