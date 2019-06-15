function setup() {
    
    var socket = io();

    var side = 30;
    
    var matrix = [];

    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountELement = document.getElementById("predatorCount");
    let poisyGrassCountElement = document.getElementById("poisyGrassCount");
    let beastCountElement = document.getElementById("beast.js");

    socket.on("data", draw);
    function draw(data) {
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEater;
        predatorCountELement.innerText = data.predator;
        poisyGrassCountElement.innerText = data.poisyGrass;
        beastCountElement.innerText = data.beast;

        createCanvas(matrix[0].length * side, matrix.length * side)
        background('#acacac');
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
}