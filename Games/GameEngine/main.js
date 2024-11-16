// main.js
import { Game } from './Game.js';
import { GameObject } from './GameObject.js';
import { Vector3d } from './Vector3d.js';
import { Logger } from './Logger.js';

// Enable logging
Logger.isOn = true;
Logger.currentLevel = Logger.levels.DEBUG;
class TestObject extends GameObject {
    constructor() {
        super();
        this.position = new Vector3d(100, 100, 0);
        this.size = new Vector3d(50, 50, 0);
        this.collisionBox = GameObject.collisionBox.RECTANGLE;
        this.clickableArea = GameObject.clickableArea.RECTANGLE;
        this.speed = 100; // Pixels per second
        this.keys = {};
    }

    draw(context) {
        context.fillStyle = 'blue';
        context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    handleKeyDown(event) {
        this.keys[event.key] = true;
    }

    handleKeyUp(event) {
        this.keys[event.key] = false;
    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this.keys['ArrowUp']) {
            this.position.y -= this.speed * deltaTime;
        }
        if (this.keys['ArrowDown']) {
            this.position.y += this.speed * deltaTime;
        }
        if (this.keys['ArrowLeft']) {
            this.position.x -= this.speed * deltaTime;
        }
        if (this.keys['ArrowRight']) {
            this.position.x += this.speed * deltaTime;
        }
    }
}

class MovingObject extends GameObject {
    constructor() {
        super();
        this.position = new Vector3d(200, 200, 0);
        this.size = new Vector3d(30, 30, 0);
        this.collisionBox = GameObject.collisionBox.RECTANGLE;
        this.physicsMode = GameObject.physicsMode.SIMPLE;
        this.velocity = new Vector3d(50, 0, 0); // Move horizontally
    }

    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    update(deltaTime, canvas) {
        super.update(deltaTime, canvas);
        // Bounce off the edges
        if (this.position.x <= 0 || this.position.x + this.size.x >= canvas.width) {
            this.velocity.x = -this.velocity.x;
        }
    }

}
const TARGET_ASPECT_RATIO = 16 / 9;

// Initialize the game
const game = new Game({
    canvas: document.getElementById('gameCanvas'),
    targetAspectRatio: TARGET_ASPECT_RATIO
}, (gameInstance) => {
    // Create and add the test object
    const testObject = new TestObject();
    gameInstance.addGameObject(testObject);
    
    // In your initialization function
    const movingObject = new MovingObject();
    gameInstance.addGameObject(movingObject);
});

// Start the game loop
game.start();
