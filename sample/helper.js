//const name = "Mike";
const fs = require('fs');

const person ={
    name:"Mike",
    age : 30
}
const read = function(){
     fs.readFile("./sample.json",'utf8',function(err,data){
         const person = JSON.parse(data);
        console.log(person.name);
     });
};
const write = function(){
     fs.writeFile("sample.json", JSON.stringify(person), function(){
      console.log("書き出し完了")
     });

};

module.exports = {
    read: read,
    write: write
};
