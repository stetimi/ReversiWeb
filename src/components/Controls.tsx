import React from 'react';
import { Piece, Scores } from '../model';
import { Player } from './Player';

interface ControlsProps {
  scores: Scores;
  currentPlayer: Piece | null;
  onNewGame: () => void;
  onClickPlayer: () => void;
  onClickBack: () => void;
  onClickForward: () => void;
  canClickBack: boolean;
  canClickForward: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  scores,
  currentPlayer,
  onNewGame,
  onClickPlayer,
  onClickBack,
  onClickForward,
  canClickBack,
  canClickForward,
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
          <button className="control-button" onClick={onClickBack} disabled={!canClickBack}>
            ◀
          </button>
          <button className="control-button" onClick={onClickForward} disabled={!canClickForward}>
            ▶
          </button>
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
