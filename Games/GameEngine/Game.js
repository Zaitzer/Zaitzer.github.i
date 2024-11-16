import { GameObjects } from './GameObjects.js';
import { Logger } from './Logger.js';
import { Camera } from './Camera.js';
import { Viewport } from './Viewport.js';

export class Game {
    constructor(options = {}, initializeFunction) {
        this.canvas = options.canvas || document.createElement('canvas');
        this.canvas.id = options.canvasId || 'gameCanvas';
        this.isRunning = true;
        this.gameObjects = new GameObjects();
        this.TARGET_ASPECT_RATIO = options.targetAspectRatio || 16 / 9;

        if (options.parentElementId) {
            const parent = document.getElementById(options.parentElementId);
            if (parent) {
                parent.appendChild(this.canvas);
            } else {
                Logger.PRINT(`Parent element with id "${options.parentElementId}" not found. Appending canvas to body.`);
                document.body.appendChild(this.canvas);
            }
        } else {
            document.body.appendChild(this.canvas);
        }

        this.viewport = new Viewport(this.canvas, this.TARGET_ASPECT_RATIO);
        this.camera = new Camera(this.canvas.width, this.canvas.height);

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
            const deltaTime = (currentTime - this.lastTime) / 1000;
            this.lastTime = currentTime;

            this.update(deltaTime);
            this.draw();
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    update(deltaTime) {
        this.gameObjects.update(deltaTime, this.canvas);
    }

    setupEventListeners() {
        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            this.gameObjects.handleClick(x, y);
        });

        window.addEventListener('keydown', (event) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                event.preventDefault();
            }
            this.gameObjects.handleKeyDown(event);
        });

        window.addEventListener('keyup', (event) => {
            this.gameObjects.handleKeyUp(event);
        });

        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;
            this.gameObjects.handleMouseMove(x, y);
        });
    }

    draw() {
        this.viewport.drawGameObjects(this.gameObjects.objects, this.camera);
    }
}