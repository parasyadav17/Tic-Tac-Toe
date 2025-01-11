let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-game");
let newbtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#win-msg");

let turnO = true;
let click_count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  click_count = 0;
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    click_count++;
    if (turnO === true) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
showWinner = (winner) => {
  if (winner == 9) {
    msg.innerText = "Match Tied";
  } else {
    msg.innerText = `Congratulations, player ${winner} is Winner`;
  }

  msgContainer.classList.remove("hide");
  disableBoxes();
};

checkWinner = () => {
  for (let pattern of winPatterns) {
    let val1 = boxes[pattern[0]].innerText;
    let val2 = boxes[pattern[1]].innerText;
    let val3 = boxes[pattern[2]].innerText;

    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 === val2 && val2 === val3) {
        console.log(`Winner is Player ${val1}`);
        showWinner(val1);
      } else if (click_count == 9) {
        showWinner(click_count);
      }
    }
  }
};

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
