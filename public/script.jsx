var QuestionFrame = React.createClass({
  render: function() {
    var qCard = this.props.qCard

    return (
        <div id="blackcard">
            <div className="cardText black">
            {qCard}
            </div>
        </div>
    );
  }
});

var Form = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var gifInput = React.findDOMNode(this.refs.gif);
    this.props.addCard(gifInput.value);
    gifInput.value = '';
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder="submit gif" ref="gif" />
        <button>Add</button>
      </form>
    );
  }
});

var CardAdder = React.createClass({
  getInitialState: function() {
    return { myCards: [ "http://static1.purebreak.com.br/articles/7/73/97/@/39324-beyonce-esta-fazendo-33-anos-620x0-1.jpg"]
    , qCards: ["When someone texts back 'k'", "When Netflix asks if you're still there", "When you're about to leave but your song comes on"]
    //randomQ: this.pickRandomQ()
    }
  },
  addCard: function(testText) {
    console.log("test text", this.state.myCards)
    console.log("test text", this.props)
    if ( testText.includes(".gif") || testText.includes(".jpg") ) {this.setState({myCards: this.state.myCards.concat( testText) }); }
    else { alert("PLEASE ENTER A GIF");}
    // this.setState({myCards: this.state.myCards.concat( Math.random()) });
  },
  // pickRandomQ: function() {
  //   console.log("STATE", this)
  //   return this.state.qCards[Math.floor(Math.random()*(this.state.qCards.length -0))]
  // },
  render: function() {
    var cards = this.state.myCards.map(function(card) {
      return (        <div id="whitecard">
            <div className="cardText white">
            <img className="cardgif" height="100%" width="100%" src={card}/>
            </div>
        </div> );
    });
    console.log("card length", cards.length)
    var randomCard = this.state.qCards[Math.floor(Math.random()*(this.state.qCards.length -0))];
    console.log("asf")
    var randomGif = this.state.myCards[Math.floor(Math.random()*(this.state.myCards.length -0))];
   // var myRandomQ = this.state.randomQ
    //console.log("randomQ", randomQ)
    return (
      <div>
        <button onClick={this.addCard}>Test Button</button>
        <hr />
      <QuestionFrame qCard={randomCard}/>

       <br></br>
        {cards}
      <br></br>
      <Form addCard={this.addCard}/>
      </div>
    )
  }
});

// var Main = React.createClass({
//   getInitialState: function() {
//     return {logins: []};
//   },
//   addCard: function(loginToAdd) {
//     this.setState({logins: this.state.logins.concat(loginToAdd)});
//   },
//   render: function() {
//     var cards = this.state.logins.map(function(login) {
//       return (<Card login={login} />);
//     });
//     return (
//       <div>
//         <button onClick={this.addCard}>Test Button</button>
//         <hr />
//         {cards}
//       </div>
//     )
//   }
// });

React.render(<CardAdder />, document.getElementById("root"));