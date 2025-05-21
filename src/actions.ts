import { BoardType, History, Piece } from './model';
import { addEntry } from './history';
import { checkMove, applyMove } from './rules';
import { position } from './board';

export const storeEditedBoard = (
  board: BoardType,
  currentPlayer: Piece,
  history: History,
  setHistory: (h: History) => void,
) => {
  const updatedHistory = addEntry(history, { board: board, player: currentPlayer });
  setHistory(updatedHistory);
  localStorage.setItem('editedBoard', JSON.stringify(board));
};

import { evaluateBoard } from './heuristic';

const computerMove = (
  board: BoardType,
  history: History,
): { newHistory: History; nextPlayer: Piece | null } => {
  let bestScore = -Infinity;
  let bestMove = null;

  // Evaluate all possible moves
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const move = checkMove(board, 'w', position(row, col));
      if (move) {
        const newBoard = applyMove(board, move);
        const score = evaluateBoard(newBoard, 'w');
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }
    }
  }

  if (bestMove) {
    const newBoard = applyMove(board, bestMove);
    const updatedHistory = addEntry(history, { board: newBoard, player: 'b' });
    return { newHistory: updatedHistory, nextPlayer: 'b' };
  }
  return { newHistory: history, nextPlayer: null };
};

export const handlePlayClick = (
  board: BoardType,
  currentPlayer: Piece,
  row: number,
  col: number,
  history: History,
): { newHistory: History; nextPlayer: Piece | null } => {
  const moveResult = checkMove(board, currentPlayer, position(row, col));
  if (moveResult) {
    const newBoard = applyMove(board, moveResult);
    const nextPlayer = currentPlayer === 'b' ? 'w' : 'b';
    const updatedHistory = addEntry(history, { board: newBoard, player: nextPlayer });

    // If next player is computer (white), make automatic move
    if (nextPlayer === 'w') {
      return computerMove(newBoard, updatedHistory);
    }
    return { newHistory: updatedHistory, nextPlayer };
  }
  return { newHistory: history, nextPlayer: currentPlayer };
};

export const cycleBoardCell = (board: Readonly<BoardType>, row: number, col: number): BoardType => {
  const newBoard = board.map((r) => [...r]);
  const currentPiece = newBoard[row][col];
  let newPiece: Piece | null = null;
  if (currentPiece === null) {
    newPiece = 'b';
  } else if (currentPiece === 'b') {
    newPiece = 'w';
  }
  newBoard[row][col] = newPiece;
  return newBoard;
};
