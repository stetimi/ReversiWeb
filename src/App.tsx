import React, { useState } from 'react';
import Board from './components/Board';
import { Player } from './components/Player'; 
import { newBoard, position } from './board';
import { Piece } from './model';
import { checkMove } from './rules';

const App: React.FC = () => {
  const [board, setBoard] = useState(() => newBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Piece>('b');

  const handleCellClick = (row: number, col: number) => {
    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = currentPlayer; // Set to current player's color
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'b' ? 'w' : 'b');
  };

  const highlightOnHover = (row: number, col: number) => 
    checkMove(board, currentPlayer, position(row, col)) !== null;

  return (
    <div className="main-container">
      <Board board={board} onCellClick={handleCellClick} highlightOnHover={highlightOnHover}/>
      <div className="players-container">
        <Player piece="b" score={0} isActive={currentPlayer === 'b'} />
        <Player piece="w" score={0} isActive={currentPlayer === 'w'} />
      </div>
    </div>
  );
};

export default App;