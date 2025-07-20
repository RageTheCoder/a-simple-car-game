const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

const speed = 5;
const moveSpeed = 3;
const rotateSpeed = 0.05;

const keysPressed = {};

document.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keysPressed[event.key] = false;
});

const car = {
    x: 100,
    y: 100,
    width: 40,
    height: 20,
    angle: 0,
    color: 'red'

}


function drawCar(ctx, car) {
    // Body with rounded corners
    ctx.fillStyle = car.color;
    ctx.beginPath();
    ctx.moveTo(-car.width / 2 + 8, -car.height / 2);
    ctx.lineTo(car.width / 2 - 8, -car.height / 2);
    ctx.quadraticCurveTo(car.width / 2, -car.height / 2, car.width / 2, -car.height / 2 + 8);
    ctx.lineTo(car.width / 2, car.height / 2 - 8);
    ctx.quadraticCurveTo(car.width / 2, car.height / 2, car.width / 2 - 8, car.height / 2);
    ctx.lineTo(-car.width / 2 + 8, car.height / 2);
    ctx.quadraticCurveTo(-car.width / 2, car.height / 2, -car.width / 2, car.height / 2 - 8);
    ctx.lineTo(-car.width / 2, -car.height / 2 + 8);
    ctx.quadraticCurveTo(-car.width / 2, -car.height / 2, -car.width / 2 + 8, -car.height / 2);
    ctx.closePath();
    ctx.fill();

    // Windows
    ctx.fillStyle = "#b3e0ff";
    ctx.fillRect(-car.width * 0.18, -car.height * 0.32, car.width * 0.36, car.height * 0.5);

    // Door line
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -car.height / 2 + 4);
    ctx.lineTo(0, car.height / 2 - 4);
    ctx.stroke();

    // Headlights
    ctx.fillStyle = "#ffff99";
    ctx.beginPath();
    ctx.ellipse(car.width / 2, -car.height * 0.22, 4, 3, 0, 0, Math.PI * 2);
    ctx.ellipse(car.width / 2, car.height * 0.22, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Taillights
    ctx.fillStyle = "#ff6666";
    ctx.beginPath();
    ctx.ellipse(-car.width / 2, -car.height * 0.22, 3, 2, 0, 0, Math.PI * 2);
    ctx.ellipse(-car.width / 2, car.height * 0.22, 3, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wheels (darker, more rounded)
    ctx.fillStyle = "#222";
    const wheelW = car.width * 0.18, wheelH = car.height * 0.7;
    // Left wheels
    ctx.beginPath();
    ctx.ellipse(-car.width / 2 - wheelW / 2, -car.height / 2 + wheelH / 2, wheelW / 2, wheelH / 2, 0, 0, Math.PI * 2);
    ctx.ellipse(-car.width / 2 - wheelW / 2, car.height / 2 - wheelH / 2, wheelW / 2, wheelH / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    // Right wheels
    ctx.beginPath();
    ctx.ellipse(car.width / 2 + wheelW / 2, -car.height / 2 + wheelH / 2, wheelW / 2, wheelH / 2, 0, 0, Math.PI * 2);
    ctx.ellipse(car.width / 2 + wheelW / 2, car.height / 2 - wheelH / 2, wheelW / 2, wheelH / 2, 0, 0, Math.PI * 2);
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //rotate the car left/right
    if (keysPressed['ArrowLeft'] || keysPressed['a']) {
        car.angle -= rotateSpeed;
    }
    if (keysPressed['ArrowRight'] || keysPressed['d']) {
        car.angle += rotateSpeed;
    }

    //move the car forward/backward
    let nextX = car.x;
    let nextY = car.y;
    if (keysPressed['ArrowUp'] || keysPressed['w']) {
        nextX += Math.cos(car.angle) * moveSpeed;
        nextY += Math.sin(car.angle) * moveSpeed;
    }
    if (keysPressed['ArrowDown'] || keysPressed['s']) {
        nextX -= Math.cos(car.angle) * moveSpeed;
        nextY -= Math.sin(car.angle) * moveSpeed;
    }

    // Clamp car position so it stays inside the canvas
    // The car's position is its top-left, so we need to keep the whole car visible
    nextX = Math.max(0, Math.min(canvas.width - car.width, nextX));
    nextY = Math.max(0, Math.min(canvas.height - car.height, nextY));
    car.x = nextX;
    car.y = nextY;

    ctx.save();
    ctx.translate(car.x + car.width / 2, car.y + car.height / 2);
    ctx.rotate(car.angle);

    drawCar(ctx, car);

    ctx.restore();
    requestAnimationFrame(draw);
}



draw();
