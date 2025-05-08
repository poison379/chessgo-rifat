"use client"

import { useState, useEffect } from "react"
import { ChessPieces } from "./chess-pieces"

interface ChessboardProps {
  position: string // FEN notation
  highlightedSquare?: string // e.g. "e4"
}

export default function Chessboard({ position, highlightedSquare }: ChessboardProps) {
  const [board, setBoard] = useState<string[][]>([])

  useEffect(() => {
    // Parse FEN notation to create board
    const parseFen = (fen: string) => {
      const fenParts = fen.split(" ")
      const rows = fenParts[0].split("/")

      const boardArray: string[][] = []

      rows.forEach((row) => {
        const boardRow: string[] = []

        for (let i = 0; i < row.length; i++) {
          const char = row[i]

          if (isNaN(Number.parseInt(char))) {
            // It's a piece
            boardRow.push(char)
          } else {
            // It's a number, representing empty squares
            const emptySquares = Number.parseInt(char)
            for (let j = 0; j < emptySquares; j++) {
              boardRow.push("")
            }
          }
        }

        boardArray.push(boardRow)
      })

      return boardArray
    }

    setBoard(parseFen(position))
  }, [position])

  // Generate board coordinates
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"]

  // Convert algebraic notation (e.g. "e4") to board indices
  const getHighlightIndices = () => {
    if (!highlightedSquare) return null

    const file = highlightedSquare.charCodeAt(0) - 97 // 'a' is 97 in ASCII
    const rank = 8 - Number.parseInt(highlightedSquare[1])

    return { rank, file }
  }

  const highlightIndices = getHighlightIndices()

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="aspect-square border border-gray-700 rounded-md overflow-hidden">
        <div className="grid grid-cols-8 h-full">
          {board.map((row, rankIndex) =>
            row.map((piece, fileIndex) => {
              const isLight = (rankIndex + fileIndex) % 2 === 0
              const squareColor = isLight ? "bg-[#f0d9b5]" : "bg-[#b58863]"
              const isHighlighted =
                highlightIndices && rankIndex === highlightIndices.rank && fileIndex === highlightIndices.file

              return (
                <div
                  key={`${rankIndex}-${fileIndex}`}
                  className={`
                    ${squareColor} 
                    ${isHighlighted ? "bg-[#aaff66]" : ""} 
                    flex items-center justify-center relative
                  `}
                  data-square={`${files[fileIndex]}${ranks[rankIndex]}`}
                >
                  {piece && <div className="w-[70%] h-[70%]">{ChessPieces[piece]}</div>}

                  {/* Coordinates */}
                  {fileIndex === 0 && (
                    <span
                      className={`absolute top-0 left-0 text-xs p-0.5 ${isLight ? "text-[#b58863]" : "text-[#f0d9b5]"}`}
                    >
                      {ranks[rankIndex]}
                    </span>
                  )}
                  {rankIndex === 7 && (
                    <span
                      className={`absolute bottom-0 right-0 text-xs p-0.5 ${isLight ? "text-[#b58863]" : "text-[#f0d9b5]"}`}
                    >
                      {files[fileIndex]}
                    </span>
                  )}
                </div>
              )
            }),
          )}
        </div>
      </div>
    </div>
  )
}
