



// import { useState } from 'react';

// function Square() {
//   const [value, setValue] = useState(null);

//   function handleClick() {
//     setValue('X');
//   }

//   return (
//     <button
//       className="square"
//       onClick={handleClick}
//     >
//       {value}
//     </button>
//   );
// }

// export default function Board() {
//   return (
//     <>
//       <div className="board-row">
//         <Square />
//         <Square />
//         <Square />
//       </div>
//       <div className="board-row">
//         <Square />
//         <Square />
//         <Square />
//       </div>
//       <div className="board-row">
//         <Square />
//         <Square />
//         <Square />
//       </div>
//     </>
//   );
// }





import React, { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (isBoardFull(squares)) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function isBoardFull(squares) {
    return squares.every((square) => square !== null);
  }

  return (
    <>
      <div className="status">
        <h1>
          <b>{status}</b>
        </h1>
      </div>
      <div className="Board-1">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

function Popup({ message, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{message}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

 function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isWinnerPopupOpen, setIsWinnerPopupOpen] = useState(false);
  const [isDrawPopupOpen, setIsDrawPopupOpen] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button className="History" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  const winner = calculateWinner(currentSquares);
  const isBoardFull = currentSquares.every((square) => square !== null);

  function handleWinnerPopupClose() {
    setIsWinnerPopupOpen(false);
  }

  function handleDrawPopupClose() {
    setIsDrawPopupOpen(false);
  }

  if (winner && !isWinnerPopupOpen) {
    setIsWinnerPopupOpen(true);
  } else if (isBoardFull && !winner && !isDrawPopupOpen) {
    setIsDrawPopupOpen(true);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <div className="game-1">_______Tic-Tac-Toe Game in <span>React</span>_______</div>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      {isWinnerPopupOpen && (
        <Popup
          message={'Winner: ' + winner}
          onClose={handleWinnerPopupClose}
        />
      )}
      {isDrawPopupOpen && (
        <Popup message="Draw" onClose={handleDrawPopupClose} />
      )}
    </div>
  );
}

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4The previous response is truncated. Here's the complete code for the `calculateWinner` function and the missing part of the code:

// ```jsx
// // ... previous code ...

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function App() {
  return <Game />;
}