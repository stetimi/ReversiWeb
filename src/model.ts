export type Piece = 'b' | 'w';
export type Cell = Piece | null;
export type BoardType = Cell[][];
export type Position = number;

export type MoveResult = {
  position: Position;
  piece: Piece;
  flipped: Position[];
};

export type Scores = {
  black: number;
  white: number;
};
