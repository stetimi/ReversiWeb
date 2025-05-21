import { evaluateBoard } from '../src/heuristic';
import { BoardType } from '../src/model';

describe('evaluateBoard', () => {
  const emptyBoard: BoardType = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  test('should prioritize corners in early game', () => {
    const board: BoardType = emptyBoard.map((row) => [...row]);
    // Set all four corners to player
    board[0][0] = 'b';
    board[0][7] = 'b';
    board[7][0] = 'b';
    board[7][7] = 'b';

    const score = evaluateBoard(board, 'b');
    expect(score).toBeGreaterThan(0.4 * 0.9); // At least 90% of corner weight
  });

  test('should value mobility when few pieces placed', () => {
    const board: BoardType = emptyBoard.map((row) => [...row]);
    // Valid moves setup for black
    board[3][3] = 'w';
    board[3][4] = 'b';
    board[4][3] = 'b';
    board[4][4] = 'w';
    board[2][4] = 'w';
    board[4][2] = 'w';

    const playerScore = evaluateBoard(board, 'b');
    const opponentScore = evaluateBoard(board, 'w');
    expect(playerScore).toBeGreaterThan(opponentScore);
  });

  test('should prioritize coin parity in endgame', () => {
    const board: BoardType = emptyBoard.map((row) => [...row]);
    // Fill 60% of board with player pieces
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (i * 8 + j < 38) board[i][j] = 'b';
      }
    }

    const score = evaluateBoard(board, 'b');
    expect(score).toBeGreaterThan(0.15); // Coin parity should dominate
  });

  test('should penalize bad corner adjacency', () => {
    const board: BoardType = emptyBoard.map((row) => [...row]);
    // Set corner with adjacent opponent pieces and block mobility
    board[0][0] = 'b';
    board[0][1] = 'w';
    board[1][0] = 'w';
    board[1][1] = 'w';
    board[0][2] = 'b';
    board[2][0] = 'b';

    const score = evaluateBoard(board, 'b');
    expect(score).toBeLessThan(0.15); // Adjusted for new corner penalty calculation
  });

  test('should value edge stability', () => {
    const board: BoardType = emptyBoard.map((row) => [...row]);
    // Fill all edge cells except corners
    for (let i = 0; i < 8; i++) {
      board[0][i] = 'b';
      board[7][i] = 'b';
      board[i][0] = 'b';
      board[i][7] = 'b';
    }

    const score = evaluateBoard(board, 'b');
    expect(score).toBeGreaterThan(0.15); // Increased expectation with stability weight change
  });
});
