var QuestionFrame = React.createClass({

  render: function() {
    var qCard = this.props.qCard

    console.log("rerendering question form");

    return (

        <div id="blackcard">
            <div className="cardText black">
            {qCard}
            </div>
        </div>
    );
  }
});

var GifsFrame = React.createClass({

  render: function() {
    var cards = this.props.cards.map(function(card) {
      console.log("rerendering gifs frame");
      return (    <div id="whitecard">
            <div className="cardText white">
            <img className="cardgif" height="100%" width="100%" src={card}/>
            </div>
        </div> );
    });


    return (
      <div>
       <br></br>
        {cards}
      <br></br>
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
    console.log("rerendering Form form");
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder="submit gif" ref="gif" />
        <button>Add</button>
      </form>
    );
  }
});

var Game = React.createClass({
  getInitialState: function() {
    var startingQs= ["When someone texts back 'k'", "When Netflix asks if you're still there", "When you're about to leave but your song comes on"];

    return {
      currentPlayer: Math.random(),
      myCards: [],
      qCards: ["When someone texts back 'k'", "When Netflix asks if you're still there", "When you're about to leave but your song comes on"],
      currentQ: startingQs[Math.floor(Math.random()*(3 -0))]
    }
  },
  componentDidMount: function(){
    var that = this;
    this.socket = io();
    this.socket.on('setQ', function(testQ){
      console.log("setting Q")
      that.setState({currentQ: testQ })
    })
    this.socket.on('addGif', function(gif){
       console.log("adding gif on client")
        that.setState({myCards: that.state.myCards.concat( gif)})

    })

  },
  pickQ: function(){
  return this.state.qCards[Math.floor(Math.random()*(this.state.qCards.length -0))];
  },
  addCard: function(testText) {
    console.log("testText", testText)
    if ( testText.includes(".gif") || testText.includes(".jpg") ) {
      // this.setState({myCards: this.state.myCards.concat( testText)
        this.socket.emit('newGif', testText)
    }
    else { alert("PLEASE ENTER A GIF");
    }
  },
  newQCard: function(){
    this.socket.emit('newQCard')
  },
  render: function() {
    var cards = this.state.myCards;
    var currentQ = this.state.currentQ;

    return (
      <div>
        <button onClick={this.newQCard}>Pick New Question</button>
        <hr />
      <QuestionFrame qCard = {currentQ} />
      <GifsFrame cards = {cards}/>
      <Form addCard={this.addCard}/>
      </div>
    )
  }
});


React.render(<Game />, document.getElementById("root"));