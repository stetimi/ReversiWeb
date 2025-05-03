import React from 'react';
import '../styles/Board.css';
import { BoardType } from '../model';

interface BoardProps {
  board: BoardType;
  onCellClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
  const [hoveredCell, setHoveredCell] = React.useState<[number, number] | null>(null);
  
  return (
      <div className="board-container">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onCellClick(rowIndex, colIndex)}
              onMouseEnter={() => setHoveredCell([rowIndex, colIndex])}
              onMouseLeave={() => setHoveredCell(null)}
              className={`board-cell ${hoveredCell?.[0] === rowIndex && hoveredCell?.[1] === colIndex ? 'hovered' : ''}`}
            >
              {cell && <div style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                backgroundColor: cell === 'b' ? '#333' : '#fff'
              }} />}
            </div>
          ))
        )}
      </div>
  );
};

export default Board;