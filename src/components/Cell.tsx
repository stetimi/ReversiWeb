import React from 'react';
import { CellType } from '../model';

interface CellProps {
  key: number;
  cell: CellType;
  skin: string;
  onCellClick: () => void;
  highlightOnHover: boolean;
}

const Cell: React.FC<CellProps> = ({ key, cell, skin, onCellClick, highlightOnHover }) => {
  const [hoveredCell, setHoveredCell] = React.useState<boolean>(false);
  const showHighlight = () => {
    if (hoveredCell && highlightOnHover) {
      return 'hovered';
    } else {
      return '';
    }
  };
  return (
    <div
      key={key}
      onClick={() => onCellClick()}
      onMouseEnter={() => setHoveredCell(true)}
      onMouseLeave={() => setHoveredCell(false)}
      className={`board-cell ${showHighlight()}`}
    >
      {cell &&
        (cell === 'b' ? (
          <img
            src={`/assets/skins/${skin}/black.png`}
            style={{
              width: '45px',
              height: '45px',
            }}
          />
        ) : (
          <img
            src={`/assets/skins/${skin}/white.png`}
            style={{
              width: '45px',
              height: '45px',
            }}
          />
        ))}
    </div>
  );
};

export default Cell;
