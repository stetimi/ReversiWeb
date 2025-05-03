import { checkMove } from '../src/rules';
import { BoardType } from '../src/model';
import { newBoard, position } from '../src/board';

describe('checkMove', () => {
  let board: BoardType;
  
  beforeEach(() => {
    board = newBoard();
  });

  test('should reject occupied cell', () => {
    const result = checkMove(board, 'b', 3*8+3);
    expect(result).toBeNull();
  });

  // test('should validate simple horizontal flip', () => {
  //   // Setup: B W _ B
  //   board[3][2] = 'b';
  //   board[3][3] = 'w';
  //   board[3][4] = null;
  //   board[3][5] = 'b';
    
  //   const result = checkMove(board, 'w', 3*8+4);
  //   expect(result?.flipped).toEqual(expect.arrayContaining([position(3, 5)]));
  // });

  // test('should validate multi-direction flips', () => {
  //   // Create a star pattern
  //   board[3][3] = 'b';
  //   board[2][2] = 'w';
  //   board[2][4] = 'w';
  //   board[4][2] = 'w';
  //   board[4][4] = 'w';
    
  //   const result = checkMove(board, 'b', 3*8+3);
  //   expect(result?.flipped).toEqual(expect.arrayContaining([
  //     2*8+2, 2*8+4, 4*8+2, 4*8+4
  //   ]));
  // });

  // test('should reject move with no flips', () => {
  //   const result = checkMove(board, 'b', 0*8+0);
  //   expect(result).toBeNull();
  // });

  // test('should handle edge wrap protection', () => {
  //   // Setup vertical line at left edge
  //   board[1][0] = 'b';
  //   board[2][0] = 'w';
  //   board[3][0] = 'w';
    
  //   const result = checkMove(board, 'b', 4*8+0);
  //   expect(result?.flipped).toEqual([2*8+0, 3*8+0]);
  // });
});