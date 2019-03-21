const express = require("express");
const app = express();

app.get("/",function(req,res){
  res.send("Olá mundo!");
})

app.get("/sobre",function(req,res){
  res.send("Minha pagina sobre")
})

app.get("/blog",function(req,res){
  res.send("Bem vindo ao blog")
  
})

app.listen(8000,function(){
    console.log("Servidor rodando na porta 8000")
});


//localhost:8000