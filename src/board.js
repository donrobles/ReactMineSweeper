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
  let rowLength = props.row.length;
  let columns = new Array(rowLength);
  for (let i = 0; i < rowLength; i++) {
    columns[i] = <Square key={"col-" + i} id={"col-" + i} value={props.row[i]} onClick={() => props.onClick()}/>
  }
  return (
    <div className="board-row">
      {columns}
    </div>
  )
}

export class Board extends React.Component {
  mineField;

  constructor(props) {
    super(props);
    let rows = this.props.rows;
    let columns = this.props.columns;
    let mines = this.props.mines;
    this.mineField = this.generateMineField(rows, columns, mines);
  }

  /**
   * Generate a square mine field of size 'fieldSize' with 'numberOfMines' mines.
   * @param fieldSizeX The X size (Height) of the field to generate.
   * @param fieldSizeY The Y size (Width) of the field to generate.
   * @param numberOfMines The number of mines the field should have.
   * @returns {Array.<*>} The mine field of the given size, containing the given number of mines.
   */
  generateMineField(fieldSizeX, fieldSizeY, numberOfMines) {
    let fullField = generateField(fieldSizeX, fieldSizeY); //Create an empty field.
    let mineCoordinates = getMineCoords(fullField, numberOfMines); //Get random mine locations.
    fullField = insertMines(fullField, mineCoordinates); //Insert mines into the field.
    fullField = addMineIndicators(fullField, mineCoordinates); //Add mine indicators to field.
    return fullField;

    /**
     * Generate a field with 'fieldX' rows and 'fieldY' columns.
     * @param fieldX The height of the field to be created.
     * @param fieldY The width of the field to be created.
     * @returns {Array.<*>} A 2-dimensional array with 'fieldX' rows and 'fieldY' columns.
     */
    function generateField(fieldX, fieldY) {
      let baseArr = new Array(fieldX).fill(null);
      baseArr.forEach(function (row, index, array) {
        array[index] = new Array(fieldY).fill(null);
      });
      return baseArr;
    }

    /**
     * Generate random coordinates for 'mineCount' number of mines in the given 'fullField'.
     * @param fullField The field to generate the mine coordinates within.
     * @param mineCount The number of mine coordinates to create.
     * @returns {*|Array.<T>} A 2-dimensional array with the X and Y values of the mines at MineArray[mineNumber][0=X or 1=Y]
     */
    function getMineCoords(fullField, mineCount) {
      let randPicks = Array(mineCount).fill(null); //Create empty array the size of the number of mines.
      let picked = 0;
      let x = fullField.length, y = fullField[0].length;
      while (picked < randPicks.length) {
        let xy = (Math.floor(Math.random() * x)) + "," + (Math.floor(Math.random() * y));
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
    function insertMines(fullField, mineCoordinates) {
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
    function addMineIndicators(fullField, mineCoordinates) {
      mineCoordinates.forEach(function (coordinates, index, array) {
        //There will only ever be 8 squares around each mine, so create a static array.
        let mineIndicators = [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)];
        //Grab the X and Y coordinates.
        let x = coordinates[0];
        let y = coordinates[1];
        let rowEnd = fullField.length - 1;
        let colEnd = fullField[0].length - 1;

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
        if (x === 0 || x === rowEnd || y === 0 || y === colEnd) {
          //Remove possible locales if they're out of the bounds of the grid.
          mineIndicators.forEach(function (locale, index, array) {
            if (locale[0] < 0) {
              array[index] = null;
            } else if (locale[0] > rowEnd) {
              array[index] = null;
            } else if (locale[1] < 0) {
              array[index] = null;
            } else if (locale[1] > colEnd) {
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
  }

  generateRows() {
    let numOfRows = this.mineField.length;
    let rows = new Array(numOfRows);
    for (let i = 0; i < numOfRows; i++) {
      rows[i] = <Row key={"row-" + i} id={"row-" + i} row={this.mineField[i]} onClick={this.props.onClick()}/>;
    }
    return rows;
  }

  render() {
    return (
      <div className="board">
        {this.generateRows()}
      </div>
    )
  }
}