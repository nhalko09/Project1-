const gameConfig = {
    initialBallSpeedX: 2,
    initialBallSpeedY: 2,
    paddleSpeed: 40,
    winScore: 10,
    maxLives: 3,
    speedIncrement: 1,
};

const gameContainer = document.getElementById('game-container');
const ball = document.getElementById('ball');
const paddle = document.getElementById('paddle');
const scoreDisplay = document.getElementById('score');
const statusMessage = document.getElementById('status-message');


let ballX = 190;
let ballY = 0;
let ballSpeedX = gameConfig.initialBallSpeedX;
let ballSpeedY = gameConfig.initialBallSpeedY;
let paddleX = 150;
let score = 0;


document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && paddleX > 0) {
        paddleX -= gameConfig.paddleSpeed;
    }
    if (e.key === 'ArrowRight' && paddleX < 300) {
        paddleX += gameConfig.paddleSpeed;
    }
    paddle.style.left = `${paddleX}px`;
});


function gameLoop() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;


    if (ballX <= 0 || ballX >= 380) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;

    }

    
    if (ballY >= 560 && ballX >= paddleX && ballX <= paddleX + 100) {
        ballSpeedY = -ballSpeedY;
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    // Ball falls below paddle
    if (ballY >= 600) {
        loseLife();
        return;
    }

    // Win condition
    if (score >= gameConfig.winScore) {
        endGame('win');
        return;
    }

    // Update ball position
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    // Continue the game loop
    requestAnimationFrame(gameLoop);
}

// Start Game
function startGame() {
    ballX = 190;
    ballY = 0;
    ballSpeedX = gameConfig.initialBallSpeedX;
    ballSpeedY = gameConfig.initialBallSpeedY;
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    statusMessage.textContent = '';
    gameLoop();
}

// End Game
function endGame(result) {
    if (result === 'win') {
        statusMessage.textContent = 'Congratulations! You win!';
    } else {
        statusMessage.textContent = 'Game Over! Try again.';
    }
}

// Initialize Game
startGame();
