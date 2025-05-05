import React from 'react';
import '../styles/Board.scss';
import { Piece } from '../model';

export interface PlayerProps {
  piece: Piece;
  score: number;
  isActive: boolean;
  onClick: () => void;
}

export const Player: React.FC<PlayerProps> = ({ piece, score, isActive, onClick }) => {
  const playerClass = piece === 'b' ? 'player-left' : 'player-right';
  return (
    <div
      className={`player-info ${playerClass} ${isActive ? 'active-player' : ''}`}
      style={{
        fontSize: '2em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClick}
    >
      {score}
    </div>
  );
};
