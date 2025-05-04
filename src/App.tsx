import React, { useState } from 'react';
import Board from './components/Board';
import { Controls } from './components/Controls';
import { newBoard, position } from './board';
import { Piece } from './model';
import { applyMove, checkMove, scores } from './rules';

const App: React.FC = () => {
  const [board, setBoard] = useState(() => newBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Piece>('b');
  const playerScores = scores(board);

  const handleCellClick = (row: number, col: number) => {
    const moveResult = checkMove(board, currentPlayer, position(row, col));
    if (moveResult) {
      const newBoard = applyMove(board, moveResult);
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'b' ? 'w' : 'b');
    }
  };

  const highlightOnHover = (row: number, col: number) =>
    checkMove(board, currentPlayer, position(row, col)) !== null;

  return (
    <div className="main-container">
      <Board board={board} onCellClick={handleCellClick} highlightOnHover={highlightOnHover} />
      <Controls scores={playerScores} currentPlayer={currentPlayer} />
    </div>
  );
};

export default App;
