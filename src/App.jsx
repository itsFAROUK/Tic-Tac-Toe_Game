import { useState } from "react"

function App() {

  const [board, setBoard] = useState(Array(9).fill())

  const [isXTurn, setIsXTurn] = useState(true)

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ]

  const winner = getWinner(board)

  function getWinner(squares) {
    
    for(let combination of winningCombinations) {
      const [a, b, c] = combination

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    
    return undefined
  }

  function handleSquareClick(index) {
    if (board[index] || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = isXTurn ? 'X' : 'O'

    setBoard(updatedBoard)
    setIsXTurn(!isXTurn)
  }

  function getGameStatus() {
    if(winner) return `Winner: ${winner}`

    if(board.every((square) => square)) {
      return "It's a Draw!"
    }

    return `Next Player: ${isXTurn ? 'X' : 'O'}`
  }

  function resetGame() {
    setBoard(Array(9).fill())
    setIsXTurn(true)
  }

  return (
    <div className="grid place-items-center  min-h-screen bg-slate-950 text-white text-center">
      
      <div className="w-full max-w-[400px] mx-5">
        <h1 className="mb-8 text-5xl font-semibold">Tic Tac Toe</h1>

        <p className={`mb-6 text-center 
          ${winner ? "text-2xl font-bold text-green-400 animate-bounce"
          : "text-xl"}`}>{getGameStatus()}</p>

        <ul className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6">
          {board.map((square, index) =>(
            <li key={index}>
              <button
                onClick={() => handleSquareClick(index)}
                className={`h-32 w-full bg-gray-800 rounded-md text-6xl font-light transition-colors duration-200 hover:bg-gray-700 ${square === 'O' && "text-slate-400"}`}>
                  {square}
              </button>
            </li>
          ))}
        </ul>

        <button className="w-full py-3 text-lg border rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
        onClick={resetGame}> New Game</button>
        
      </div>
      
    </div>
  )
}

export default App
