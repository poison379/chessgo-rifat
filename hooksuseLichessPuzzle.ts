'use client';
import { useEffect, useState } from 'react';

export function useLichessPuzzle() {
  const [loading, setLoading] = useState(true);
  const [puzzleData, setPuzzleData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://lichess.org/api/puzzle/next');
        const data = await res.json();
        setPuzzleData(data);
      } catch (err: any) {
        setError("Failed to fetch puzzle");
      } finally {
        setLoading(false);
      }
    };

    fetchPuzzle();
  }, []);

  return { loading, puzzleData, error };
}
