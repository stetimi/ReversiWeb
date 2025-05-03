import React, { useState } from 'react';
import Board from './components/Board';
import { Player } from './components/Player'; 
import { BoardType, Piece } from './model';

const App: React.FC = () => {
  const [board, setBoard] = useState(() =>
    Array(8).fill(null).map(() =>
      Array(8).fill(null)
    )
  );
  const [currentPlayer, setCurrentPlayer] = useState<Piece>('b');

  // Initialize starting pieces
  const initialBoard: BoardType = [...board];
  initialBoard[3][3] = 'w';
  initialBoard[3][4] = 'b';
  initialBoard[4][3] = 'b';
  initialBoard[4][4] = 'w';

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