
export class GameObject {
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