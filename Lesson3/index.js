let fs = require("fs");

function test() {
    fs.writeFileSync("hello.txt", "hello world \n", function (err) {
        console.log("fswriteFile ended");
    });
    console.log("writefile");
}

let dummytext = "Apple yep";

function main() {
    fs.writeFileSync("dummytext.txt", dummytext);
    let text = fs.readFileSync("dummytext.txt").toString();
    console.log(dummytext == text);
    console.log(text);
    fs.writeFileSync("undummytext.txt",
        text.replace("Apple", "Microsoft"));
}

let obj = {
    "first_name" : "Vardan",
    "last_name" : "Arevshatyan",
    "age" : 19,
    "tumo_student" : true
}

function create() {
    fs.writeFileSync("obj.json", JSON.stringify(obj));
}
create();