// Vector3d.js
export class Vector3d {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(other) {
        return new Vector3d(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z
        );
    }

    subtract(other) {
        return new Vector3d(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z
        );
    }

    multiply(scalar) {
        return new Vector3d(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar
        );
    }

    magnitude() {
        return Math.sqrt(
            this.x * this.x +
            this.y * this.y +
            this.z * this.z
        );
    }

    normalize() {
        const magnitude = this.magnitude();
        if (magnitude === 0) return new Vector3d(0, 0, 0);
        return new Vector3d(
            this.x / magnitude,
            this.y / magnitude,
            this.z / magnitude
        );
    }

    dot(other) {
        return (
            this.x * other.x +
            this.y * other.y +
            this.z * other.z
        );
    }

    // Cross product
    cross(other) {
        return new Vector3d(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x
        );
    }

    // Additional utility methods
    clone() {
        return new Vector3d(this.x, this.y, this.z);
    }

    distanceTo(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    
    angleTo(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const dz = other.z - this.z;
        return Math.atan2(Math.sqrt(dy * dy + dz * dz), dx);
    }
    
    lerp(other, t) {
        return new Vector3d(
            this.x + (other.x - this.x) * t,
            this.y + (other.y - this.y) * t,
            this.z + (other.z - this.z) * t
        );
    }

}
