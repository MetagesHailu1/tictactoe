import { useState, useEffect } from 'react';
import './App.css';

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

  return (
    <>
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
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [status, setStatus] = useState('Next player: X');
  const [showPopup, setShowPopup] = useState(false);
  const [winners, setWinners] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  useEffect(() => {
    const winner = calculateWinner(currentSquares);
    if (winner || currentSquares.every((square) => square !== null)) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [currentSquares]);

  useEffect(() => {
    if (winners) {
      setStatus(`Winners: ${winners}`);
    } else if (isDraw) {
      setStatus("It's a draw!");
    } else {
      setStatus(`Next player: ${xIsNext ? 'X' : 'O'}`);
    }
  }, [winners, isDraw, xIsNext]);

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
        <button className='History' onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
      <div className="status">{status}</div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      {showPopup && (
        <div className="popup">
          <h2>{calculateWinner(currentSquares) ? `Winner: ${calculateWinner(currentSquares)}` : 'Draw'}</h2>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

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


// import React, { useState } from 'react';

// function Square({ value, onSquareClick }) {
//   return (
//     <button className="square" onClick={onSquareClick}>
//       {value}
//     </button>
//   );
// }

// function Board({ xIsNext, squares, onPlay }) {          //how we know squares is array (teftoal const [squares, setSquares] = useState([Array(9).fill(null)])
//   function handleClick(i) {
//     if (calculateWinner(squares) || squares[i]) {
//       return;  //no more work on handlClick bado return yaderg ena leko yiwetal ketach yalutnm if ayseram 
//                                  //   return baynor noro gn ketach yalutn yisera neber
//     }
//     const nextSquares = squares.slice();
//     if (xIsNext) {
//       nextSquares[i] = 'X';
//     } else {
//       nextSquares[i] = 'O';
//     }
//     onPlay(nextSquares);
//   }

//   const winner = calculateWinner(squares);
//   let status;
//   if (winner) {
//     status = 'Winner: ' + winner;
//   } else if (isDraw(squares)) {
//     status = 'It\'s a draw!';
//   } else {
//     status = 'Next player: ' + (xIsNext ? 'X' : 'O');
//   }

//   return (
//     <>
//       <div className="status">{status}</div>
//       <div className="board-row">
//         <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
//         <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
//         <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
//       </div>
//       <div className="board-row">
//         <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
//         <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
//         <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
//       </div>
//       <div className="board-row">
//         <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
//         <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
//         <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
//       </div>
//     </>
//   );
// }

// export default function Game() {
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const [currentMove, setCurrentMove] = useState(0);
//   const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
//   const xIsNext = currentMove % 2 === 0;
//   const currentSquares = history[currentMove];

//   function handlePlay(nextSquares) {
//     const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
//     setHistory(nextHistory);
//     setCurrentMove(nextHistory.length - 1);

//     const winner = calculateWinner(nextSquares);
//     const isGameDraw = isDraw(nextSquares);
//     if (winner || isGameDraw) {
//       setShowModal(true); // Show the modal when there is a winner or a draw
//     }
//   }

//   function jumpTo(nextMove) {
//     setCurrentMove(nextMove);
//     setShowModal(false); // Hide the modal when jumping to a previous move
//   }

//   const moves = history.map((squares, move) => {
//     let description;
//     if (move > 0) {
//       description = 'Go to move #' + move;
//     } else {
//       description = 'Go to game start';
//     }
//     return (
//       <li key={move}>
//         <button onClick={() => jumpTo(move)}>{description}</button>
//       </li>
//     );
//   });

//   function closeModal() {
//     setShowModal(false);
//   }

//   const winner = calculateWinner(currentSquares);
//   const isGameDraw = isDraw(currentSquares);

//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
//       </div>
//       <div className="game-info">
//         <ol>{moves}</ol>
//       </div>
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             {winner && <h2>Winner: {winner}</h2>}
//             {isGameDraw && <h2>It's a draw!</h2>}
//             <button onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function calculateWinner(squares) {
//   // ... existing code for calculating the winner
// }

// function isDraw(squares) {
//   return squares.every(square => square !== null);
// }

//another code

/* import React, { useState } from 'react';

function Counter() {
  // Declare a state variable called "count" and initialize it to 0
  const [count, setCount] = useState(0);

  // Function to increment the count
  const increment = () => {
    setCount(count + 1);
  };

  // Function to decrement the count
  const decrement = () => {
    setCount(count - 1);
  };


  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default Counter;
*/


 
