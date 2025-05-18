import { BoardType, History, Piece } from './model';
import { addEntry } from './history';

export const handleEditModeClick = (
  board: BoardType,
  row: number,
  col: number,
  currentPlayer: Piece,
  history: History,
  setHistory: (h: History) => void,
) => {
  const newBoard = board.map((r) => [...r]);
  const currentPiece = newBoard[row][col];
  let newPiece: Piece | null = null;
  if (currentPiece === null) {
    newPiece = 'b';
  } else if (currentPiece === 'b') {
    newPiece = 'w';
  }
  newBoard[row][col] = newPiece;
  const updatedHistory = addEntry(history, { board: newBoard, player: currentPlayer });
  setHistory(updatedHistory);
  localStorage.setItem('editedBoard', JSON.stringify(newBoard));
};
