import { BoardType, History } from './model';

export function newHistory(board: BoardType): History {
  const boards = Array(65).fill(null);
  boards[0] = board;
  return {
    boards: boards,
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

export function current(history: History): BoardType {
  return history.boards[history.current];
}

export function canGoBack(history: History): boolean {
  return history.current > 0;
}

export function canGoForward(history: History): boolean {
  return history.boards[history.current + 1] !== null;
}

export function addBoard(history: History, board: BoardType): void {
  history.current++;
  history.boards[history.current] = board;
}
