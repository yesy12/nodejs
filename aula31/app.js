//Modulos
  const express = require("express");
  const handlebars = require("express-handlebars");
  const bodyParser = require("body-parser");
  const app = express();
  //rotas com configurações admin
  const admin = require("./routes/admin")
  const path = require("path")
  const mongoose = require("mongoose");
  const session = require("express-session");
  const flash = require("connect-flash");
  require("./models/Postagem")
  require("./models/Categoria")
  const Postagem = mongoose.model("postagens")
  const Categoria = mongoose.model("categorias")  
//Config
  //Session
    app.use(session({
      secret:"nodejs",
      resave:true,
      saveUninitialized:true
    }))
    app.use(flash());
    
  //Middleware
    app.use(function(req,res,next){
      res.locals.success_msg = req.flash("success_msg");
      //variaveis globais
      res.locals.error_msg = req.flash("error_msg");
      next();
    })
    
  //body-parser
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    
  //Handlebars
    app.engine("handlebars",handlebars({defaultLayout:"main"}))
    app.set("view engine","handlebars")
    
  //Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/blogapp",   {useNewUrlParser: true }).
    then(function(){
      console.log("Conectado ao MongoDB")
    }).catch(function(error){
      console.log("ERRO: "+error)
    })
    
  //Public
    app.use(express.static(path.join(__dirname,"public/") ))
    //Onde os arquivos js,e css se encontram
    

//Rotas
  //Rotas do Caminho normal
  app.get("/",function(req,res){
    Postagem.find().populate("categoria").sort({
      date:"desc"
    })
    .then(function(postagens) {
      res.render("index",{
        postagens:postagens
      })
    })
    .catch(function(error){
      req.flash("error_msg","Houve um erro interno")
      res.redirect("/404")
    })
  })
  
  app.get("/404",function(req,res){
    res.send("Erro 404")  
  })
  
  app.get("/postagem/:slug",function(req,res){
    Postagem.findOne({
      slug:req.params.slug
    }).populate("categoria")
    .then(function(postagem){
      if(postagem){
        res.render("postagem/index",{
          postagem:postagem
        })
      }
      else{
        req.flash("error_msg","Esta postagem não existe")
        res.redirect("/")
      }
    })
    .catch(function(error){
      req.flash("error_msg","Erro interno")
      res.redirect("/")
    })
  })
  
  app.get("/postagens",function(req,res){
    res.send("Lista de Posts")
  })
  
  app.get("/categorias",function(req,res){
    res.send("Lista de Categorias")
  })
  
  //Rotas do caminhos Admin
  app.use("/admin",admin);
  
  
//Outros
  const port = 9000; 
  app.listen(port,function(){
    console.log("Rodando na porta "+port)
  })