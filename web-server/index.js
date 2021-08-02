const express = require('express')
const path = require("path");
const app = express()
//console.log(__dirname);
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"public")));
 
//app.get("/", function (req, res) {
    //console.log(req);
  //res.send("<h1>トップページ!!!</h1>")
//});
app.post("/api/v1/quiz", function (req, res) {
    const answer = req.body.answer;
    if(answer=== "2"){
        //res.send("<h1>正解</h1>");
        res.redirect("/correct.html");
    } else{
        //res.send("<h1>不正解</h1>");
        res.redirect("/wrong.html");
     }    

    
});
app.get("/api/v1/users", function (req, res) {

    res.send({
        name:"Mike",
        age:30
    });

    
});
app.listen(3000,function(){
    console.log("I am running!")
});
console.log("最終行");