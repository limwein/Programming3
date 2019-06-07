let express = require("express");
let app = express();

app.get("/", function(req,res){
    res.send("<h1>Hello world</h1>");
});
app.get("/name/:name", function(req,res){
    let name = req.params.name;
    res.send("<h1>Hello "+ name +"</h1>");
});
app.get("/3000/name/Vardan", function(req,res){
    res.send("<h1>Hello world</h1>");
});

app.listen(3000, function(){
    console.log("Example is running on port 3000");
});

app.use(express.static("./"));