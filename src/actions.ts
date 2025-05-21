import { BoardType, History, Piece } from './model';
import { addEntry } from './history';

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
