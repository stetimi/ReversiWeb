import type { BoardType, Piece } from './model';
import { allMoves } from './rules';

const WEIGHTS = {
  coinParity: 0.1,
  mobility: 0.4,
  cornerControl: 0.3,
  stability: 0.2,
};

export function evaluateBoard(board: BoardType, player: Piece): number {
  const opponent = player === 'b' ? 'w' : 'b';

  // Coin parity calculation
  const coinScore = calculateCoinParity(board, player, opponent);

  // Mobility calculation
  const mobilityScore = calculateMobility(board, player, opponent);

  // Corner control calculation
  const cornerScore = calculateCornerControl(board, player);

  // Stability calculation
  const stabilityScore = calculateStability(board, player);

  return (
    coinScore * WEIGHTS.coinParity +
    mobilityScore * WEIGHTS.mobility +
    cornerScore * WEIGHTS.cornerControl +
    stabilityScore * WEIGHTS.stability
  );
}

function calculateCoinParity(board: BoardType, player: Piece, opponent: Piece): number {
  let playerCount = 0;
  let opponentCount = 0;

  for (const row of board) {
    for (const cell of row) {
      if (cell === player) playerCount++;
      if (cell === opponent) opponentCount++;
    }
  }

  if (playerCount + opponentCount === 0) return 0; // Avoid division by zero
  return (playerCount - opponentCount) / (playerCount + opponentCount);
}

function calculateMobility(board: BoardType, player: Piece, opponent: Piece): number {
  const playerMoves = allMoves(board, player).size;
  const opponentMoves = allMoves(board, opponent).size;

  if (playerMoves + opponentMoves === 0) return 0;
  return (playerMoves - opponentMoves) / (playerMoves + opponentMoves);
}

function calculateCornerControl(board: BoardType, player: Piece): number {
  const corners = [
    {
      pos: [0, 0],
      adjacents: [
        [0, 1],
        [1, 0],
        [1, 1],
      ],
    },
    {
      pos: [0, 7],
      adjacents: [
        [0, 6],
        [1, 6],
        [1, 7],
      ],
    },
    {
      pos: [7, 0],
      adjacents: [
        [6, 0],
        [6, 1],
        [7, 1],
      ],
    },
    {
      pos: [7, 7],
      adjacents: [
        [6, 6],
        [6, 7],
        [7, 6],
      ],
    },
  ];

  let score = 0;

  for (const corner of corners) {
    const [x, y] = corner.pos;
    if (board[x][y] === player) {
      let cornerValue = 1.0;

      // Penalize for adjacent opponent pieces
      for (const [ax, ay] of corner.adjacents) {
        if (board[ax]?.[ay] && board[ax][ay] !== player) {
          cornerValue *= 0.7; // Reduce corner value by 30% per bad adjacent
        }
      }

      score += cornerValue;
    }
  }

  return score / 4; // Normalize to 0-1 range
}

function calculateStability(board: BoardType, player: Piece): number {
  // Simplified stability calculation - counts edge pieces
  let stablePieces = 0;
  const size = board.length;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === player && (i === 0 || i === size - 1 || j === 0 || j === size - 1)) {
        stablePieces++;
      }
    }
  }

  return stablePieces / (size * 4); // Normalize based on total edge cells
}
