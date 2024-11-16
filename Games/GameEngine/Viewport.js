import { Camera } from './Camera.js';

export class Viewport {
    constructor(canvas, targetAspectRatio = 16 / 9) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.targetAspectRatio = targetAspectRatio;
        this.adjustCanvasResolution();
        window.addEventListener('resize', () => this.adjustCanvasResolution());
    }

    adjustCanvasResolution() {
        const rect = this.canvas.getBoundingClientRect();
        const screenAspectRatio = rect.width / rect.height;

        let newWidth, newHeight;
        if (screenAspectRatio > this.targetAspectRatio) {
            newHeight = rect.height;
            newWidth = newHeight * this.targetAspectRatio;
        } else {
            newWidth = rect.width;
            newHeight = newWidth / this.targetAspectRatio;
        }

        this.canvas.width = newWidth;
        this.canvas.height = newHeight;

        const offsetX = (rect.width - newWidth) / 2;
        const offsetY = (rect.height - newHeight) / 2;

        this.canvas.style.marginTop = `${offsetY}px`;
        this.canvas.style.marginLeft = `${offsetX}px`;
        this.canvas.style.marginRight = `${offsetX}px`;
        this.canvas.style.marginBottom = `${offsetY}px`;
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGameObjects(gameObjects, camera) {
        this.clear();
        this.context.save();

        // Translate to camera position
        this.context.translate(-camera.position.x * camera.zoom + this.canvas.width / 2, -camera.position.y * camera.zoom + this.canvas.height / 2);

        // Rotate around the z-axis
        this.context.rotate(-camera.rotation * Math.PI / 180);

        // Apply zoom
        this.context.scale(camera.zoom, camera.zoom);

        // Sort objects by z-coordinate for correct layering
        gameObjects.sort((a, b) => a.position.z - b.position.z);

        gameObjects.forEach(obj => {
            const transformedPosition = camera.transform(obj.position);
            this.context.fillStyle = obj.color || 'black';
            this.context.fillRect(transformedPosition.x, transformedPosition.y, obj.size.x, obj.size.y);
        });

        this.context.restore();
    }
}