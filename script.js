let randomMatrix = (n) => {
    let matrix = [];
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = Math.round(Math.random() * 3);
            if (matrix[i][j] == 3) {
                let vr1 = Math.random();
                matrix[i][j] = vr1 >= 0.95 ? 3 : 1;
            }
            if (matrix[i][j] == 2) {
                let vr2 = Math.random();
                matrix[i][j] = vr2 >= 0.6 ? 2 : 0;
            }
            if (matrix[i][j] == 1) {
                let vr2 = Math.random();
                matrix[i][j] = vr2 >= 0.5 ? 1 : 0;
            }
        }
    }

    return matrix;
}
let matrix = randomMatrix(30);
let side = 10;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let beastArr = [];
let poisonArr = [];
function setup() {
    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y));
            }
        }
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            if (matrix[y][x] == 2) {
                grassEaterArr.push(new GrassEater(x, y));
            }
        }
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            if (matrix[y][x] == 3) {
                predatorArr.push(new Predator(x, y));
            }
        }
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            if (matrix[y][x] == 5) {
                beastArr.push(new Beast(x, y));
            }
        }
    }
}
function draw() {
    drawMatrix();
    let s0 = matrix.length * matrix.length / 2;
    let s1 = matrix.length / 7;
    if ((grassArr.length > s0 || predatorArr.length < s1) && beastArr.length == 0) {
        let x = Math.round(Math.random() * (matrix.length - 1));
        let y = Math.round(Math.random() * (matrix.length - 1));
        for (let i = 0; i < grassArr.length; i++) {
            if (grassArr[i].x == x && grassArr[i].y == y) {
                grassArr.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < predatorArr.length; i++) {
            if (predatorArr[i].x == x && predatorArr[i].y == y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
        beastArr.push(new Beast(x, y));
        matrix[y][x] = 5;
    }
    let m1 = 3 / 25 * matrix.length * matrix.length;
    let m0 = matrix.length * matrix.length / 3;
    if (grassArr.length > m0 && poisonArr.length <= m1) {
        let x = Math.round(Math.random() * (matrix.length - 1));
        let y = Math.round(Math.random() * (matrix.length - 1));
        if (beastArr.length != 0 && x != beastArr[0].x && y != beastArr[0].y) {
            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < predatorArr.length; i++) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            poisonArr.push(new Poisygrass(x, y));
            matrix[y][x] = 4;
        }
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].move();
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
        grassEaterArr[i].poisoneat();
        grassEaterArr[i].die();
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].move();
        predatorArr[i].mul();
        predatorArr[i].poisoneat();
        predatorArr[i].eat();
        predatorArr[i].die();


    }
    for (let i = 0; i < beastArr.length; i++) {
        if (grassArr.length > m0) {
            beastArr[i].move();
            beastArr[i].create();
            beastArr[i].grasseat();
            beastArr[i].grassdestroyer();
            beastArr[i].predatoreat();
        }
        else {
            beastArr[i].move();
            beastArr[i].create();
            beastArr[i].eat();
            beastArr[i].predatoreat();
        }
    }
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    if (poisonArr.length != 0) {
        for (let i = 0; i < poisonArr.length; i++) {
            poisonArr[i].piu();
            poisonArr[i].mul();
            poisonArr[i].die();
        }
    }

}

function drawMatrix() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("#F43838");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
        }
    }
}