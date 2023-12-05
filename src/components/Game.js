import React, { useState } from "react";
import "./Game.css";
import Box from "./Box";

const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const Game = () => {
  const [turn, setTurn] = useState("X");
  const [winningText, setWinningText] = useState("");

  function changeTurn(row, col) {
    board[row][col] = turn;
    setTurn((turn) => (turn === "X" ? "O" : "X"));
    const winner = checkForWin();
    if (winner) {
      setWinningText(winner + " won!");
    } else if (isBoardFull()) {
      setWinningText("It's a draw!");
    }
  }

  function checkForWin() {
    for (let i = 0; i < board.length; i++) {
      const col = board[i];
      if (
        col[0] === col[1] &&
        col[1] === col[2] &&
        col[2] === col[0] &&
        col[0] !== null
      ) {
        return col[0];
      }
    }

    for (let i = 0; i < board.length; i++) {
      const row0 = board[0][i];
      const row1 = board[1][i];
      const row2 = board[2][i];
      if (row0 === row1 && row1 === row2 && row0 === row2 && row0 !== null) {
        return row0;
      }
    }

    const d0 = board[0][0];
    const d1 = board[1][1];
    const d2 = board[2][2];
    if (d0 === d1 && d1 === d2 && d0 === d2 && d0 !== null) {
      return d0;
    }

    const p0 = board[0][2];
    const p1 = board[1][1];
    const p2 = board[2][0];
    if (p0 === p1 && p1 === p2 && p0 === p2 && p0 !== null) {
      return p0;
    }

    return null;
  }

  function isBoardFull() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === null) {
          return false;
        }
      }
    }
    return true;
  }

  return (
    <div id="game">
      <div>
        <h1>{winningText}</h1>
      </div>
      <div className="row">
        <Box row={0} col={0} currentState={turn} changeTurn={changeTurn} />
        <Box row={0} col={1} currentState={turn} changeTurn={changeTurn} />
        <Box row={0} col={2} currentState={turn} changeTurn={changeTurn} />
      </div>
      <div className="row">
        <Box row={1} col={0} currentState={turn} changeTurn={changeTurn} />
        <Box row={1} col={1} currentState={turn} changeTurn={changeTurn} />
        <Box row={1} col={2} currentState={turn} changeTurn={changeTurn} />
      </div>
      <div className="row">
        <Box row={2} col={0} currentState={turn} changeTurn={changeTurn} />
        <Box row={2} col={1} currentState={turn} changeTurn={changeTurn} />
        <Box row={2} col={2} currentState={turn} changeTurn={changeTurn} />
      </div>
      {winningText || isBoardFull() ? (
        <button
          onClick={() => {
            window.location.reload(true);
          }}
        >
          Tekrar başla
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Game;
