import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

/*
 This is a Stateless Functional Component.
 It exists purely to return something that requires no state.
 */
function Square(props) {
  return (
    //When clicked, use the onClick() function passed in 'props' from Board.
    <button className="square" onClick={() => props.onClick()}>
      {/*Display the 'value' parameter passed in 'props'.*/}
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  /*Return the React Stateless Functional Component called 'Square'.
   When returned, pass Square it's matching value in the 'squares' array of 'props' of Board.
   Also, pass it a function to update the 'squares' array in the 'state' of Game.*/
  renderSquare(i) {
    const squares = this.props.squares;
    return <Square value={squares[i]} onClick={() => this.props.onClick(i)}/>;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {/*Call the 'renderSquare' function, passing a value parameter.*/}
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      //An array for 'squares' arrays.
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history; //Grab the history in Game's 'state'.
    const current = history[history.length - 1]; //Grab the current array in 'history'.
    const squares = current.squares.slice(); //Copy the 'current' squares array.
    if (calculateWinner(squares) || squares[i]) {
      return; //Ignore click if there's a winning line.
    }
    //Store an X or O based on who's turn it is.
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      //Add the new 'squares' array to the 'history' array.
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext, //Flip the xIsNext boolean to it's opposite.
    });
  }

  render() {
    const history = this.state.history; //Grab the Game's 'history' array.
    const current = history[history.length - 1]; //Set the latest array in 'history'.
    const winner = calculateWinner(current.squares); //Check if there's a winner.

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    //Create an array with entries a, b, and c set to one winning line from the list of potential wins.
    const [a, b, c] = lines[i];
    /*
     What's being done here is straightforward once you sit and think about it.

     First, lets convert the array values like so to make it easier to read...
     A = squares[a]
     B = squares[b]
     C = squares[c]

     We can say that if...
     A != null
     Then continue checking if...
     A === B
     And if so, does...
     A === C

     The reason for this is because logically if...
     A = B, and A = C, then you can assume B = C because another way to write it would be...
     B = A = C

     If any of these checks fail, there's no potential for a winning line to exist.
     */
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
