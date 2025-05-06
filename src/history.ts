import { BoardType, History, HistoryEntry, Piece } from './model';

export function newHistory(board: BoardType): History {
  const entries = Array(65).fill(null);
  entries[0] = { board: board, player: 'b' }; // Assuming 'b' is the starting player
  return {
    entries: entries,
    current: 0,
  };
}

export function back(history: History): History {
  if (history.current === 0) {
    throw new Error('No previous board state');
  }
  return {
    entries: history.entries,
    current: history.current - 1,
  };
}

export function forward(history: History): History {
  if (history.current === history.entries.length - 1) {
    throw new Error('No next history entry');
  }
  return {
    entries: history.entries,
    current: history.current + 1,
  };
}

export function current(history: History): HistoryEntry {
  return history.entries[history.current]!; // Non-null assertion - current is always valid
}

export function canGoBack(history: History): boolean {
  return history.current > 0;
}

export function canGoForward(history: History): boolean {
  return history.entries[history.current + 1] !== null;
}

export function addEntry(history: History, historyEntry: HistoryEntry): History {
  const updated = [...history.entries];
  const current = history.current + 1;
  updated[current] = historyEntry;
  return {
    entries: updated,
    current: current,
  };
}
