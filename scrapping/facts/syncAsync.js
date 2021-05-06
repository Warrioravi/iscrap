const fs=require("fs");

console.log("start");
//readfile is a asyncronous function
fs.readFile("./t1.txt",giveBackData);//giveBackData is a callback function


function giveBackData(error , data){
    console.log('inside callback function');
    console.log(data+"");
}

console.log('im outside');
console.log('still outside');
console.log('outside with friends');
while(true){
    //stack willl be busy forever due to this infinite loop
}
