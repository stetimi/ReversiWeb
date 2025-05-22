import React from 'react';
import { CellType } from '../model';

interface CellProps {
  cell: CellType;
  skin: string;
  onCellClick: () => void;
  highlightOnHover: boolean;
}

const Cell: React.FC<CellProps> = ({ cell, skin, onCellClick, highlightOnHover }) => {
  const [hoveredCell, setHoveredCell] = React.useState<boolean>(false);
  const [isNew, setIsNew] = React.useState(false);
  const [wasFlipped, setWasFlipped] = React.useState(false);
  const prevCellRef = React.useRef<CellType>(null);

  React.useEffect(() => {
    if (cell !== null && prevCellRef.current === null) {
      setIsNew(true);
      setTimeout(() => setIsNew(false), 300);
    }
    if (cell !== prevCellRef.current && prevCellRef.current !== null) {
      setWasFlipped(true);
      setTimeout(() => setWasFlipped(false), 300);
    }
    prevCellRef.current = cell;
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
      onClick={() => onCellClick()}
      onMouseEnter={() => setHoveredCell(true)}
      onMouseLeave={() => setHoveredCell(false)}
      className={`board-cell ${showHighlight()} ${isNew ? 'new-piece' : ''} ${wasFlipped ? 'flipped-piece' : ''}`}
    >
      {cellDiv(cell)}
    </div>
  );
};

export default Cell;
