import React, { useState, useEffect } from 'react';
import Board from './Board';
import { Controls } from './Controls';
import { newBoard, position } from '../board';
import { Piece } from '../model';
import { checkMove, scores, calculateMoveState } from '../rules';
import { back, canGoBack, newHistory, current, addEntry, canGoForward, forward } from '../history';
import { cycleBoardCell, storeEditedBoard, handlePlayClick } from '../actions';

const SKINS = ['waxy', 'stripy', 'scribble', 'crown', 'realistic'];

const App: React.FC = () => {
  const [initialBoard] = useState(() => {
    const savedBoard = localStorage.getItem('editedBoard');
    return savedBoard ? JSON.parse(savedBoard) : newBoard();
  });
  const [skin, setSkin] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<Piece | null>('b');
  const [history, setHistory] = useState(newHistory(initialBoard));
  const [isEditMode, setIsEditMode] = useState(false);
  const board = current(history).board;
  const playerScores = scores(board);
  const moveState = currentPlayer === null ? null : calculateMoveState(board, currentPlayer);

  React.useEffect(() => {
    if (moveState === null) {
      setCurrentPlayer(null);
    } else if (moveState.player !== currentPlayer) {
      setCurrentPlayer(moveState.player);
    }
  }, [moveState, currentPlayer]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const editModeActive = params.get('editMode') === 'true';
    setIsEditMode(editModeActive);
    if (editModeActive) {
      console.log('Edit mode activated');
    }
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (isEditMode) {
      const board = cycleBoardCell(current(history).board, row, col);
      storeEditedBoard(board, currentPlayer || 'b', history, setHistory);
    } else {
      const result = handlePlayClick(
        current(history).board,
        currentPlayer || 'b',
        row,
        col,
        history,
      );
      setCurrentPlayer(result.nextPlayer);
      setHistory(result.newHistory);
    }
  };

  const onClickPlayer = () => {
    setSkin((skin + 1) % SKINS.length);
  };

  const newGame = () => {
    localStorage.removeItem('editedBoard');
    setCurrentPlayer('b');
    setHistory(newHistory(newBoard()));
  };

  const highlightOnHover = (row: number, col: number) =>
    currentPlayer !== null &&
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
      {currentPlayer === null && (
        <div className="winner-emblem">
          <img
            src={`/assets/winners/${playerScores.black > playerScores.white ? 'black' : 'white'}.png`}
            alt="Winner emblem"
          />
        </div>
      )}
    </div>
  );
};

export default App;
