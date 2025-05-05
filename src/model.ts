export type Piece = 'b' | 'w';
export type CellType = Piece | null;
export type BoardType = CellType[][];
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
