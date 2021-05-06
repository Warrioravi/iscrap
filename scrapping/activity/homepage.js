const fs=require("fs");
const request=require("request");
const cheerio=require("cheerio");
//async
// request("https://www.espncricinfo.com/series/ipl-2020-21-1210595",getdata);
//  function getdata(error, response , body){
//      fs.writeFileSync("./homepage.html",body);
//      console.log(body);
//  }
let homepage=fs.readFileSync("./homepage.html");
const ch=cheerio.load(homepage);
const atag=ch(".widget-items.cta-link a");
//
//console.log(atag);
const allReslink="https://www.espncricinfo.com/"+atag['0'].attribs.href;
console.log(allReslink);