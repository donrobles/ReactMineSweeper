import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
  constructor() {
    super(); // You need to explicitly call super() when defining the constructor of a subclass.
    this.state = {
      //Set the 'value' parameter of 'state' to null on object creation.
      value: null,
    };
  }

  render() {
    return (
      //When clicked, use the onClick() function passed in 'props' from Board.
      <button className="square" onClick={() => this.props.onClick()}>
        {/*Displat the 'value' parameter passed in 'props'.*/}
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      //Define a 'squares' array with 9 entries, each set to null.
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); //Grab 'squares' array in Board 'state'.
    squares[i] = 'X'; //Set the matching square index to 'X'.
    this.setState({squares: squares}); //Update 'squares' array in Board's 'state'.
  }

  /*Return the React Component called 'Square'.
   When returned, pass Square it's matching value in the 'squares' array of 'state' of Board.
   Also, pass it a function to update the 'squares' array in the 'state' of Board.*/
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }

  render() {
    const status = 'Next player: X';
    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
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
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
