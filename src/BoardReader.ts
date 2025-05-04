import { BoardType, Cell } from "./model";

const BOARD_SIZE = 8;

export function parseBoard(boardStrings: string[]): BoardType {
  if (boardStrings.length !== BOARD_SIZE) {
    throw new Error(`Board must have exactly ${BOARD_SIZE} rows`);
  }

  return boardStrings.map((rowStr, row) => {
    if (rowStr.length !== BOARD_SIZE) {
      throw new Error(`Row ${row} has invalid length ${rowStr.length}`);
    }
    
    return rowStr.split('').map((char, col): Cell => {
      const lowerChar = char.toLowerCase();
      return lowerChar === 'b' ? 'b' : lowerChar === 'w' ? 'w' : null;
    });
  });
}

export function serializeBoard(board: BoardType): string[] {
  return board.map(row => 
    row.map(cell => cell ? cell.toUpperCase() : 'X').join('')
  );
}