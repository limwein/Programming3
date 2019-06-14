var Grass = require("./modules/grass.js");
var GrassEater = require("./modules/grassEater.js");
var Predator = require("./modules/predator.js");
var PoisyGrass = require("./modules/poisyGrass.js");
var Beast = require("./modules/beast.js");
var random = require('./modules/random');

grassArr = [];
grassEaterArr = [];
predatorArr = [];
poisyGrassArr = [];
beastArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
poisyGrassHashiv = 0;
beastHashiv = 0;

function matrixGenerator(matrixSize, grassArr, grassEaterArr, predatorArr, poisyGrassArr, beastArr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let j = 0; j < matrixSize; j++) {
            matrix[i][j] = Math.round(random(3));
        }
    for (let i = 0; i < grassArr; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEaterArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predatorArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < poisyGrassArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < beastArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
}