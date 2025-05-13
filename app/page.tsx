'use client';
import { useState, useEffect } from 'react';
import ChessPuzzleBoard from "@/components/chessboard";

export default function PuzzleModal() {
  const [puzzleData, setPuzzleData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchNewPuzzle = async () => {
    setLoading(true);
    const res = await fetch("https://lichess.org/api/puzzle/next");
    const data = await res.json();
    setPuzzleData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewPuzzle();
  }, []);

  if (loading || !puzzleData) return <p className="text-center mt-10">Loading puzzle...</p>;

  const { fen, solution, rating, themes, id } = puzzleData.puzzle;

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-lg font-semibold">Puzzle ID: {id}</h2>
      <p className="text-sm">Rating: {rating} | Themes: {themes.join(", ")}</p>

      <ChessPuzzleBoard fen={fen} solution={solution} />

      <button
        onClick={fetchNewPuzzle}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700 transition"
      >
        Next Puzzle
      </button>
    </div>
  );
}
