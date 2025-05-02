import React, { useState } from 'react';

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
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 60px)',
      gap: '2px',
      backgroundColor: '#2d582d',
      padding: '10px',
      borderRadius: '8px'
    }}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#4a752d',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {cell && <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              backgroundColor: cell === 'black' ? '#333' : '#fff'
            }} />}
          </div>
        ))
      )}
    </div>
  );
};

export default App;