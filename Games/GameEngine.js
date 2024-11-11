// GameEngine.js

export { Game, GameObject, GameObjects };

class Game {
    constructor(options = {}, initializeFunction) {
        // Create the canvas element
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.isRunning = true;
        this.gameObjects = new GameObjects();

        // Set canvas properties based on options or defaults
        this.canvas.width = options.width || 800;
        this.canvas.height = options.height || 600;

        // Append canvas to the DOM
        if (options.parentElementId) {
            const parent = document.getElementById(options.parentElementId);
            if (parent) {
                parent.appendChild(this.canvas);
            } else {
                console.warn(`Parent element with id "${options.parentElementId}" not found. Appending canvas to body.`);
                document.body.appendChild(this.canvas);
            }
        } else {
            // If no parent element specified, append to body
            document.body.appendChild(this.canvas);
        }

        // Call the game-specific initialization function
        if (initializeFunction) {
            initializeFunction(this);
        }

        this.lastTime = performance.now();

        this.setupEventListeners();
    }

    addGameObject(gameObject) {
        this.gameObjects.add(gameObject);
    }

    start() {
        this.gameLoop();
    }

    gameLoop() {
        if (this.isRunning) {
            const currentTime = performance.now();
            const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
            this.lastTime = currentTime;

            this.update(deltaTime);
            this.draw();
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    update(deltaTime) {
        this.gameObjects.update(deltaTime);
    }

    setupEventListeners() {
        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Delegate the click event to all game objects
            this.gameObjects.handleClick(x, y);
        });
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.gameObjects.draw(this.context);
    }
}

class GameObject {
    constructor() {
        // Position and size for click detection
        this.x = 0;
        this.y = 0;
        this.width = 0; // Should be set by subclasses
        this.height = 0; // Should be set by subclasses
    }

    draw(context) { }

    update(deltaTime) {
        // Base update logic (if any)
    }

    onClick(x, y) { }

    containsPoint(x, y) {
        return x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height;
    }
}

class GameObjects {
    constructor() {
        this.objects = [];
    }

    add(gameObject) {
        this.objects.push(gameObject);
    }

    remove(gameObject) {
        this.objects = this.objects.filter(obj => obj !== gameObject);
    }

    update(deltaTime) {
        for (const obj of this.objects) {
            obj.update(deltaTime);
        }
    }

    draw(context) {
        for (const obj of this.objects) {
            obj.draw(context);
        }
    }

    handleClick(x, y) {
        for (const obj of this.objects) {
            if (obj.containsPoint && obj.containsPoint(x, y)) {
                obj.onClick(x, y);
            }
        }
    }
}
