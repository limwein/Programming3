class GrassEater extends Creature {
    constructor(x, y) {
        super(x, y);
        this.energy = Math.round(Math.random() * 7);
        this.index = 2;
        this.directions = [
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
    getNewCoordinates() {
        this.directions = [
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
    mul() {
        let emptyCells = this.chooseCell(0);
        if (emptyCells != 0 && this.energy >= 6) {
            let newCell = random(emptyCells);
            let x = newCell[0];
            let y = newCell[1];
            grassEaterArr.push(new GrassEater(x, y));
            matrix[y][x] = 2;
            this.energy = Math.round(Math.random() * 4);
        }
    }
    eat() {
        let emptyCells = this.chooseCell(1);
        if (emptyCells != 0 && this.energy >= 1) {
            let newCell = random(emptyCells);
            let x = newCell[0];
            let y = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[y][x] = 2;
            this.x = x;
            this.y = y;
            for (let i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.energy += 2;
        }
    }
    poisoneat() {
        let poisonCells = this.chooseCell(4);
        if (poisonCells != 0 && this.energy >= 1) {
            let newCell = random(poisonCells);
            let x = newCell[0];
            let y = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[y][x] = 0;
            for (let i in poisonArr) {
                if (x == poisonArr[i].x && y == poisonArr[i].y) {
                    poisonArr.splice(i, 1);
                    break;
                }
            }
            for (let i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
    move() {
        let emptyCells = this.chooseCell(0);
        if (emptyCells != 0 && this.energy > 0) {
            let newCell = random(emptyCells);
            let x = newCell[0];
            let y = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[y][x] = 2;
            this.x = x;
            this.y = y;
            this.energy--;
        }

    }
    die() {
        for (let i in grassEaterArr) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y && this.energy <= 0) {
                grassEaterArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
}