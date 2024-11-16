// Vector2d.js
export class Vector2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Vector2d(this.x + other.x, this.y + other.y);
    }

    subtract(other) {
        return new Vector2d(this.x - other.x, this.y - other.y);
    }

    multiply(scalar) {
        return new Vector2d(this.x * scalar, this.y * scalar);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const magnitude = this.magnitude();
        if (magnitude === 0) return new Vector2d(0, 0);
        return new Vector2d(this.x / magnitude, this.y / magnitude);
    }

    dot(other) {
        return this.x * other.x + this.y * other.y;
    }

    // Additional utility methods
    clone() {
        return new Vector2d(this.x, this.y);
    }
    distanceTo(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    angleTo(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        return Math.atan2(dy, dx);
    }
    
    lerp(other, t) {
        return new Vector2d(
            this.x + (other.x - this.x) * t,
            this.y + (other.y - this.y) * t
        );
    }
}
