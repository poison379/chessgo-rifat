'use client';
import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

type Props = {
  fen: string;
  solution: string[];
};

export default function ChessPuzzleBoard({ fen, solution }: Props) {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(fen);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  useEffect(() => {
    const newGame = new Chess();
    newGame.load(fen);
    setGame(newGame);
    setPosition(fen);
    setCurrentMoveIndex(0);
  }, [fen]);

  const handleMove = (from: string, to: string) => {
    const attempted = `${from}${to}`;
    const expected = solution[currentMoveIndex];

    if (attempted === expected) {
      const move = game.move({ from, to, promotion: 'q' });
      if (move) {
        const newFen = game.fen();
        setGame(new Chess(newFen));
        setPosition(newFen);
        const next = currentMoveIndex + 1;
        setCurrentMoveIndex(next);
        if (next === solution.length) {
          setTimeout(() => alert("✅ Puzzle Solved!"), 100);
        }
      }
    } else {
      setTimeout(() => alert("❌ Incorrect Move! Try again."), 100);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Chessboard
        id="lichess-puzzle"
        position={position}
        boardWidth={400}
        animationDuration={300}
        onPieceDrop={(from, to) => {
          handleMove(from, to);
          return true;
        }}
      />

    </div>
  );
}
