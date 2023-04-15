const gameBoard = (function () {
  let activePlayer = "X";

  let player1 = 0;
  let player2 = 0;

  let moves = 0;
  let round = 0;
  const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let tiles = document.querySelectorAll(".tiles");
  let board = document.querySelector(".layout-container");
  let p1Score = document.querySelector(".p1Score");
  let p2Score = document.querySelector(".p2Score");
  let resBtn = document.querySelector(".restart");
  let text = document.querySelector(".text");

  //event handler
  board.addEventListener("click", handleClick);
  resBtn.addEventListener("click", restartBtn);

  function init() {
    handleClick();
  }
  function changeTurn() {
    activePlayer = activePlayer === "X" ? "O" : "X";
  }

  //handle the clicks
  function handleClick(event) {
    if (!event.target.innerHTML) {
      event.target.innerHTML = activePlayer;
      moves++;
      checkWinner();
      changeTurn();

      console.log(moves);
    }
  }

  function checkWinner() {
    for (let combo of winCombo) {
      let [a, b, c] = combo;
      if (
        tiles[a].innerHTML &&
        tiles[a].innerHTML === tiles[b].innerHTML &&
        tiles[b].innerHTML === tiles[c].innerHTML
      ) {
        endGame();
        break;
      } else if (moves === 9) {
        endGame(true);
        break;
      }
    }
  }
  function endGame(tie) {
    if (tie) {
      text.textContent = "TIE GAME";
    } else if (activePlayer === "X") {
      text.textContent = `Player ${player1} has won!`;
      round++;
      player1++;
      p1Score.textContent = player1;
      board.removeEventListener("click", handleClick);
    } else {
      text.textContent = `Player ${player2} has won!`;
      round++;
      player2++;
      p2Score.textContent = player2;
      board.removeEventListener("click", handleClick);
    }

    if (round === 3) {
      text.textContent = `Player ${activePlayer} won the Game!!!`;
      board.removeEventListener("click", handleClick);
      player1 = 0;
      player2 = 0;
      p1Score.textContent = 0;
      p2Score.textContent = 0;
    }
  }

  function restartBtn() {
    tiles.forEach((tile) => {
      tile.textContent = "";
    });
    moves = 0;
    text.textContent = "";
    board.addEventListener("click", handleClick);
  }

  return { init };
})();

gameBoard.init();
// console.log(gameBoard.changeTurn());

//how to make my textContent not change on click?
