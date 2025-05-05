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
  const cellDiv = (cell: CellType) => {
    if (cell === null) {
      return null;
    } else {
      const colour = cell === 'b' ? 'black' : 'white';
      return (
        <img
          src={`/assets/skins/${skin}/${colour}.png`}
          alt="{colour}"
          style={{
            width: '45px',
            height: '45px',
          }}
        />
      );
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
      {cellDiv(cell)}
    </div>
  );
};

export default Cell;
