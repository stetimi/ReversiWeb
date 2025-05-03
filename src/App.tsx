import React, { useState } from 'react';
import Board from './components/Board';
import { Player } from './components/Player'; 
import { Piece, newBoard } from './model';

const App: React.FC = () => {
  const [board, setBoard] = useState(() => newBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Piece>('b');

  const handleCellClick = (row: number, col: number) => {
    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = currentPlayer; // Set to current player's color
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'b' ? 'w' : 'b');
  };

  return (
    <div className="main-container">
      <Board board={board} onCellClick={handleCellClick} />
      <div className="players-container">
        <Player piece="b" score={0} isActive={currentPlayer === 'b'} />
        <Player piece="w" score={0} isActive={currentPlayer === 'w'} />
      </div>
    </div>
  );
};

export default App;