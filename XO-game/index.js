
const gameContainer = document.querySelector('.game--container')
const cells = document.querySelectorAll('.cell');
const gameStatus = document.querySelector('.game--status');
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
gameStatus.innerHTML = `it's ${currentPlayer}'s turn`

cells.forEach(event => event.addEventListener('click', handleCellClicked));

function handleCellClicked(clickedCellEvent){

 const clickedCell= clickedCellEvent.target;
 const clickedCellIndex= parseInt(clickedCell.getAttribute('data-cell-index'));
 

 if (gameState[clickedCellIndex] !== "") {
        return
    }
 renderGame(clickedCell,clickedCellIndex)

}
function renderGame(clickedCell,clickedCellIndex) {
    
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    if (tieGame()) {
        gameStatus.innerHTML = "Game ended in a draw"
        return
    } else if (endGame()) {
        gameStatus.innerHTML = `Player ${currentPlayer} has won`
        return
    } else {
        currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X"
        gameStatus.innerHTML = `it's ${currentPlayer}'s turn`

    }
    return
}

function tieGame() {
    return Array.from(cells).every(oneCell => oneCell.innerHTML !== "");


}

function endGame() {
    const winningSituations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]

    ]

    return winningSituations.some(winningSituation => {
        return gameState[winningSituation[0]] !== "" && gameState[winningSituation[1]] !== "" && gameState[winningSituation[2]] !== ""
            && gameState[winningSituation[0]] === gameState[winningSituation[1]] && gameState[winningSituation[1]] === gameState[winningSituation[2]]

    })

}

function restartGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell=>cell.innerHTML="");
    currentPlayer = "X";
    gameStatus.innerHTML = `it's ${currentPlayer}'s turn`
    
}


document.querySelector('.game--restart').addEventListener('click', restartGame)