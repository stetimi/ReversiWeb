import React, { useState } from 'react';
import Board from './Board';
import { Controls } from './Controls';
import { newBoard, position } from '../board';
import { Piece } from '../model';
import { applyMove, checkMove, scores } from '../rules';
import { back, canGoBack, newHistory, current, addEntry, canGoForward, forward } from '../history';

const SKINS = ['waxy', 'stripy', 'scribble'];

const App: React.FC = () => {
  const initialBoard = newBoard();
  const [skin, setSkin] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<Piece>('b');
  const [history, setHistory] = useState(newHistory(initialBoard));
  const board = current(history).board;
  const playerScores = scores(board);

  const handleCellClick = (row: number, col: number) => {
    const moveResult = checkMove(board, currentPlayer, position(row, col));
    if (moveResult) {
      const newBoard = applyMove(board, moveResult);
      const nextPlayer = currentPlayer === 'b' ? 'w' : 'b';
      setCurrentPlayer(nextPlayer);
      const updatedHistory = addEntry(history, { board: newBoard, player: nextPlayer });
      setHistory(updatedHistory);
    }
  };

  const onClickPlayer = () => {
    setSkin((skin + 1) % SKINS.length);
  };

  const newGame = () => {
    setCurrentPlayer('b');
    setHistory(newHistory(initialBoard));
  };

  const highlightOnHover = (row: number, col: number) =>
    checkMove(current(history).board, currentPlayer, position(row, col)) !== null;

  const onClickBack = () => {
    if (canGoBack(history)) {
      const updatedHistory = back(history);
      const currentEntry = current(updatedHistory);
      setCurrentPlayer(currentEntry.player);
      setHistory(updatedHistory);
    }
  };

  const onClickForward = () => {
    if (canGoForward(history)) {
      const updatedHistory = forward(history);
      const currentEntry = current(updatedHistory);
      setCurrentPlayer(currentEntry.player);
      setHistory(updatedHistory);
    }
  };

  return (
    <div className="main-container">
      <Board
        board={current(history).board}
        onCellClick={handleCellClick}
        highlightOnHover={highlightOnHover}
        skin={SKINS[skin]}
      />
      <Controls
        scores={playerScores}
        currentPlayer={currentPlayer}
        onNewGame={newGame}
        onClickPlayer={onClickPlayer}
        onClickBack={onClickBack}
        onClickForward={onClickForward}
        canClickBack={canGoBack(history)}
        canClickForward={canGoForward(history)}
      />
    </div>
  );
};

export default App;
