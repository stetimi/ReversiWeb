import React from 'react';
import { Piece, Scores } from '../model';
import { Player } from './Player';

interface ControlsProps {
  scores: Scores;
  currentPlayer: Piece;
}

export const Controls: React.FC<ControlsProps> = ({ scores, currentPlayer }) => {
  return (
    <div className="players-container">
      <Player piece="b" score={scores.black} isActive={currentPlayer === 'b'} />
      <div className="controls-container">
        <div className="controls-row">
          <button className="control-button">New Game</button>
        </div>
        <div className="controls-row">
          <button className="control-button">◀</button>
          <button className="control-button">▶</button>
        </div>
      </div>
      <Player piece="w" score={scores.white} isActive={currentPlayer === 'w'} />
    </div>
  );
};
