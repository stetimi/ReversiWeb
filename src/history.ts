import { BoardType, History } from './model';

export function newHistory(board: BoardType): History {
  return {
    boards: [board],
    current: 0,
  };
}

export function back(history: History): BoardType {
  if (history.current === 0) {
    throw new Error('No previous board state');
  }
  history.current--;
  return history.boards[history.current];
}

export function forward(history: History): BoardType {
  if (history.current === history.boards.length - 1) {
    throw new Error('No next board state');
  }
  history.current++;
  return history.boards[history.current];
}
