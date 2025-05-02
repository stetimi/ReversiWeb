import React from 'react';
import '../styles/Board.css';

const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
  return (
    <div className="board-container">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            className="board-cell"
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

export default Board;