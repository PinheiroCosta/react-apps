class Pomodoro extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "pomodoro" }, /*#__PURE__*/
      React.createElement("div", { id: "break-label" }, "Break", /*#__PURE__*/

      React.createElement("a", { id: "break-increment", href: "#" }, /*#__PURE__*/
      React.createElement("i", { className: "bi bi-caret-up-fill" })), /*#__PURE__*/


      React.createElement("div", { id: "break-length" }, "5"), /*#__PURE__*/

      React.createElement("a", { id: "break-decrement", href: "#" }, /*#__PURE__*/
      React.createElement("i", { className: "bi bi-caret-down-fill" }))), /*#__PURE__*/


      React.createElement("div", { id: "session-label" }, "Session", /*#__PURE__*/
      React.createElement("a", { id: "session-increment", href: "#" }, /*#__PURE__*/
      React.createElement("i", { className: "bi bi-caret-up-fill" })), /*#__PURE__*/


      React.createElement("div", { id: "session-length" },
      this.props.minutesLeft), /*#__PURE__*/


      React.createElement("a", { id: "session-decrement", href: "#" }, /*#__PURE__*/
      React.createElement("i", { className: "bi bi-caret-down-fill" })))));




  }}


class Clock extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, "Timer"), /*#__PURE__*/
      React.createElement("div", { id: "time-left" },
      this.props.timer)));



  }}


class Player extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "player" }, /*#__PURE__*/
      React.createElement("a", { id: "play", href: "#" }, /*#__PURE__*/React.createElement("i", { className: "bi bi-play-fill" })), /*#__PURE__*/
      React.createElement("a", { id: "pause", href: "#" }, /*#__PURE__*/React.createElement("i", { className: "bi bi-pause-fill" })), /*#__PURE__*/
      React.createElement("a", { id: "stop", href: "#" }, /*#__PURE__*/React.createElement("i", { className: "bi bi-stop-fill" }))));


  }}


class TimerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: new Date(0, 0, 0, 0, 25, 0) };

  }

  render() {
    const clockOptions = {
      minute: '2-digit',
      second: '2-digit' };

    // handle sixty minutes in session length
    const minutesLeft = this.state.timer.getHours() ?
    60 :
    this.state.timer.getMinutes();
    // handle sixty minutes in the timer
    const timer = this.state.timer.getHours() ?
    "60:00" :
    this.state.timer.toLocaleTimeString([], clockOptions);

    console.log(timer);

    return /*#__PURE__*/(
      React.createElement("div", { id: "timer" }, /*#__PURE__*/
      React.createElement(Pomodoro, { minutesLeft: minutesLeft }), /*#__PURE__*/
      React.createElement(Clock, { timer: timer }), /*#__PURE__*/
      React.createElement(Player, null)));


  }}



// ===========================================================

ReactDOM.render( /*#__PURE__*/
React.createElement(TimerApp, null),
document.getElementById('root'));