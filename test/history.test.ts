import { newHistory, back, forward } from '../src/history';
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
});
