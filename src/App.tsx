import React, { useState } from 'react';
import Board from './components/Board';

const App: React.FC = () => {
  const [board, setBoard] = useState(() =>
    Array(8).fill(null).map(() =>
      Array(8).fill(null)
    )
  );
  const [currentPlayer, setCurrentPlayer] = useState<'black'|'white'>('black');

  // Initialize starting pieces
  const initialBoard = [...board];
  initialBoard[3][3] = 'white';
  initialBoard[3][4] = 'black';
  initialBoard[4][3] = 'black';
  initialBoard[4][4] = 'white';

  const handleCellClick = (row: number, col: number) => {
    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = currentPlayer; // Set to current player's color
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
  };

  return (
    <Board board={board} onCellClick={handleCellClick} />
  );
};

export default App;