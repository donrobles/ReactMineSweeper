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

function Row(props) {
  return (
    <div className="board-row">
      <Square id="col-0" value={props.row[0]} onClick={() => props.onClick()}/>
      <Square id="col-1" value={props.row[1]} onClick={() => props.onClick()}/>
      <Square id="col-2" value={props.row[2]} onClick={() => props.onClick()}/>
      <Square id="col-3" value={props.row[3]} onClick={() => props.onClick()}/>
      <Square id="col-4" value={props.row[4]} onClick={() => props.onClick()}/>
    </div>
  )
}

class Board extends React.Component {

  render() {
    return (
      <div className="board">
        <Row id="row-0" row={this.props.field[0]} onClick={this.props.onClick()}/>
        <Row id="row-1" row={this.props.field[1]} onClick={this.props.onClick()}/>
        <Row id="row-2" row={this.props.field[2]} onClick={this.props.onClick()}/>
        <Row id="row-3" row={this.props.field[3]} onClick={this.props.onClick()}/>
        <Row id="row-4" row={this.props.field[4]} onClick={this.props.onClick()}/>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor() {
    super();
    let fullField = this.generateField();
    this.state = {
      field: fullField,
    };
  }

  generateField() {
    //Create empty 5x5 array.
    //NOTE: The array must be created this way because there must be a new array for each row.
    let fullField = [Array(5).fill(null), Array(5).fill(null), Array(5).fill(null), Array(5).fill(null), Array(5).fill(null)];
    let mineCoordinates = this.mineCoords(), xyCoordinates;
    for (let j = 0; j < mineCoordinates.length; j++) {
      xyCoordinates = mineCoordinates[j].split(",");
      fullField[xyCoordinates[0]][xyCoordinates[1]] = "X";
    }
    fullField = this.mineIndicators(fullField, mineCoordinates);
    return fullField;
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

  mineIndicators(fullField, mineCoordinates) {
    let xyCoordinates, x, y;
    let rowColEnd = fullField.length;
    debugger;
    for (let j = 0; j < mineCoordinates.length; j++) {
      xyCoordinates = mineCoordinates[j].split(",");
      x = parseInt(xyCoordinates[0]);
      y = parseInt(xyCoordinates[1]);
    }
    return fullField;
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