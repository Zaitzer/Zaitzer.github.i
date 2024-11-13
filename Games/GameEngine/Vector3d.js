// Vector3d.js
export class Vector3d {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(other) {
        return new Vector3d(this.x + other.x,
                            this.y + other.y,
                            this.z + other.z);
    }

    subtract(other) {
        return new Vector3d(this.x - other.x,
                            this.y - other.y,
                            this.z - other.z);
    }

    multiply(scalar) {
        return new Vector3d(this.x * scalar,
                            this.y * scalar,
                            this.z * scalar);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x
                        + this.y * this.y
                        + this.z * this.z);
    }

    normalize() {
        const magnitude = this.magnitude();
        return new Vector3d(this.x / magnitude,
                            this.y / magnitude,
                            this.z / magnitude);
    }

    dot(other) {
        return this.x * other.x
             + this.y * other.y
             + this.z * other.z;
    }
}

