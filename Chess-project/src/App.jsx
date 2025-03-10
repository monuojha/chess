import React from "react";
import "./App.css";
import { useState } from "react";
import moveSoundFile from "./assets/game-start.mp3";
import checkSoundFile from "./assets/illegal.mp3";
import capturingSoundFile from "./assets/castle.mp3";

const moveSound = new Audio(moveSoundFile);
const checkSound = new Audio(checkSoundFile);
const checkmateSound = new Audio(checkSoundFile);
const captureSound = new Audio(capturingSoundFile);

function App() {
  const initialBoard = [
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "q", "k", "b", "n", "r"],
  ];

  const [selectedPiece, setSelectedPiece] = React.useState(null);
  // console.log(selectedPiece);
  const [board, setBoard] = React.useState(initialBoard);
  // console.log(board);
  const [validMoves, setValidMoves] = React.useState([]);
  const [turn, setTurn] = useState("white");
  const [gameStatus, setGameStatus] = useState("");
  const [gameOver, setGameOver] = useState(false);
  // console.log(validMoves);

  const movesAllow = (piece, coordinate) => {
    if (coordinate === null || coordinate === undefined) return true; // Allow movement to empty squares

    const pieceCase = piece === piece.toLowerCase(); // True for black, False for white
    const coordinateCase = coordinate === coordinate.toLowerCase(); // True for black, False for white

    return pieceCase !== coordinateCase; // Allow only if they are of different colors
  };

  function findKingPosition(board, color) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c] === (color === "white" ? "K" : "k")) {
          return [r, c];
        }
      }
    }
    return null;
  }

  function isKingInCheck(board, color) {
    const kingPos = findKingPosition(board, color);
    if (!kingPos) return false;
    const opponentColor = color === "white" ? "black" : "white";

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (
          piece &&
          ((opponentColor === "white" && piece === piece.toUpperCase()) ||
            (opponentColor === "black" && piece === piece.toLowerCase()))
        ) {
          const moves = getValidMove(piece, r, c);
          if (
            moves.some(([mr, mc]) => mr === kingPos[0] && mc === kingPos[1])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
  function isCheckmate(board, color) {
    if (!isKingInCheck(board, color)) return false;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (
          piece &&
          ((color === "white" && piece === piece.toUpperCase()) ||
            (color === "black" && piece === piece.toLowerCase()))
        ) {
          const moves = getValidMove(piece, r, c);
          for (const [mr, mc] of moves) {
            const tempBoard = board.map((row) => [...row]);
            tempBoard[mr][mc] = piece;
            tempBoard[r][c] = null;
            if (!isKingInCheck(tempBoard, color)) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  // Helper function to check if a piece belongs to the opponent

  // const getChessSymbol = (piece) => {
  //   const symbols = {
  //     K: "\u2654",
  //     Q: "\u2655",
  //     R: "\u2656",
  //     B: "\u2657",
  //     N: "\u2658",
  //     P: "\u2659", // White
  //     k: "\u265A",
  //     q: "\u265B",
  //     r: "\u265C",
  //     b: "\u265D",
  //     n: "\u265E",
  //     p: "\u265F", // Black
  //   };
  //   return symbols[piece] || "";
  // };

  const getValidMove = (piece, row, col) => {
    let moves = [];
    

    const pieceLower = piece.toLowerCase();

    if (pieceLower === "p") {
      const direction = piece === "P" ? 1 : -1; // White moves down, Black moves up
      const startRow = piece === "P" ? 1 : 6; // Starting rows for pawns

      // Move one step forward if empty
      if (board[row + direction][col] === null) {
        moves.push([row + direction, col]);

        // Move two steps forward on first move if both squares are empty
        if (row === startRow && board[row + 2 * direction][col] === null) {
          moves.push([row + 2 * direction, col]);
        }
      }

      // Capture diagonally (only if opponent piece is present)
      if (
        col - 1 >= 0 &&
        board[row + direction][col - 1] !== null &&
        movesAllow(piece, board[row + direction][col - 1])
      ) {
        moves.push([row + direction, col - 1]);
      }

      if (
        col + 1 < 8 &&
        board[row + direction][col + 1] !== null &&
        movesAllow(piece, board[row + direction][col + 1])
      ) {
        moves.push([row + direction, col + 1]);
      }
    }

    if (pieceLower === "r") {
      // Rook moves: Vertical and Horizontal, stopping at obstacles
      for (let i = row - 1; i >= 0; i--) {
        if (board[i][col] !== null) {
          if (movesAllow(piece, board[i][col])) {
            moves.push([i, col]);
            break;
          }
          break;
        }
        moves.push([i, col]);
      }
      for (let i = row + 1; i < 8; i++) {
        if (board[i][col] !== null) {
          if (movesAllow(piece, board[i][col])) {
            moves.push([i, col]);
            break;
          }
          break;
        }

        moves.push([i, col]);
      }
      for (let i = col - 1; i >= 0; i--) {
        if (board[row][i] !== null) {
          if (movesAllow(piece, board[row][i])) {
            moves.push([row, i]);
            break;
          }
          break;
        }
        moves.push([row, i]);
      }
      for (let i = col + 1; i < 8; i++) {
        if (board[row][i] !== null) {
          if (movesAllow(piece, board[row][i])) {
            moves.push([row, i]);
            break;
          }
          break;
        }
        moves.push([row, i]);
      }
    }

    if (pieceLower === "q") {
      // Rook moves: Vertical and Horizontal, stopping at obstacles
      for (let i = row - 1; i >= 0; i--) {
        if (board[i][col] !== null) {
          if (movesAllow(piece, board[i][col])) {
            moves.push([i, col]);
            break;
          }
          break;
        }
        moves.push([i, col]);
      }
      for (let i = row + 1; i < 8; i++) {
        if (board[i][col] !== null) {
          if (movesAllow(piece, board[i][col])) {
            moves.push([i, col]);
            break;
          }
          break;
        }
        moves.push([i, col]);
      }
      for (let i = col - 1; i >= 0; i--) {
        if (board[row][i] !== null) {
          if (movesAllow(piece, board[row][i])) {
            moves.push([row, i]);
            break;
          }
          break;
        }
        moves.push([row, i]);
      }
      for (let i = col + 1; i < 8; i++) {
        if (board[row][i] !== null) {
          if (movesAllow(piece, board[row][i])) {
            moves.push([row, i]);
            break;
          }
          break;
        }
        moves.push([row, i]);
      }

      // digonal moves

      //  left-up

      for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
        if (board[row - i][col - i] !== null) {
          if (movesAllow(piece, board[row - i][col - i])) {
            moves.push([row - i, col - i]);
            break;
          }
          break;
        }
        moves.push([row - i, col - i]);
      }

      //  right-up

      for (let i = 1; row - i >= 0 && col + i < 8; i++) {
        if (board[row - i][col + i] !== null) {
          if (movesAllow(piece, board[row - i][col + i])) {
            moves.push([row - i, col + i]);
            break;
          }
          break;
        }

        moves.push([row - i, col + i]);
      }

      //  left-down

      for (let i = 1; row + i < 8 && col - i >= 0; i++) {
        if (board[row + i][col - i] !== null) {
          if (movesAllow(piece, board[row + i][col - i])) {
            moves.push([row + i, col - i]);
            break;
          }
          break;
        }
        moves.push([row + i, col - i]);
      }

      //  right-down

      for (let i = 1; row + i < 8 && col + i < 8; i++) {
        if (board[row + i][col + i] !== null) {
          if (movesAllow(piece, board[row + i][col + i])) {
            moves.push([row + i, col + i]);
            break;
          }
          break;
        }

        moves.push([row + i, col + i]);
      }
    }

    if (pieceLower === "b") {
      //  left-up

      for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
        if (board[row - i][col - i] !== null) {
          if (movesAllow(piece, board[row - i][col - i])) {
            moves.push([row - i, col - i]);
            break;
          }
          break;
        }
        moves.push([row - i, col - i]);
      }

      //  right-up

      for (let i = 1; row - i >= 0 && col + i < 8; i++) {
        if (board[row - i][col + i] !== null) {
          if (movesAllow(piece, board[row - i][col + i])) {
            moves.push([row - i, col + i]);
            break;
          }
          break;
        }

        moves.push([row - i, col + i]);
      }

      //  left-down

      for (let i = 1; row + i < 8 && col - i >= 0; i++) {
        if (board[row + i][col - i] !== null) {
          if (movesAllow(piece, board[row + i][col - i])) {
            moves.push([row + i, col - i]);
            break;
          }
          break;
        }
        moves.push([row + i, col - i]);
      }

      //  right-down

      for (let i = 1; row + i < 8 && col + i < 8; i++) {
        if (board[row + i][col + i] !== null) {
          if (movesAllow(piece, board[row + i][col + i])) {
            moves.push([row + i, col + i]);
            break;
          }
          break;
        }

        moves.push([row + i, col + i]);
      }
    }

    if (pieceLower === "k") {
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          if (i >= 0 && i < 8 && j >= 0 && j < 8 && !(i === row && j === col)) {
            if (movesAllow(piece, board[i][j])) {
              moves.push([i, j]); // Add move only if it's allowed
            }
          }
        }
      }
    }

    if (pieceLower === "n") {
      const knightMoves = [
        [-2, -1],
        [-2, 1], // Up two, left & right
        [-1, -2],
        [-1, 2], // Left two, up & down
        [1, -2],
        [1, 2], // Right two, up & down
        [2, -1],
        [2, 1], // Down two, left & right
      ];

      for (const [dx, dy] of knightMoves) {
        const newRow = row + dx;
        const newCol = col + dy;

        // Check if the move is inside the board
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          // Check if the move is valid (empty square or opponent's piece)
          if (movesAllow(piece, board[newRow][newCol])) {
            moves.push([newRow, newCol]); // Add valid move
          }
        }
      }
    }

    return moves;
  };

  const handleSquareClick = (row, col) => {
    if (gameOver) return;

    const piece = board[row][col];
    if (selectedPiece) {
      if (validMoves.some(([r, c]) => r === row && c === col)) {
        const newBoard = board.map((r) => [...r]);
        const capturedPiece = newBoard[row][col]; // Check if capturing a piece
       
        newBoard[selectedPiece.row][selectedPiece.col] = null;
        newBoard[row][col] = selectedPiece.piece;
        setBoard(newBoard);
        setTurn(turn === "white" ? "black" : "white");
        if (capturedPiece) {
          
          captureSound.play(); // Play capture sound if an opponent's piece is taken
          if (capturedPiece === "K" || capturedPiece === "k") {
            setGameStatus(
              `${turn === "white" ? "Black" : "White"} wins by checkmate!`
            );
            setGameOver(true);
            checkmateSound.play();
            
          }
        } else {
          moveSound.play();
        }

        if (isCheckmate(newBoard, turn === "white" ? "black" : "white")) {
          setGameStatus(
            `${turn === "white" ? "Black" : "White"} wins by checkmate!`
          );
          setGameOver(true);
          checkmateSound.play();
        } else if (
          isKingInCheck(newBoard, turn === "white" ? "black" : "white")
        ) {
          setGameStatus(`${turn === "white" ? "Black" : "White"} is in check!`);
          checkSound.play();
        } else {
          setGameStatus("");
        }
      }
      setSelectedPiece(null);
      setValidMoves([]);
    } else if (
      piece &&
      ((turn === "white" && piece === piece.toUpperCase()) ||
        (turn === "black" && piece === piece.toLowerCase()))
    ) {
      setSelectedPiece({ row, col, piece });
      setValidMoves(getValidMove(piece, row, col));
    }
  };

  return (
    <div className="game-container">
      <div
        className={`status-message ${
          gameStatus.includes("checkmate")
            ? "checkmate"
            : gameStatus.includes("check")
            ? "check"
            : ""
        }`}
      >
        {gameStatus}
      </div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((piece, colIndex) => {
              const isSelected =
                selectedPiece?.row === rowIndex &&
                selectedPiece?.col === colIndex;
              const isValidMove = validMoves.some(
                ([r, c]) => r === rowIndex && c === colIndex
              );
              const isInCheck =
                isKingInCheck(board, turn) &&
                piece &&
                (piece === "K" || piece === "k");
              const isCheckmatedKing =
                gameStatus.includes("checkmate") &&
                (piece === "K" || piece === "k");

              return (
                <div
                  key={colIndex}
                  className={`square ${
                    (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"
                  } ${isSelected ? "selected" : ""} ${
                    isValidMove ? "valid-move" : ""
                  } ${isInCheck ? "king-check" : ""} ${
                    isCheckmatedKing ? "checkmate-king" : ""
                  }`}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                >
                  {piece && (
                    <span
                      className={`chess-piece ${
                        piece === piece.toUpperCase() ? "white" : "black"
                      }`}
                    >
                      {piece}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
