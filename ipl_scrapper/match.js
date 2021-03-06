const cheerio = require('cheerio');
const fs= require("fs");
const request = require('request');
function getMatchDetails(link){
 request(link,function(error,response,data){
  processData(data);
 })
}
 function processData(html){
     let ch=cheerio.load(html);
     //now lets get team names of both the teams
    let bothInnings=ch('.Collapsible');
      //{div class="collapsibe"></div>}
      for(let i=0;i<bothInnings.length;i++){
          let teamName=ch(bothInnings[i]).find("h5").text();
          teamName=teamName.split("INNINGS")[0].trim();
          console.log(teamName);
          //there are two tables batsman and bowler
          //lets work on batsman table
          let allTrs=ch(bothInnings[i]).find(".table.batsman tbody tr");
          for(let j=0;j<allTrs.length-1;j++){
              let allTds=ch(allTrs[j]).find("td");//getting all table data 
              if(allTds.length>1){
                  let batsmanName=ch(allTds[0]).find("a").text().trim();
                  let runs=ch(allTds[2]).text().trim();
                  let balls=ch(allTds[3]).text().trim();
                  let fours=ch(allTds[5]).text().trim();
                  let sixes=ch(allTds[6]).text().trim();
                  //console.log(`Batsman = ${batsmanName} Runs= ${runs} balls= ${balls} fours= ${fours} sixes= ${sixes}`);
                  processDetails(teamName,batsmanName,runs,balls,fours,sixes);
              }
            }
        }
      console.log("################################");
 }
 function processDetails(teamName,batsmanName,runs,balls,fours,sixes){
     let teamFolderExist= checkTeamFolder(teamName);
     if(teamFolderExist){
        let batsmanFileExist = checkBatsmanFile(teamName, batsmanName );
        if(batsmanFileExist){
           updateBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes);
        }
        else{
        createBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes);
        }
     }
     else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes);
     }
 }
 function checkTeamFolder(teamName){
     let teamPath=`./IPL/${teamName}`;
     return fs.existsSync(teamPath);
 }
 function checkBatsmanFile(teamName,batsmanName){
    let batsmanPath=`./IPL/${teamName}/${batsmanName}.json` ;
    return fs.existsSync(batsmanPath);
 }
 function createTeamFolder(teamName){
     let teamPath=`./IPL/${teamName}`;
     fs.mkdirSync(teamPath);
 }
 function updateBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes){
    let batsmanFilePath=`./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile= fs.readFileSync(batsmanFilePath);
    //stringified jon object
    //before working on stringified json object convert it to original form
    batsmanFile=JSON.parse(batsmanFile);
    let inning= {
        Runs:runs,
        Balls:balls,
        Fours:fours,
        Sixes:sixes
    } 
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanFilePath,JSON.stringify(batsmanFile));

 }
 function createBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes){
    let batsmanFilePath=`./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile=[];
    let inning= {
        Runs:runs,
        Balls:balls,
        Fours:fours,
        Sixes:sixes
    } 
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanFilePath,JSON.stringify(batsmanFile));
 }


























 module.exports =getMatchDetails;