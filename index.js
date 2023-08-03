var playerTurn = "x",
  isOver = false,
  moves = 0;

const span = $("span");
const restartButton =
  '<button onclick="playAgain()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.a5.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></svg></button>';

function play(y) {
  if ($(y).data("player") === "none" && !isOver) {
    $(y).html(playerTurn);
    $(y).data("player", playerTurn);
    moves++;
    if (playerTurn === "x") {
      playerTurn = "o";
    } else if (playerTurn === "o") {
      playerTurn = "x";
    }
  }
  
  checkWinner(1, 2, 3);
  checkWinner(4, 5, 6);
  checkWinner(7, 8, 9);
  checkWinner(1, 4, 7);
  checkWinner(2, 5, 8);
  checkWinner(3, 6, 9);
  checkWinner(1, 5, 9);
  checkWinner(3, 5, 7);

  if (moves === 9 && !isOver) {
    draw();
  }
}

function checkWinner(a, b, c) {
  a--;
  b--;
  c--;
  if (
    $(span[a]).data("player") === $(span[b]).data("player") &&
    $(span[b]).data("player") === $(span[c]).data("player") &&
    $(span[a]).data("player") === $(span[c]).data("player") &&
    ($(span[a]).data("player") === "x" || $(span[a]).data("player") === "o")
  ) {
    $(span[a]).parent().addClass("activeBox");
    $(span[b]).parent().addClass("activeBox");
    $(span[c]).parent().addClass("activeBox");
    gameOver(a);
  }
}

function playAgain() {
  $(".alert").remove();
  restart();
  isOver = false;
  for (var k = 0; k < span.length; k++) {
    $(span[k]).parent().removeClass("activeBox");
  }
}

function restart() {
  for (var i = 0; i < span.length; i++) {
    $(span[i]).data("player", "none");
    $(span[i]).html("&nbsp;");
    moves = 0;
  }
  playerTurn = "x";
}

function gameOver(a) {
  var gameOverMessage =
    "<b>GAME OVER </b><br><br> Player " +
    $(span[a]).data("player") +
    " Wins!!!<br><br>" + restartButton;
  var div = $("<div>").addClass("alert").html(gameOverMessage);
  $("body").append(div);
  isOver = true;
}

function draw() {
  var drawMessage = "<b>DRAW </b><br><br>" + restartButton;
  var div = $("<div>").addClass("alert").html(drawMessage);
  $("body").append(div);
  isOver = true;
}
