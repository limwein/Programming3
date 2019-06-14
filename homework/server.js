var express = require("express");
var app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let coordinates = [];

app.use(express.static("."));
app.get("/", function (req, res) {
    res.redirect("index.html");
})
server.listen(3000);
io.on('connection', function (socket) {
    for (var i in coordinates) {
        io.sockets.emit("display message", coordinates[i]);
    }
    socket.on("send message", function (data) {
        coordinates.push(data);
        io.sockets.emit("display message", data);
    });
});

