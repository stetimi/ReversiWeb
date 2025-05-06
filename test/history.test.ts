import {
  newHistory,
  back,
  forward,
  current,
  canGoBack,
  canGoForward,
  addBoard,
} from '../src/history';
import { BoardType, History, CellType } from '../src/model';

// Mock board states
const initialBoard: BoardType = [
  [null, null],
  [null, null],
];
const secondBoard: BoardType = [
  ['b', null],
  [null, null],
];
const thirdBoard: BoardType = [
  ['b', 'w'],
  [null, null],
];

describe('History Management', () => {
  describe('newHistory', () => {
    it('should create new history with initial board state', () => {
      const history = newHistory(initialBoard);
      expect(history.boards[0]).toEqual(initialBoard);
      expect(history.boards[1]).toBeNull();
      expect(history.current).toBe(0);
    });
  });

  describe('back()', () => {
    it('should return previous board state and update index', () => {
      const history: History = {
        boards: [initialBoard, secondBoard, thirdBoard],
        current: 2,
      };

      const result = back(history);
      expect(result).toBe(secondBoard);
      expect(history.current).toBe(1);
    });

    it('should throw error when no previous states', () => {
      const history: History = {
        boards: [initialBoard],
        current: 0,
      };

      expect(() => back(history)).toThrow('No previous board state');
    });
  });

  describe('forward()', () => {
    it('should return next board state and update index', () => {
      const history: History = {
        boards: [initialBoard, secondBoard, thirdBoard],
        current: 0,
      };

      const result = forward(history);
      expect(result).toBe(secondBoard);
      expect(history.current).toBe(1);
    });

    it('should throw error when no next states', () => {
      const history: History = {
        boards: [initialBoard, secondBoard, thirdBoard],
        current: 2,
      };

      expect(() => forward(history)).toThrow('No next board state');
    });
  });

  describe('current()', () => {
    it('should return current board state', () => {
      const history: History = {
        boards: [initialBoard, secondBoard, thirdBoard],
        current: 1,
      };
      expect(current(history)).toBe(secondBoard);
    });
  });

  describe('canGoBack()', () => {
    it('should return false when at beginning of history', () => {
      const history: History = {
        boards: [initialBoard],
        current: 0,
      };
      expect(canGoBack(history)).toBe(false);
    });

    it('should return true when previous states exist', () => {
      const history: History = {
        boards: [initialBoard, secondBoard],
        current: 1,
      };
      expect(canGoBack(history)).toBe(true);
    });
  });

  describe('canGoForward()', () => {
    it('should return false when no next states', () => {
      const history: History = {
        boards: [initialBoard, null] as (BoardType | null)[],
        current: 0,
      };
      expect(canGoForward(history)).toBe(false);
    });

    it('should return true when next state exists', () => {
      const history: History = {
        boards: [initialBoard, secondBoard, null] as (BoardType | null)[],
        current: 0,
      };
      expect(canGoForward(history)).toBe(true);
    });
  });

  describe('addBoard()', () => {
    it('should add new board and update current index', () => {
      const history: History = {
        boards: [initialBoard, secondBoard, null, null] as (BoardType | null)[],
        current: 1,
      };
      const newBoard = thirdBoard;
      addBoard(history, newBoard);
      expect(history.current).toBe(2);
      expect(history.boards[2]).toEqual(newBoard);
    });

    it('should overwrite existing next states', () => {
      const history: History = {
        boards: [initialBoard, secondBoard, thirdBoard, null] as (BoardType | null)[],
        current: 1,
      };
      const newBoard: BoardType = [
        ['w', null],
        [null, null],
      ];
      addBoard(history, newBoard);
      expect(history.current).toBe(2);
      expect(history.boards[2]).toEqual(newBoard);
      expect(history.boards[3]).toBeNull();
    });
  });
});
