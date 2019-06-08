class Predator extends Creature {
    constructor(x, y) {
        super(x, y);
        this.energy = Math.round(Math.random() * 6);
        this.directions = [
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x - 1, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 2],
            [this.x - 1, this.y - 1],
            [this.x - 2, this.y - 2]
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x - 1, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 2],
            [this.x - 1, this.y - 1],
            [this.x - 2, this.y - 2]
        ];
    }
    mul() {
        let emptyCells = this.chooseCell(0);
        if (emptyCells != 0 && this.energy >= 6) {
            let newCell = random(emptyCells);
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            predatorArr.push(new Predator(x, y));
            this.energy = Math.round(Math.random() * 4);
        }
    }
    move() {
        this.energy -= 1;
        let emptyCells = this.chooseCell(0);
        if (emptyCells != 0 && this.energy >= 1) {
            let newCell = random(emptyCells);
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    die() {
        for (let i in predatorArr) {
            if (predatorArr[i].x == this.x && predatorArr[i].y == this.y && predatorArr[i].energy <= 0) {
                predatorArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
    eat() {
        let emptyCells = this.chooseCell(2);
        if (emptyCells != 0 && this.energy >= 1) {
            this.energy += 1;
            let newCell = random(emptyCells);
            let x = newCell[0];
            let y = newCell[1];
            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            matrix[y][x] = 3;
            predatorArr.push(new Predator(x, y));
        }
    }
    poisoneat() {
        let poisonCells = this.chooseCell(4);
        if (poisonCells != 0 && this.energy >= 1) {
            let newCell = random(poisonCells);
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 0;
            for (let i in poisonArr) {
                if (x == poisonArr[i].x && y == poisonArr[i].y) {
                    this.energy += 2;
                    poisonArr.splice(i, 1);
                    break;
                }
            }
        }
    }

}
