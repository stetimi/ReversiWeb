import React from 'react';
import { Piece, Scores } from '../model';
import { Player } from './Player';

interface ControlsProps {
  scores: Scores;
  currentPlayer: Piece;
  onNewGame: () => void;
  onClickPlayer: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  scores,
  currentPlayer,
  onNewGame,
  onClickPlayer,
}) => {
  return (
    <div className="players-container">
      <Player
        piece="b"
        score={scores.black}
        isActive={currentPlayer === 'b'}
        onClick={onClickPlayer}
      />
      <div className="controls-container">
        <div className="controls-row">
          <button className="control-button" onClick={onNewGame}>
            New Game
          </button>
        </div>
        <div className="controls-row">
          <button className="control-button">◀</button>
          <button className="control-button">▶</button>
        </div>
      </div>
      <Player
        piece="w"
        score={scores.white}
        isActive={currentPlayer === 'w'}
        onClick={onClickPlayer}
      />
    </div>
  );
};
