import { Vector2d } from "./Vector2d.js";
import { Vector3d } from "./Vector3d.js";
import { Logger } from "./Logger.js";

export class Camera {
    constructor(screenWidth = 800, screenHeight = 600) {
        Logger.INFO("Creating Camera");
        this.screenSize = new Vector2d(screenWidth, screenHeight); // Width and height of the screen
        this.position = new Vector3d(0, 0, 0); // Game world coordinates (centered at the origin)
        this.rotation = 0; // Rotation around the z-axis in degrees
        this.zoom = 1; // Zoom level
    }

    setScreenSize(width, height) {
        this.screenSize = new Vector2d(width, height);
    }

    transform(point) {
        // Translate to camera position
        let translated = point.subtract(this.position);

        // Rotate around the z-axis
        const cosZ = Math.cos(-this.rotation * Math.PI / 180);
        const sinZ = Math.sin(-this.rotation * Math.PI / 180);
        const rotatedX = translated.x * cosZ - translated.y * sinZ;
        const rotatedY = translated.x * sinZ + translated.y * cosZ;

        // Apply zoom
        const zoomedX = rotatedX * this.zoom;
        const zoomedY = rotatedY * this.zoom;

        return new Vector3d(zoomedX, zoomedY, translated.z);
    }
}