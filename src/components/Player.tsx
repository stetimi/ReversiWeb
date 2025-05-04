import React from 'react';
import '../styles/Board.scss';
import { Piece } from '../model';

export interface PlayerProps {
  piece: Piece;
  score: number;
  isActive: boolean;
}

export const Player: React.FC<PlayerProps> = ({ piece, score, isActive }) => {
  const playerClass = piece === 'b' ? 'player-left' : 'player-right';
  return (
    <div className={`player-info ${playerClass} ${isActive ? 'active-player' : ''}`}>{score}</div>
  );
};
