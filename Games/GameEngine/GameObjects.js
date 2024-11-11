
export class GameObjects {
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
