const fs = require('fs');
let htmldata=fs.readFileSync("./index.html");
//console.log(htmldata) returns data as buffer
console.log(htmldata+"");//converted into string
// file =>
