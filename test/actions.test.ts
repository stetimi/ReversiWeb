import { cycleBoardCell } from '../src/actions';
import type { BoardType } from '../src/model';

describe('cycleBoardCell', () => {
  it('updates cell at (0,1) on 2x2 board', () => {
    const initialBoard: BoardType = [
      [null, null],
      [null, null],
    ];

    const updatedBoard = cycleBoardCell(initialBoard, 0, 1);

    expect(updatedBoard).toEqual([
      [null, 'b'],
      [null, null],
    ]);
    expect(updatedBoard).not.toBe(initialBoard); // Ensure immutability
  });
});
