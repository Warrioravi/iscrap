const request= require('request');
const cheerio=require('cheerio');
const getMatchDetails=require('./match');

function getAllMatches(link){
    request(link , function(error, response, data){
        processData(data);
    })
    console.log("Inside get all matches !!!");
}
function processData(html){
    //get links of all the matches
    let ch=cheerio.load(html);
    let allaTags= ch('a[data-hover="Scorecard"]');
    console.log(allaTags.length);
    for (let i = 0; i < allaTags.length; i++){
     let matchlink="https://www.espncricinfo.com"+ch(allaTags[i]).attr("href");
     getMatchDetails(matchlink);       
    }
}
//node js feature
module.exports =getAllMatches;