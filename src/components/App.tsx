import React, { useState } from 'react';
import Board from './Board';
import { Controls } from './Controls';
import { newBoard, position } from '../board';
import { Piece } from '../model';
import { applyMove, checkMove, scores } from '../rules';

const SKINS = ['waxy', 'stripy', 'scribble'];

const App: React.FC = () => {
  const [board, setBoard] = useState(() => newBoard());
  const [skin, setSkin] = useState(0);
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

  const onClickPlayer = () => {
    setSkin((skin + 1) % SKINS.length);
  };

  const newGame = () => {
    setBoard(newBoard());
    setCurrentPlayer('b');
  };

  const highlightOnHover = (row: number, col: number) =>
    checkMove(board, currentPlayer, position(row, col)) !== null;

  return (
    <div className="main-container">
      <Board
        board={board}
        onCellClick={handleCellClick}
        highlightOnHover={highlightOnHover}
        skin={SKINS[skin]}
      />
      <Controls
        scores={playerScores}
        currentPlayer={currentPlayer}
        onNewGame={newGame}
        onClickPlayer={onClickPlayer}
      />
    </div>
  );
};

export default App;
