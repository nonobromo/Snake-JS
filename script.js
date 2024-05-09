const board = document.querySelector("#board");
const width = window.screen.width < 640 ? 20 : 35; // הרוחב בהתאם לרוחב המסך
const height = window.screen.height < 1080 ? 20 : 35;
const snake = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const divs = [];
let direction = 'left';
let interval = 0;
let appleIndex;
let isGameRunning;
let intervalTime = 300;
let score = 0;

const buttonsArea = document.querySelector(".buttons");
const btnStart = document.querySelector("#start-btn");
const contBtn = document.querySelector("#cont-game");
const stopBtn = document.querySelector("#stop-snake");
const resetBtn = document.querySelector("#reset-game");
const scoreText = document.querySelector("b");
const phoneControls = document.querySelector(".controls");

btnStart.addEventListener("click", function () {
    board.style.display = "inline-grid";
    createBoard();
    btnStart.style.display = "none"
    scoreText.style.display = "block"
})

function createBoard() {
    board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    buttonsArea.style.display = "flex";
    phoneControls.style.display = "grid";

    for (let i = 0; i < width * height; i++) {
        const div = document.createElement("div");
        board.appendChild(div);
        divs.push(div);
    }
    color();
    createApple();
    interval = setInterval(() => move(direction), intervalTime);
    isGameRunning = true;
}



function color() {
    divs.forEach(div => {
        div.classList.remove("snake");
    });

    snake.forEach(x => {
        divs[x].classList.add("snake");
    });
}

function move(dir) {
    let head = snake[0];


    if (!isGameRunning) {
        return;
    } else {
        if (dir === 'up') {
            if (direction === 'down') {
                return;
            }

            head -= width;

            // בדיקת גבולות - אם הנחש עומד לחרוג מה-0
            if (head < 0) {
                gameover()
                return;
            }
        } else if (dir === 'down') {
            if (direction === 'up') {
                return;
            }

            head += width;

            if (head >= width * height) {
                gameover()
                return;
            }
        } else if (dir === 'left') {
            if (direction === 'right') {
                return;
            }

            head++;

            if (head % width === 0) {
                gameover()
                return;
            }
        } else if (dir === 'right') {
            if (direction === 'left') {
                return;
            }

            if (head % width === 0) {
                gameover()
                return;
            }

            head--;
        }
    }

    if (snake.includes(head)) {
        gameover();
        return;
    }

    direction = dir;
    snake.unshift(head);
    snake.pop();
    color();
    eatApple();
}

function createApple() {
    appleIndex = Math.floor(Math.random() * divs.length);
    divs[appleIndex].classList.add("apple");
}

function eatApple() {
    if (divs[snake[0]].classList.contains("apple")) {
        setspeed();
        divs[snake[0]].classList.remove("apple");
        snake.push(appleIndex);
        createApple();
        score++;
        scoreText.textContent = `score: ${score}`
    }
}

function setspeed() {
    if (intervalTime === 50) {
        return;
    } else {
        intervalTime -= 10;
        clearInterval(interval);
        interval = setInterval(() => move(direction), intervalTime);
        console.log(intervalTime);
    }
}

function gameover() {
    clearInterval(interval)
    alert("gameover")
    isGameRunning = false;
}

function moveButton(btn) {
    setTimeout(() => {
        btn.style.transform = "translateY(-5px)";
        btn.style.transition = "400ms";
    }, 100)
    setTimeout(() => {
        btn.style.transform = "translateY(0)";
        btn.style.transition = "400ms";
    }, 300)
}

function resetGame() {
    clearInterval(interval)
    divs.forEach(div => {
        div.classList.remove("apple");
    });

    snake.splice(0, snake.length);
    direction = "left";
    snake.push(9, 8, 7, 6, 5, 4, 3, 2, 1, 0);
    isGameRunning = true;
    intervalTime = 300;
    interval = setInterval(() => move(direction), intervalTime);
    color();
    createApple();
    score = 0;
    scoreText.textContent = `Score : ${score}`;
}

window.addEventListener("keydown", ev => {
    ev.preventDefault();

    switch (ev.key) {
        case "ArrowUp": move("up"); break;
        case "ArrowRight": move("right"); break;
        case "ArrowDown": move("down"); break;
        case "ArrowLeft": move("left"); break;
        case "Escape": isGameRunning = false, moveButton(stopBtn); break;
        case "Enter":
            moveButton(contBtn)
            isGameRunning = true;
            move(direction)
                ; break;
        case "Backspace": resetGame(), moveButton(resetBtn);
            break;
    }
});


const arrowUp = document.getElementById("arrow-up");
const arrowright = document.getElementById("arrow-right");
const arrowLeft = document.getElementById("arrow-left");
const arrowDown = document.getElementById("arrow-down");
const btnStop = document.getElementById("stop-snake");
const btnCont = document.getElementById("cont-game");
const btnReset = document.getElementById("reset-game");

arrowUp.addEventListener("click", () => move("up"));
arrowright.addEventListener("click", () => move("right"));
arrowLeft.addEventListener("click", () => move("left"));
arrowDown.addEventListener("click", () => move("down"));

btnStop.addEventListener("click", () => isGameRunning = false);
btnCont.addEventListener("click", () => isGameRunning = true, move(direction));
btnReset.addEventListener("click", () => resetGame());