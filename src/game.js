import React from "react";
import {Menu} from "./menu";
import {Board} from "./board";

export class Game extends React.Component {
  constructor() {
    debugger;
    super();
    this.state = {
      rows: 20,
      columns: 20,
      mines: 50,
    };
  }

  updateMineField(rows, columns, mines) {
    this.setState({
      rows: rows,
      columns: columns,
      mines: mines,
    });
  }

  handleClick(i) {
    //Will get around to this eventually.
    //Will handle logic of clicking different squares, if it's clear, a mine, number, etc.
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Menu updateMineField={this.updateMineField.bind(this)}/>
          <Board rows={this.state.rows} columns={this.state.columns} mines={this.state.mines}
                 onClick={(i) => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}