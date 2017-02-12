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

class Row extends React.Component {
  /*Return the React Stateless Functional Component called 'Square'.
   When returned, pass Square it's matching value in the 'squares' array of 'props' of Board.
   Also, pass it a function to update the 'squares' array in the 'state' of Game.*/
  renderSquare(value) {
    return <Square value={value} onClick={() => this.props.onClick()}/>;
  }

  render() {
    let row = this.props.row;
    return (
      <div className="board-row">
        {this.renderSquare(row[0])}
        {this.renderSquare(row[1])}
        {this.renderSquare(row[2])}
        {this.renderSquare(row[3])}
        {this.renderSquare(row[4])}
      </div>
    )
  }
}

class Board extends React.Component {

  render() {
    debugger;
    let field = this.props.field;
    return (
      <div className="board">
        <Row row={field[0]} onClick={this.props.onClick()}/>
        <Row row={field[1]} onClick={this.props.onClick()}/>
        <Row row={field[2]} onClick={this.props.onClick()}/>
        <Row row={field[3]} onClick={this.props.onClick()}/>
        <Row row={field[4]} onClick={this.props.onClick()}/>
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
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);