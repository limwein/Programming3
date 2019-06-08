let express = require("express");
let app = express();

app.get("/", function (req, res) {
    res.send("<h1>Hello world</h1>");
});
app.get("/name/:name", function (req, res) {
    var name = req.params.name;
    res.send("<h1>Hello " + name + "</h1>");
});
app.get("/google", function (req, res) {
    res.redirect("http://google.com");
})
app.get("/google/:search", function (req, res) {
    let search = req.params.search;
    res.redirect("http://google.com/search?q=" + search)
})
app.get("/*", function (req, res) {
    res.send("<h1> 404 not found</h1>");
})
app.listen(3000);

