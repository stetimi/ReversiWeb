import { BoardType, Piece, Position, MoveResult } from './model';
import { cellAt } from './board';

const DIRECTIONS = [
  [-1, 0], // up
  [1, 0], // down
  [0, -1], // left
  [0, 1], // right
  [-1, -1], // up-left
  [-1, 1], // up-right
  [1, -1], // down-left
  [1, 1], // down-right
];

export function checkMove(board: BoardType, piece: Piece, position: Position): MoveResult | null {
  const currentCell = cellAt(board, position);
  if (currentCell !== null) {
    return null;
  }

  const opponent = piece === 'b' ? 'w' : 'b';
  const flipped: Position[] = [];

  for (const [dRow, dCol] of DIRECTIONS) {
    let row = Math.floor(position / 8) + dRow;
    let col = (position % 8) + dCol;
    const directionFlipped: Position[] = [];

    while (row >= 0 && row < 8 && col >= 0 && col < 8) {
      const pos = row * 8 + col;
      const cell = cellAt(board, pos);

      if (cell === opponent) {
        directionFlipped.push(pos);
      } else if (cell === piece) {
        if (directionFlipped.length > 0) {
          flipped.push(...directionFlipped);
        }
        break;
      } else {
        // Empty cell
        directionFlipped.length = 0;
        break;
      }

      row += dRow;
      col += dCol;
    }
  }
  return flipped.length > 0 ? { position, piece, flipped } : null;
}

export function applyMove(board: BoardType, move: MoveResult): BoardType {
  // Create deep copy of board
  const newBoard = board.map((row) => [...row]);

  // Place new piece
  const row = Math.floor(move.position / 8);
  const col = move.position % 8;
  newBoard[row][col] = move.piece;

  // Flip captured pieces
  move.flipped.forEach((pos) => {
    const flipRow = Math.floor(pos / 8);
    const flipCol = pos % 8;
    newBoard[flipRow][flipCol] = move.piece;
  });

  return newBoard;
}

export function scores(board: BoardType): { black: number; white: number } {
  let black = 0;
  let white = 0;

  for (const row of board) {
    for (const cell of row) {
      if (cell === 'b') black++;
      if (cell === 'w') white++;
    }
  }

  return { black, white };
}
