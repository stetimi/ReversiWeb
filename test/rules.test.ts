import { checkMove } from '../src/rules';
import { BoardType } from '../src/model';
import { newBoard, position } from '../src/board';
import { parseBoard } from '../src/BoardReader';

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
      'XXXXXXXX',
      'XXXXXXXX',
      'XXXXXXXX',
      'XXBWBBBX',
      'XXXXXXXX',
      'XXXXXXXX',
      'XXXXXXXX',
      'XXXXXXXX'
    ]);
    
    const result = checkMove(board, 'w', position(3, 7));
    expect(result?.flipped.sort()).toEqual([position(3, 4), position(3, 5), position(3, 6)]);
  });

  test('should validate multi-direction flips', () => {
    board = parseBoard([
      'XXXXXXXX',
      'XXXXXXXX',
      'XXWXWXXX',
      'XXXBXXXX',
      'XXWXWXXX',
      'XXXXXXXX',
      'XXXXXXXX',
      'XXXXXXXX'
    ]);
    
    const result = checkMove(board, 'b', 3*8+3);
    expect(result?.flipped).toEqual(expect.arrayContaining([
      2*8+2, 2*8+4, 4*8+2, 4*8+4
    ]));
  });

  // test('should reject move with no flips', () => {
  //   const result = checkMove(board, 'b', 0*8+0);
  //   expect(result).toBeNull();
  // });

  test('should handle edge wrap protection', () => {
    board = parseBoard([
      'BXXXXXXX',
      'WXXXXXXX',
      'WXXXXXXX',
      'XXXXXXXX',
      'XXXXXXXX',
      'XXXXXXXX',
      'XXXXXXXX',
      'XXXXXXXX'
    ]);
    
    const result = checkMove(board, 'b', 4*8+0);
    expect(result?.flipped).toEqual([2*8+0, 3*8+0]);
  });
});