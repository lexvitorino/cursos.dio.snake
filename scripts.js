let startButton = document.getElementById('startButton');
let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let direction = '';
let snake = [];
let food = { y: -999, x: -999, };
let game;
let time = 100;

const RIGHT = 'right';
const LEFT = 'left';
const UP = 'up';
const DOWN = 'down';

snake[0] = { y: 8 * box, x: 8 * box };

isRight = () => direction === RIGHT;
isLeft = () => direction === LEFT;
isUp = () => direction === UP;
isDown = () => direction === DOWN;

function randFood() {
    food = {
        y: Math.floor(Math.random() * 15 + 1) * box,
        x: Math.floor(Math.random() * 15 + 1) * box,
    }
}

function createBG() {
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function createFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
    if (event.keyCode === 37 && !isRight()) direction = LEFT;
    if (event.keyCode === 38 && !isDown()) direction = UP;
    if (event.keyCode === 39 && !isLeft()) direction = RIGHT;
    if (event.keyCode === 40 && !isUp()) direction = DOWN;
}

function start() {
    if (snake[0].x > 15 * box && isRight()) snake[0].x = 0;
    if (snake[0].x < 0 && isLeft()) snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && isDown()) snake[0].y = 0;
    if (snake[0].y < 0 && isUp()) snake[0].y = 16 * box;

    if (verifyGameOver()) return;

    createBG();
    createSnake();
    createFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (isRight()) snakeX += box;
    if (isLeft()) snakeX -= box;
    if (isUp()) snakeY -= box;
    if (isDown()) snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        randFood();
    }

    snake.unshift({ x: snakeX, y: snakeY });
}

function reset() {
    snake = [];
    snake[0] = { y: 8 * box, x: 8 * box };
    randFood();
}

function startGame() {
    reset();
    startButton.style.display = 'none';
    game = setInterval(start, time);
}

function verifyGameOver() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            startButton.style.display = 'block';
            clearTimeout(game);
            alert('GAME OVER :(');
            return true;
        }        
    }
    return false;
}