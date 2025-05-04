import React from 'react';
import '../styles/Board.scss';
import { Piece } from '../model';

export interface PlayerProps {
  piece: Piece;
  score: number;
  isActive: boolean;
}

function playerName(piece: Piece): string {
  switch (piece) {
    case 'b':
      return 'Player 1';
    case 'w':
      return 'Player 2';
  }
}

export const Player: React.FC<PlayerProps> = ({ piece, score, isActive }) => {
  const playerClass = piece === 'b' ? 'player-left' : 'player-right';
  const playerName = `Player ${piece === 'b' ? '1' : '2'}`;
  return (
    <div className={`player-info ${playerClass}`}>{playerName}</div>
  );
}