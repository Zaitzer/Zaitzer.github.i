// GameObject.js
import { Vector3d } from "./Vector3d.js";
import { Logger } from "./Logger.js";

export class GameObject {
    // Enums encapsulated within the class
    static physicsMode = {
        NONE: 0,   // Does not partake in physics
        SIMPLE: 1, // Simple physics
        STATIC: 2  // Static objects collide but do not move
    };

    static collisionBox = {
        NONE: 0,
        RECTANGLE: 1,
        CIRCLE: 2
    };

    static clickableArea = {
        NONE: 0,
        RECTANGLE: 1
    };

    constructor() {
        // Position and size for click detection
        this.physicsMode = GameObject.physicsMode.NONE;
        this.position = new Vector3d(0, 0, 0); // Game world coordinates
        this.velocity = new Vector3d(0, 0, 0);
        this.acceleration = new Vector3d(0, 0, 0);
        this.collisionBox = GameObject.collisionBox.NONE;
        this.clickableArea = GameObject.clickableArea.NONE;
        this.size = new Vector3d(0, 0, 0); // Size of the object for collision detection
        this.isDestroyed = false; // Flag to mark object for removal
    }

    draw(context) { }

    update(deltaTime, canvas) {
        if (this.physicsMode === GameObject.physicsMode.SIMPLE) {
            // Update velocity with acceleration
            this.velocity.x += this.acceleration.x * deltaTime;
            this.velocity.y += this.acceleration.y * deltaTime;

            // Update position with velocity
            this.position.x += this.velocity.x * deltaTime;
            this.position.y += this.velocity.y * deltaTime;
        }
    }


    onClick(x, y) { }

    containsPoint(x, y) {
        switch (this.collisionBox) {
            case GameObject.collisionBox.RECTANGLE:
                return (
                    x >= this.position.x &&
                    x <= this.position.x + this.size.x &&
                    y >= this.position.y &&
                    y <= this.position.y + this.size.y
                );
            case GameObject.collisionBox.CIRCLE:
                const dx = x - (this.position.x + this.size.x / 2);
                const dy = y - (this.position.y + this.size.y / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                const radius = this.size.x / 2; // Assuming size.x == size.y
                return distance <= radius;
            default:
                return false;
        }
    }

    // Event handlers
    handleKeyDown(event) { }
    handleKeyUp(event) { }
    handleMouseMove(x, y) { }
}
