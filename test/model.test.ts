import { newBoard } from '../src/model';

describe('newBoard', () => {
  it('creates 8x8 board', () => {
    const board = newBoard();
    expect(board.length).toBe(8);
    board.forEach(row => expect(row.length).toBe(8));
  });

  it('places initial pieces correctly', () => {
    const board = newBoard();
    expect(board[3][3]).toBe('w');
    expect(board[3][4]).toBe('b');
    expect(board[4][3]).toBe('b');
    expect(board[4][4]).toBe('w');
  });

  it('has null for all other cells', () => {
    const board = newBoard();
    const nullCount = board.flat().filter(cell => cell === null).length;
    expect(nullCount).toBe(60); // 8x8 = 64 cells - 4 initial pieces
  });
});