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
  const [isNew, setIsNew] = React.useState(false);

  React.useEffect(() => {
    if (cell !== null) {
      setIsNew(true);
      const timer = setTimeout(() => setIsNew(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cell]);
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
          src={`assets/skins/${skin}/${colour}.png`}
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
      className={`board-cell ${showHighlight()} ${isNew ? 'new-piece' : ''}`}
    >
      {cellDiv(cell)}
    </div>
  );
};

export default Cell;
