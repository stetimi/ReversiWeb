import { checkMove } from '../src/rules';
import { BoardType } from '../src/model';
import { newBoard, position } from '../src/board';
import { parseBoard } from '../src/BoardReader';

const numberSort = (xs: number[]): number[] => xs.slice().sort((a, b) => a - b);

describe('checkMove', () => {
  let board: BoardType;
  
  beforeEach(() => {
    board = newBoard();
  });

  test('should reject occupied cell', () => {
    const result = checkMove(board, 'b', 3*8+3);
    expect(result).toBeNull();
  });

  test('should validate simple horizontal flip', () => {
    board = parseBoard([
      '........',
      '........',
      '........',
      '..BWBBB.',
      '........',
      '........',
      '........',
      '........'
    ]);
    
    const result = checkMove(board, 'w', position(3, 7));
    expect(numberSort(result!.flipped)).toEqual([position(3, 4), position(3, 5), position(3, 6)]);
  });

  test('should validate multi-direction flips', () => {
    board = parseBoard([
      '........',
      '.B...B..',
      '..W.W...',
      '........',
      '..W.W...',
      '.B...B..',
      '........',
      '........'
    ]);
    
    const result = checkMove(board, 'b', position(3, 3));
    expect(numberSort(result!.flipped)).toEqual([
      position(2, 2), position(2, 4), position(4, 2), position(4, 4)
    ]);
  });

  test('should handle edge wrap protection', () => {
    board = parseBoard([
      'B.......',
      'W.......',
      'W.......',
      '........',
      '........',
      '........',
      '........',
      '........'
    ]);
    
    const result = checkMove(board, 'b', position(3, 0));
    expect(numberSort(result!.flipped)).toEqual([position(1, 0), position(2, 0)]);
  });
});