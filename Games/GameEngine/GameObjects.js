// GameObjects.js
import { Logger } from "./Logger.js";

export class GameObjects {
    constructor() {
        Logger.INFO("Creating GameObjects");
        this.objects = [];
    }

    add(gameObject) {
        this.objects.push(gameObject);
    }

    remove(gameObject) {
        this.objects = this.objects.filter(obj => obj !== gameObject);
    }

    update(deltaTime, canvas) {
        for (let i = this.objects.length - 1; i >= 0; i--) {
            const obj = this.objects[i];
            obj.update(deltaTime, canvas);

            // Remove object if marked for destruction
            if (obj.isDestroyed) {
                this.objects.splice(i, 1);
            }
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

    handleKeyDown(event) {
        for (const obj of this.objects) {
            if (obj.handleKeyDown) {
                obj.handleKeyDown(event);
            }
        }
    }

    handleKeyUp(event) {
        for (const obj of this.objects) {
            if (obj.handleKeyUp) {
                obj.handleKeyUp(event);
            }
        }
    }

    handleMouseMove(x, y) {
        for (const obj of this.objects) {
            if (obj.handleMouseMove) {
                obj.handleMouseMove(x, y);
            }
        }
    }
}
