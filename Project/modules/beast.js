let Creature = require("./creature");
let random = require("./random");
module.exports = class Beast extends Creature {
    constructor(x, y) {
        super(x, y);
        this.energy = 0;
        this.index = 4;
        this.directions = [
            [this.x, this.y + 2],
            [this.x, this.y - 2],
            [this.x - 1, this.y + 2],
            [this.x - 1, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x, this.y + 2],
            [this.x, this.y - 2],
            [this.x - 1, this.y + 2],
            [this.x - 1, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
        ];
    }
    move() {
        this.getNewCoordinates();
        let emptyCells = this.chooseCell(0);
        if (emptyCells != 0) {
            let newCell = random(emptyCells);
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    eat() {
        this.getNewCoordinates();
        let emptyCells = this.chooseCell(1).concat(this.chooseCell(2));
        if (emptyCells != 0) {
            this.energy += 2;
            let newCell = random(emptyCells);
            let x = newCell[0];
            let y = newCell[1];
            for (let i in grassArr) {
                if (grassArr[i].x === x && grassArr[i].y === y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x === x && grassEaterArr[i].y === y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    create() {
        this.getNewCoordinates(0);
        let emptyCells = this.chooseCell(0);
        if (emptyCells != 0 && this.energy >= 10) {
            let newCell = random(emptyCells);
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            predatorArr.push(new Predator(x, y));
            this.energy = 0;
        }
    }
    grasseat() {
        this.getNewCoordinates();
        let emptyCells = this.chooseCell(1);
        if (emptyCells != 0) {
            this.energy += 1;
            let newCell = random(emptyCells);
            let x = newCell[0];
            let y = newCell[1];
            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    predatoreat() {
        this.getNewCoordinates();
        let emptyCells = this.chooseCell(3);
        if (emptyCells != 0 && predatorArr.length > matrix.length / 6) {
            this.energy += 1;
            let newCell = random(emptyCells);
            let x = newCell[0];
            let y = newCell[1];
            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    grassdestroyer() {
        this.getNewCoordinates();
        let emptyCells = this.chooseCell(1);
        if (emptyCells != 0) {
            let newCell = random(emptyCells);
            let x = newCell[0];
            let y = newCell[1];
            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            matrix[y][x] = 2;
            grassEaterArr.push(new GrassEater(x, y));
        }
    }

}


