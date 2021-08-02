
const {read,write}= require("./helper");
console.log("start");
//fs.writeFile("sample.txt", "hello world", function(){
 //   console.log("書き出し完了")
//}
//);

//fs.readFile("./sample.txt",'utf8',function(err,data){
 //   console.log(data);
//});

//console.log(process.argv[2]);
const request = process.argv[2];
if(request === "read"){
    read();
    //fs.readFile("./sample.txt",'utf8',function(err,data){
    //    console.log(data);
    //});
}else if(request ==="write"){
    write();
   // fs.writeFile("sample.txt", "hello world", function(){
   //     console.log("書き出し完了")
 // });
}else{
    console.error("エラー:readまたはwriteの引数を入れてください")
}
console.log("end");
