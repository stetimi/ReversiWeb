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
