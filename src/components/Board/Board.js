'use strict';

import React from 'react';
import './board.css';

class Board extends React.Component {
  constructor() {
    super();
  }

  renderSquare(i) {
    const squares   = this.props.squares;
    let active      = '';
    let activeClass = '';

    if (this.props.winSuares && this.props.winSuares.active) {
      for (const value of this.props.winSuares.active) {
        if (value == i) {
          active = 'active';
          break;
        }
      }
    }
    activeClass = `${active} square`;
    return <Square key={i} active={activeClass} value={squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  renderBoards() {
    const boardRow  = 3;
    const boardCell = 3;
    let rows  = [];
    let cells = [];
    let num   = 0;

    for (let i = 0; i < boardRow; i++) {
      for (let j = 0; j < boardCell; j++) {
        cells.push(this.renderSquare(num))
        num++
      }
      rows.push(<div key={i} styleName="board-row">{ cells }</div>)
      cells = [];
    }
    return (
      <div>{rows}</div>
    )
  }

  render() {
    return (
      <div>
       {this.renderBoards()}
      </div>
    );
  }
}

function Square(props) {
  return (
    <button styleName={props.active} onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

export default Board;
