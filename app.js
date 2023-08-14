let gameSequence = []; // random generated flashing sequence
let userSequence = []; // user input flashing sequence

let start = false;
let level = 0;
let highestScore = 0;

let highestScoreElement = document.getElementById("highest-score");
let h3 = document.querySelector("h3");
let btns = ["red", "green", "blue", "yellow"]; // Use class names without dots

// step 1: If any key is pressed then Start the game
// step 2: increase the level and Flash any random btn
document.addEventListener("click", startGame);
document.addEventListener("touchstart", startGame);
function startGame() {
  if (start == false) {
    start = true;
    levelUp();
  }
};

function btnFlash(btn) {
  btn.classList.add("flash");

  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

function levelUp() {
  // reset userSequence
  userSequence = [];
  level++;
  h3.innerText = ` Level ${level}`;

  // generate random btn that will flash
  let randomIndex = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIndex];
  let randomBtn = document.querySelector(`.${randomColor}`); // Use the correct class name

  // add the generated randomcolor to array gameSequence
  gameSequence.push(randomColor);

  btnFlash(randomBtn);
}

function checkSequence(ind) {
  if (userSequence[ind] === gameSequence[ind]) {
    // if reached till last comparison
    if (userSequence.length == gameSequence.length) {
      setTimeout(levelUp, 1000);
      if (level > highestScore) {
        highestScore = level;
        highestScoreElement.innerHTML =`<h2>Highest Score: ${highestScore}</h2>`;
    }
    }
  } else {
    h3.innerHTML = `Game Over! Your score was <b>${level}</b><br> Press any key to start again `;

    document.body.classList.add("body-game-over"); // Apply the red background color
    // Remove the red background color after a delay
    setTimeout(function () {
      document.body.classList.remove("body-game-over"); // Remove the red background color
      reset();
    }, 900);
  }
}

// flash each button that is clicked by user
function btnPress() {
  console.log("Button was pressed");
  btnFlash(this);

  // push the user clicked btn in array userSequence
  userColor = this.getAttribute("id");
  userSequence.push(userColor);

  // check userSequence and gameSequence
  checkSequence(userSequence.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  start = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}
