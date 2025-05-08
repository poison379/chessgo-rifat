import PuzzleGrid from "@/components/puzzle-grid"
import type { Puzzle } from "@/types/puzzle"

export default function Home() {
  // Sample puzzle data
  const puzzles: Puzzle[] = [
    {
      id: "1",
      difficulty: "Easy",
      plays: 1245,
      position: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR",
      moves: ["e4", "e5", "Nf3"],
    },
    {
      id: "2",
      difficulty: "Medium",
      plays: 876,
      position: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R",
      moves: ["e4", "e5", "Nf3", "Nc6", "Bc4"],
    },
    {
      id: "3",
      difficulty: "Hard",
      plays: 532,
      position: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R",
      moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6"],
    },
    {
      id: "4",
      difficulty: "Easy",
      plays: 1089,
      position: "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR",
      moves: ["e4", "d5", "exd5"],
    },
    {
      id: "5",
      difficulty: "Medium",
      plays: 743,
      position: "rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR",
      moves: ["e4", "d5", "exd5", "Qxd5"],
    },
    {
      id: "6",
      difficulty: "Hard",
      plays: 421,
      position: "rnb1kbnr/ppp1pppp/8/3q4/8/8/PPPP1PPP/RNBQKBNR",
      moves: ["e4", "d5", "exd5", "Qxd5", "Nc3"],
    },
    {
      id: "7",
      difficulty: "Easy",
      plays: 987,
      position: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR",
      moves: ["e4", "e5"],
    },
    {
      id: "8",
      difficulty: "Medium",
      plays: 654,
      position: "rnbqkbnr/pppp1ppp/8/4p3/2B1P3/8/PPPP1PPP/RNBQKBNR",
      moves: ["e4", "e5", "Bc4"],
    },
    {
      id: "9",
      difficulty: "Hard",
      plays: 321,
      position: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R",
      moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5"],
    },
    // Featured puzzle similar to the image provided
    {
      id: "10",
      difficulty: "Medium",
      plays: 567,
      position: "8/p1p3k1/3p4/1p1p1r2/3P1Q2/8/PP3K1P/8",
      moves: ["Qf4", "Rf5", "Qxf5"],
      featured: true,
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Chess Puzzles</h1>
          <p className="text-gray-600 mt-2">Improve your chess skills with these tactical puzzles</p>
        </header>

        <PuzzleGrid puzzles={puzzles} />
      </div>
    </main>
  )
}
