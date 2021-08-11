// hexadecimal colors reference 
const COLORS = ['#16a085', '#27ae60', '#2c3e50',
'#f39c12', '#e74c3c', '#9b59b6', '#FB6964',
'#342224', '#472E32', '#BDBB99', '#77B1A9',
'#73A857'];


// json url where the quotes come from
const JSONQUOTESURL = `https://gist.githubusercontent.com/PinheiroCosta/4f0a771783d1889888d04764bc9285bb/raw/07c3446ff5b03b1a3edd9c84229b2f1e49c1c5d0/citacoes.json`;

class Quote extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "quote-text" }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-quote-left" }), /*#__PURE__*/
      React.createElement("span", { id: "text" },
      this.props.quote), /*#__PURE__*/

      React.createElement("i", { className: "fa fa-quote-right" }), /*#__PURE__*/

      React.createElement("div", { className: "quote-author" }, "-", /*#__PURE__*/
      React.createElement("span", { id: "author" },
      this.props.author))));




  }}


class Buttons extends React.Component {
  render() {
    // to post the quote on tweeter
    const tweeterHref = "https://twitter.com/intent/tweet?hashtags=quotes&related=react&text=" + encodeURIComponent('"' + this.props.currentQuote + '" ' + this.props.currentAuthor);
    // to post the quote on tumblr
    const tumblrHref = "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" + encodeURIComponent(this.props.currentAuthor) + '&content=' + encodeURIComponent(this.props.currentQuote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button';

    return /*#__PURE__*/(
      React.createElement("div", { className: "buttons" }, /*#__PURE__*/
      React.createElement("a", {
        className: "button",
        id: "tweet-quote",
        title: "Tweet this quote!",
        target: "_top",
        style: this.props.style,
        href: tweeterHref }, /*#__PURE__*/

      React.createElement("i", { className: "fa fa-twitter" })), /*#__PURE__*/

      React.createElement("a", {
        className: "button",
        id: "tumblr-quote",
        title: "Post this quote on tumblr!",
        target: "_blank",
        href: tumblrHref,
        style: this.props.style }, /*#__PURE__*/

      React.createElement("i", { className: "fa fa-tumblr" })), /*#__PURE__*/

      React.createElement("button", {
        className: "button",
        id: "new-quote",
        onClick: () => this.props.onClick(),
        style: this.props.style }, "Nova Cita\xE7\xE3o")));




  }}


class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteList: [],
      currentQuote: null,
      currentAuthor: null,
      style: {
        color: null } };


  }

  async componentDidMount() {
    // get quote list from json file
    try {
      const response = await fetch(JSONQUOTESURL);

      if (!response.ok) {
        // handle response erros
        throw Error(response.statusText);
      } else {
        // store the json file 
        const json = await response.json();

        /* set a list inside the component with 
            all quotes from json */
        this.setState({
          quoteList: json.quotes });

        /* Once eveything is set, activate the 
            first click function */
        this.handleClick();
      }

    } catch (error) {
      console.log(error);
    }

  }

  handleClick() {
    // store a random color
    const randomColor = COLORS[Math.floor(
    Math.random() * COLORS.length)];


    // store a copy of all quotes
    const allQuotes = this.state.quoteList.slice();

    /* store a random number betweem 0 and the
        length of all quotes to use as index */
    const randomQuote = Math.floor(
    Math.random() * allQuotes.length);


    //  store a random quote-author pair
    const quoteData = allQuotes[randomQuote];

    /* Add jquery animation to fadeInOut the quote-author               pair on every quote change */
    $('.quote-text').animate({
      opacity: 0 },
    0, function () {
      $(this).animate({
        opacity: 1 },
      2500);
    });

    // Set the current quote data and the UI style
    this.setState({
      currentQuote: quoteData["quote"],
      currentAuthor: quoteData["author"],
      style: {
        color: randomColor } });


  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        id: "wrapper",
        style: {
          backgroundColor: this.state.style.color } }, /*#__PURE__*/

      React.createElement("div", {
        id: "quote-box",
        style: this.state.style }, /*#__PURE__*/
      React.createElement(Quote, {
        quote: this.state.currentQuote,
        author: this.state.currentAuthor }), /*#__PURE__*/
      React.createElement(Buttons, {
        onClick: () => this.handleClick(),
        style: {
          backgroundColor: this.
          state.style.color } })), /*#__PURE__*/


      React.createElement("footer", null, "by ", /*#__PURE__*/React.createElement("a", { href: "https://codepen.io/pinheirocosta/" }, "PinheiroCosta"))));


  }}



// ========================================

ReactDOM.render( /*#__PURE__*/
React.createElement(QuoteMachine, null),
document.getElementById('root'));