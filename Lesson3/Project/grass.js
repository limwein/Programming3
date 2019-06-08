class Grass extends Creature {
    constructor(x, y) {
        super(x, y);
        this.multiply = Math.round(Math.random() * 3);
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
    mul() {
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let randomCell = random(emptyCells);
        if (emptyCells != 0 && this.multiply >= 4) {
            let x = randomCell[0];
            let y = randomCell[1];
            grassArr.push(new Grass(x, y));
            matrix[y][x] = 1;
            this.multiply = 0;
        }
    }
}


