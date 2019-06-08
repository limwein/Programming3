let express = require("express");
let app = express();

app.use(express.static("Project"));
app.get("/", function (req, res) {
    res.redirect("/index.html");
})
app.listen(3000);