let Creature = require("./creature");
var random = require("./random");
module.exports = class PoisyGrass extends Creature {
    constructor(x, y) {
        super(x, y);
        this.multiply = Math.round(Math.random() * 1);
        this.counter = 0;
        this.index = 5;
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
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character)
                    found.push(this.directions[i]);
            }
        }
        return found;
    }
    piu() {
        this.multiply += 1;
        let grassCells = this.chooseCell(1).concat(this.chooseCell(2));
        if (grassCells.length != 0) {
            for (let i in grassCells) {
                let x = grassCells[i][0];
                let y = grassCells[i][1];
                for (let i in grassArr) {
                    if (grassArr[i].x == x && grassArr[i].y == y) {
                        grassArr.splice(i, 1);
                        matrix[y][x] = 0;
                        break;
                    }
                }
            }
        }
    }
    die() {
        for (let i in poisonArr) {
            if (poisonArr[i].x == this.x && poisonArr[i].y == this.y && poisonArr[i].counter >= 30) {
                poisonArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
    mul() {
        this.counter++;
        let emptyCells = this.chooseCell(0);
        let randomCell = random(emptyCells);
        if (emptyCells != 0 && this.multiply >= 4 && poisonArr.length <= (3 / 25 * (matrix.length * matrix.length))) {
            let x = randomCell[0];
            let y = randomCell[1];
            poisonArr.push(new PoisyGrass(x, y));
            matrix[y][x] = 4;
            this.multiply = 0;
        }

    }
}