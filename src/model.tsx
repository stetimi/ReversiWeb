export type Piece = 'b' | 'w';
export type Cell = Piece | null;
export type BoardType = Cell[][];

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