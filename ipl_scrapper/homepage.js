const request=require("request");
const cheerio= require("cheerio");
 request("https://www.espncricinfo.com/series/ipl-2020-21-1210595",function(error,response,data){
     processData(data);
 });
 function processData(html){
    let ch=cheerio.load(html);
    let aTag= ch(".widget-items.cta-link a");
    let allMatchesLink="https://www.espncricinfo.com"+aTag.attr("href");
    console.log(allMatchesLink);
 }
