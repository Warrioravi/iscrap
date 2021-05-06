const fs = require("fs");
const cheerio =require("cheerio");


let htmldata=fs.readFileSync("./index.html");
//console.log(htmldata) returns data as buffer
let ch=cheerio.load(htmldata);

//Scraping list objects
let ptag=ch("p");
//{
//    
//}
let lastptag=ch(ptag["2"]).text();
//console.log(lastptag);

//if you want tofind the content of those p's which are inside list
let pInsideLi=ch("ul li p").text();//specifically those who are under ul and then under li and then under p
//console.log(pInsideLi);
pInsideLi=ch("ul p").text();// all children named p under ul
//console.log(pInsideLi);
pInsideLi=ch("ul>p").text();//only immediate children
//console.log(pInsideLi);
let elementsWithClassText= ch(".text").text();
//console.log(elementsWithClassText);
let elementsWithmultipleClass= ch(".text.main").text();//elements with multiple classes
//console.log(elementsWithmultipleClass);//classes => multiple element pe sme classes => to style same set of elements


 let pTagusingID=ch("#unique").text();//selecting using id selector
 console.log(pTagusingID);


