"use client"

import { useEffect, useState } from "react"
import { ChessPieces } from "./chess-pieces"

interface MiniChessboardProps {
  position: string // FEN notation
  className?: string
  highlightedSquare?: string
}

export default function MiniChessboard({ position, className = "", highlightedSquare }: MiniChessboardProps) {
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

  // Convert algebraic notation (e.g. "e4") to board indices
  const getHighlightIndices = () => {
    if (!highlightedSquare) return null

    const file = highlightedSquare.charCodeAt(0) - 97 // 'a' is 97 in ASCII
    const rank = 8 - Number.parseInt(highlightedSquare[1])

    return { rank, file }
  }

  const highlightIndices = getHighlightIndices()

  return (
    <div className={`aspect-square w-full overflow-hidden rounded ${className}`}>
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
                  flex items-center justify-center
                `}
              >
                {piece && <div className="w-[80%] h-[80%]">{ChessPieces[piece]}</div>}
              </div>
            )
          }),
        )}
      </div>
    </div>
  )
}
