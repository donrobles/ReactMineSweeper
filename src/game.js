import React from "react";

/**
 * Created by pc on 2/13/2017.
 */
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

export class Game extends React.Component {
  constructor() {
    super();
    let fullField = this.generateMineField(5, 4);
    this.state = {
      field: fullField,
    };
  }

  /**
   * Generate a square mine field of size 'fieldSize' with 'numberOfMines' mines.
   * @param fieldSize The size of the field, squared, to be generated.
   * @param numberOfMines The number of mines the field should have.
   * @returns {Array.<*>} The mine field of the given size, containing the given number of mines.
   */
  generateMineField(fieldSize, numberOfMines) {
    let fullField = this.generateField(fieldSize); //Create an empty field.
    let mineCoordinates = this.getMineCoords(fieldSize, numberOfMines); //Get random mine locations.
    fullField = this.insertMines(fullField, mineCoordinates); //Insert mines into the field.
    fullField = this.addMineIndicators(fullField, mineCoordinates); //Add mine indicators to field.
    return fullField;
  }

  /**
   * Generate a square field with 'fieldSize' rows and columns.
   * IE. A fieldSize of 6 will return a field with 6 rows and 6 columns for 36 squares.
   * @param fieldSize The value to use for the square field.
   * @returns {Array.<*>} A 2-dimensional array with 'fieldSize' rows and columns.
   */
  generateField(fieldSize) {
    let baseArr = new Array(fieldSize).fill(null);
    baseArr.forEach(function (row, index, array) {
      array[index] = new Array(fieldSize).fill(null);
    });
    return baseArr;
  }

  /**
   * Generate random coordinates for 'mineCount' number of mines in a 'fieldSize' field.
   * @param fieldSize The size of the field to generate the mine coordinatews within.
   * @param mineCount The number of mine coordinates to create.
   * @returns {*|Array.<T>} A 2-dimensional array with the X and Y values of the mines at MineArray[mineNumber][0=X or 1=Y]
   */
  getMineCoords(fieldSize, mineCount) {
    let randPicks = Array(mineCount).fill(null); //Create empty array the size of the number of mines.
    let picked = 0;
    while (picked < randPicks.length) {
      let xy = (Math.floor(Math.random() * fieldSize)) + "," + (Math.floor(Math.random() * fieldSize));
      if (!randPicks.includes(xy)) { //Make sure the random number hasn't already been picked.
        randPicks[picked] = xy; //Add random number to array of random numbers picked.
        picked++;
      }
    }
    //Now convert the string values in the array to integers.
    randPicks.forEach(function (entry, index, array) {
      let xyArr = entry.split(",");
      array[index] = [parseInt(xyArr[0]), parseInt(xyArr[1])];
    });
    return randPicks;
  }

  /**
   * Take the given 'fullField' and insert mines at the given 'mineCoordinates'.
   * @param fullField The field to insert mines into.
   * @param mineCoordinates The coordinates of the mines to insert.
   * @returns {*} The same 'fullField' given with mines inserted.
   */
  insertMines(fullField, mineCoordinates) {
    mineCoordinates.forEach(function (entry, index, array) {
      fullField[entry[0]][entry[1]] = "X";
    });
    return fullField;
  }

  /**
   * Add the mine indicators to the 'fullField' around each mine at 'mineCoordinates'.
   * @param fullField The field to add the mine indicators to.
   * @param mineCoordinates The coordinates of the mines around which indicators should be added.
   * @returns {*} The same 'fullField' given with mine indicators added.
   */
  addMineIndicators(fullField, mineCoordinates) {
    mineCoordinates.forEach(function (coordinates, index, array) {
      //There will only ever be 8 squares around each mine, so create a static array.
      let mineIndicators = [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)];
      //Grab the X and Y coordinates.
      let x = coordinates[0];
      let y = coordinates[1];
      let rowColEnd = fullField.length - 1;

      //Do the arithmetic for each of the 8 locations around a mine.
      mineIndicators[0] = [x - 1, y - 1];
      mineIndicators[1] = [x - 1, y];
      mineIndicators[2] = [x - 1, y + 1];
      mineIndicators[3] = [x, y + 1];
      mineIndicators[4] = [x + 1, y + 1];
      mineIndicators[5] = [x + 1, y];
      mineIndicators[6] = [x + 1, y - 1];
      mineIndicators[7] = [x, y - 1];

      //Only check the 8 surrounding squares if X or Y are on the edge.
      if (x === 0 || x === rowColEnd || y === 0 || y === rowColEnd) {
        //Remove possible locales if they're out of the bounds of the grid.
        mineIndicators.forEach(function (locale, index, array) {
          if (locale[0] < 0) {
            array[index] = null;
          } else if (locale[0] > rowColEnd) {
            array[index] = null;
          } else if (locale[1] < 0) {
            array[index] = null;
          } else if (locale[1] > rowColEnd) {
            array[index] = null;
          }
        });
      }

      //Iterate through indicator locations, incrementing only for valid locations and where there's no mine.
      mineIndicators.forEach(function (entry, index, array) {
        if (entry !== null) { //Check if the location is within the field.
          let fieldValue = fullField[entry[0]][entry[1]];
          if (fieldValue !== "X") { //Check that the location isn't a mine.
            if (fieldValue === null) { //Check if the location has a value already.
              fullField[entry[0]][entry[1]] = 1;
            } else {
              fullField[entry[0]][entry[1]]++;
            }
          }
        }
      });
    });
    return fullField;
  }

  handleClick(i) {
    //Will get around to this eventually.
    //Will handle logic of clicking different squares, if it's clear, a mine, number, etc.
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