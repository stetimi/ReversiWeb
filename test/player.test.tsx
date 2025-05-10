import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Player } from '../src/components/Player';
import type { PlayerProps } from '../src/components/Player';

describe('Player Component', () => {
  const mockProps: PlayerProps = {
    piece: 'b',
    score: 5,
    isActive: false,
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders player score correctly', () => {
    render(<Player {...mockProps} score={8} />);
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('applies active-player class when isActive is true', () => {
    render(<Player {...mockProps} isActive={true} />);
    const playerDiv = screen.getByText(mockProps.score.toString());
    expect(playerDiv).toHaveClass('active-player');
  });

  it('calls onClick handler when clicked', () => {
    render(<Player {...mockProps} />);
    fireEvent.click(screen.getByText(mockProps.score.toString()));
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('renders correct positioning class based on piece', () => {
    const { rerender } = render(<Player {...mockProps} piece="b" />);
    expect(screen.getByText(mockProps.score.toString())).toHaveClass('player-left');

    rerender(<Player {...mockProps} piece="w" />);
    expect(screen.getByText(mockProps.score.toString())).toHaveClass('player-right');
  });
});
