import { BoardType, Cell, Position } from "./model";

export function newBoard(): BoardType {
  const board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));
  board[3][3] = 'w';
  board[3][4] = 'b';
  board[4][3] = 'b';
  board[4][4] = 'w';
  return board;
}

export function cellAt(b: BoardType, position: Position): Cell {
  const row = Math.floor(position / 8);
  const col = position % 8;
  return b[row][col];
}

export function position(row: number, col: number): Position {
  return row * 8 + col;
}