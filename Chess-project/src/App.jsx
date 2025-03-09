import React from "react";
import "./App.css";

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
  // console.log(validMoves);

  const movesAllow = (piece, coordinate) => {
    const pieceCase = piece === piece.toLowerCase();

    //  console.log(pieceCase)
    if (coordinate !== null && coordinate !== undefined) {
      const coordinateCase = coordinate === coordinate.toLowerCase();
      console.log(coordinateCase, pieceCase);
      //  console.log(coordinateCase)

      if (pieceCase && coordinateCase) {
        return false;
      } else if (pieceCase !== true && coordinateCase !== true) {
        return false;
      } else {
        return true;
      }
    }
  };

  const getValidMove = (piece, row, col) => {
    let moves = [];
    console.log(moves);

    const pieceLower = piece.toLowerCase();

    if (pieceLower === "p") {
      const direction = piece === "P" ? 1 : -1;
      if (
        row + direction >= 0 &&
        row + direction < 8 &&
        board[row + direction][col] === null
      ) {
        moves.push([row + direction, col]);
      }
      if (
        board[row + direction][col + direction] !== null &&
        movesAllow(piece, board[row + direction][col + direction])
      )
        moves.push([row + direction, col + direction]);
      if (
        board[row + direction][col - direction] !== null &&
        movesAllow(piece, board[row + direction][col - direction])
      )
        moves.push([row + direction, col - direction]);
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

    if (pieceLower === "k") {
      
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

    if (pieceLower === "n") {
    }

    return moves;
  };

  const handleSquareClick = (row, col) => {
    const piece = board[row][col];
    if (selectedPiece) {
      if (validMoves.some(([r, c]) => r === row && c === col)) {
        const newBoard = board.map((r) => [...r]);

        newBoard[selectedPiece.row][selectedPiece.col] = null;
        newBoard[row][col] = selectedPiece.piece;

        setBoard(newBoard);
      }
      setSelectedPiece(null);
      setValidMoves([]);
    } else if (piece) {
      setSelectedPiece({ row, col, piece });
      setValidMoves(getValidMove(piece, row, col));
    }
  };

  return (
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

            return (
              <div
                key={colIndex}
                className={`square ${
                  (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"
                } ${isSelected ? "selected" : ""} ${
                  isValidMove ? "valid-move" : ""
                }`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {piece && <span>{piece}</span>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default App;
