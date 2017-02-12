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

  renderRow(row) {
    debugger;
    const field = this.props.field;
    const currentRow = field[row];
    for (let i = 0; i < currentRow.length; i++) {
      this.renderSquare(i);
    }
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {(this.renderRow(0))}
        </div>
        <div className="board-row">
          {(this.renderRow(1))}
        </div>
        <div className="board-row">
          {(this.renderRow(2))}
        </div>
        <div className="board-row">
          {(this.renderRow(3))}
        </div>
        <div className="board-row">
          {(this.renderRow(4))}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    //Create empty 5x5 array.
    //NOTE: The array must be created this way because there must be a new array for each row.
    let fullField = [
      Array(5).fill(null),
      Array(5).fill(null),
      Array(5).fill(null),
      Array(5).fill(null),
      Array(5).fill(null)
    ];
    let mineCoordinates = this.mineCoords(), xyCoordinates;
    debugger;
    if (fullField[0] === fullField[4]) {
      console.log("True");
    }
    for (let j = 0; j < mineCoordinates.length; j++) {
      xyCoordinates = mineCoordinates[j].split(",");
      let x = xyCoordinates[0];
      let y = xyCoordinates[1];
      fullField[x][y] = "X";
    }

    this.state = {
      field: fullField,
    };
  }

  mineCoords() {
    let randPicks = Array(3).fill(null); //Create empty array
    let picked = 0;
    let xy = "";
    while (picked < 3) {
      xy = (Math.floor(Math.random() * 5)) + "," + (Math.floor(Math.random() * 5));
      if (!randPicks.includes(xy)) { //Make sure the random number hasn't been picked.
        randPicks[picked] = xy; //Add random number to array of random numbers picked.
        picked++;
      }
    }
    return randPicks;
  }

  handleClick(i) {

  }

  render() {
    const field = this.state.field;
    return (
      <div className="game">
        <div className="game-board">
          <Board
            field={field}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{{/*status*/}}</div>
          <ol>{{/*moves*/}}</ol>
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
