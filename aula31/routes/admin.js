const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

router.get("/",function(req,res){
  res.render("admin/index")
})

router.get("/posts",function(req,res){
  res.send("Página de POSTS")
})

router.get("/categorias",function(req,res){
  res.render("admin/categorias")
})

router.get("/categorias/add",function(req,res){
  res.render("admin/add-categorias")
})

router.post("/categorias/nova",function(req,res){
  
  const nome = req.body.nome
  const slug = req.body.slug
  
  var erros = [];
  
  if(!nome || typeof nome == undefined || nome == null){
    erros.push({
      texto:"Nome Inválido"
    })
  }
  
  if(nome.length >0 && nome.length< 3){
    erros.push({
      texto:"Nome da categoria muito pequeno"
    })
  }
  
  if(!slug || typeof slug == undefined || slug == null){
    erros.push({
      texto:"Slug Inválido"
    })
  }
  
  if(erros.length > 0){
    res.render("admin/add-categorias",{
      erros,
    })
  }
  else{ 
    const novaCategoria = {
      nome,
      slug
    }
    new Categoria(novaCategoria).save().//Salvando no Db
    then(function(){
      req.flash('success_msg',"Categoria salva com sucesso");
    }).catch(function(error){
      req.flash("error_msg","Houve um erro ao criar a categoria,tente novamente mais tarde")
      console.log("erro: "+error)
    })
    res.redirect("/admin/categorias");
  }
})

module.exports = router