import React from 'react';
import '../styles/Board.scss';
import { BoardType } from '../model';
import Cell from './Cell';
import { position } from '../board';

interface BoardProps {
  board: BoardType;
  onCellClick: (row: number, col: number) => void;
  highlightOnHover: (row: number, col: number) => boolean;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, highlightOnHover }) => {
  return (
    <div className="board-container">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={position(rowIndex, colIndex)}
            cell={cell}
            skin="waxy"
            onCellClick={() => onCellClick(rowIndex, colIndex)}
            highlightOnHover={highlightOnHover(rowIndex, colIndex)}
          />
        )),
      )}
    </div>
  );
};

export default Board;
