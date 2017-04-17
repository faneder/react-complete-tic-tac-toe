'use strict';

import React from 'react';
import Board from '../Board/Board.js';

import './Game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      selectedSqaure: {},
      winSuares: {},
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      winSuares: calculateWinner(squares),

    });
    this.selectBold(history.length);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
    this.selectBold(step);
  }

  toggleSelectBold(type) {
    if (!type) return;
    let step;
    switch (type) {
      case 'up':
        if (this.state.stepNumber == 0) return;
        step = this.state.stepNumber - 1;
        break;
      case 'down':
        if (this.state.stepNumber == this.state.history.length - 1) return;
        step = this.state.stepNumber + 1;
        break;
    }
    this.jumpTo(step);
  }

  selectBold(step) {
    let selected = {};
    selected[step] = this.state.selectedSqaure[step] = "selected";

    this.setState({
      selectedSqaure: selected
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner  = calculateWinner(current.squares);
    let status;

    if (winner) {
      status = 'Winner: ' + winner.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      const selected = (this.state.selectedSqaure[move] === 'selected') ? 'selected' : '';
      return (
        <li key={move}>
          <a href="#" styleName={selected} onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    return (
      <div styleName="game">
        <div>
          <Board
            squares={current.squares}
            winSuares={this.state.winSuares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div styleName="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div>
         <button onClick={() => this.toggleSelectBold('up')}>&uarr;</button>
         <button onClick={() => this.toggleSelectBold('down')}>&darr;</button>
        </div>
      </div>
    );
  }
}

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
      return {
        winner: squares[i],
        active: lines[i]
      };
    }
  }
  return null;
}

export default Game;