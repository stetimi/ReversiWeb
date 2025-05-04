import React from 'react';
import '../styles/Board.scss';
import { BoardType } from '../model';

interface BoardProps {
  board: BoardType;
  onCellClick: (row: number, col: number) => void;
  highlightOnHover: (row: number, col: number) => boolean;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, highlightOnHover }) => {
  const [hoveredCell, setHoveredCell] = React.useState<[number, number] | null>(null);
  const showHighlight = (row: number, col: number) => {
    if (hoveredCell?.[0] === row && hoveredCell?.[1] === col && highlightOnHover(row, col)) {
      return 'hovered';
    } else {
      return "";
    }
  };

  return (
      <div className="board-container">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onCellClick(rowIndex, colIndex)}
              onMouseEnter={() => setHoveredCell([rowIndex, colIndex])}
              onMouseLeave={() => setHoveredCell(null)}
              className={`board-cell ${showHighlight(rowIndex, colIndex)}`}
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