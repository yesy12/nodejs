const express = require("express");
const app = express();

app.get("/",function(req,res){
  res.send("Olá mundo novo!");
})

app.get("/sobre",function(req,res){
  res.send("Minha pagina sobre")
})

app.get("/blog",function(req,res){
  res.send("Bem vindo ao blog")
  
})

app.get("/ola/:nome/:cargo/:cor/",function(req,res){
  res.send("<h1> Ola: " +req.params.nome +"</h1>"
  +"<h2> Seu cargo é: " +req.params.cargo +"</h2>"
  +"<h3> Sua cor escolhida é: " +req.params.cor +"</h3>");
})





app.listen(8000,function(){
    console.log("Servidor rodando na porta 8000")
});


//localhost:8000