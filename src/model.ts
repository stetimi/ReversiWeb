export type Piece = 'b' | 'w';
export type CellType = Piece | null;
export type BoardType = CellType[][];
export type Position = number;

export type MoveResult = {
  readonly position: Position;
  readonly piece: Piece;
  readonly flipped: ReadonlyArray<Position>;
};

export type Scores = {
  readonly black: number;
  readonly white: number;
};

export interface HistoryEntry {
  readonly board: BoardType;
  readonly player: Piece;
}

export interface History {
  readonly entries: ReadonlyArray<HistoryEntry | null>;
  readonly current: number;
}

export interface MoveState {
  readonly player: Piece;
  readonly moves: ReadonlyMap<number, MoveResult>;
}
