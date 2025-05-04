import React, { useState } from 'react';
import Board from './components/Board';
import { Player } from './components/Player';
import { newBoard, position } from './board';
import { Piece } from './model';
import { applyMove, checkMove, scores } from './rules';

const App: React.FC = () => {
  const [board, setBoard] = useState(() => newBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Piece>('b');
  const playerScores = scores(board);
  const history = [];

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
      <div className="players-container">
        <Player piece="b" score={playerScores.black} isActive={currentPlayer === 'b'} />
        <div className="controls-container">
          <div className="controls-row">
            <button className="control-button">New Game</button>
          </div>
          <div className="controls-row">
            <button className="control-button">◀</button>
            <button className="control-button">▶</button>
          </div>
        </div>
        <Player piece="w" score={playerScores.white} isActive={currentPlayer === 'w'} />
      </div>
    </div>
  );
};

export default App;
