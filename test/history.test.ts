import {
  newHistory,
  back,
  forward,
  current,
  canGoBack,
  canGoForward,
  addEntry,
} from '../src/history';
import { BoardType, History, HistoryEntry } from '../src/model';

// Mock board states
const initialBoard: HistoryEntry = {
  board: [
    [null, null],
    [null, null],
  ],
  player: 'b',
};
const secondBoard: HistoryEntry = {
  board: [
    ['b', null],
    [null, null],
  ],
  player: 'w',
};
const thirdBoard: HistoryEntry = {
  board: [
    ['b', 'w'],
    [null, null],
  ],
  player: 'b',
};

describe('History Management', () => {
  describe('newHistory', () => {
    it('should create new history with initial board state', () => {
      const history = newHistory(initialBoard.board);
      expect(history.entries[0]).toEqual(initialBoard);
      expect(history.entries[1]).toBeNull();
      expect(history.current).toBe(0);
    });
  });

  describe('back()', () => {
    it('should return previous board state and update index', () => {
      const history: History = {
        entries: [initialBoard, secondBoard, thirdBoard],
        current: 2,
      };

      const result = back(history);
      expect(result).toStrictEqual({
        entries: history.entries,
        current: 1,
      });
    });

    it('should throw error when no previous states', () => {
      const history: History = {
        entries: [initialBoard],
        current: 0,
      };

      expect(() => back(history)).toThrow('No previous board state');
    });
  });

  describe('forward()', () => {
    it('should return next board state and update index', () => {
      const history: History = {
        entries: [initialBoard, secondBoard, thirdBoard],
        current: 0,
      };

      const result = forward(history);
      expect(result).toStrictEqual({
        entries: history.entries,
        current: 1,
      });
    });

    it('should throw error when no next states', () => {
      const history: History = {
        entries: [initialBoard, secondBoard, thirdBoard],
        current: 2,
      };

      expect(() => forward(history)).toThrow('No next history entry');
    });
  });

  describe('current()', () => {
    it('should return current board state', () => {
      const history: History = {
        entries: [initialBoard, secondBoard, thirdBoard],
        current: 1,
      };
      expect(current(history)).toBe(secondBoard);
    });
  });

  describe('canGoBack()', () => {
    it('should return false when at beginning of history', () => {
      const history: History = {
        entries: [initialBoard],
        current: 0,
      };
      expect(canGoBack(history)).toBe(false);
    });

    it('should return true when previous states exist', () => {
      const history: History = {
        entries: [initialBoard, secondBoard],
        current: 1,
      };
      expect(canGoBack(history)).toBe(true);
    });
  });

  describe('canGoForward()', () => {
    it('should return false when no next states', () => {
      const history: History = {
        entries: [initialBoard, null],
        current: 0,
      };
      expect(canGoForward(history)).toBe(false);
    });

    it('should return true when next state exists', () => {
      const history: History = {
        entries: [initialBoard, secondBoard, null],
        current: 0,
      };
      expect(canGoForward(history)).toBe(true);
    });
  });

  describe('addEntry()', () => {
    it('should add new board and update current index', () => {
      const history: History = {
        entries: [initialBoard, secondBoard, null, null],
        current: 1,
      };
      const newBoard = thirdBoard;
      const updatedHistory = addEntry(history, newBoard);
      expect(updatedHistory.current).toBe(2);
      expect(updatedHistory.entries[2]).toEqual(newBoard);
    });

    it('should overwrite existing next states', () => {
      const history: History = {
        entries: [initialBoard, secondBoard, thirdBoard, null],
        current: 1,
      };
      const newBoard: BoardType = [
        ['w', null],
        [null, null],
      ];
      const updatedHistory = addEntry(history, { board: newBoard, player: 'b' });
      expect(updatedHistory.current).toBe(2);
      expect(updatedHistory.entries[2]).toEqual({ board: newBoard, player: 'b' });
      expect(updatedHistory.entries[3]).toBeNull();
    });
  });
});
