const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

/*
  O req.flash não funcionava porque estava em modo 
  de eventLoop do node, e o node executa tudo que esteja
  fora do eventLoop primeiro.No caso era res.redirect()
*/

router.get("/",function(req,res){
  res.render("admin/index")
})

router.get("/postagens",function(req,res){
  res.render("admin/postagens")
})

router.get("/postagens/add",function(req,res){
  Categoria.find().sort({
    date:"desc"
  })
  .then(function(categorias){
    res.render("admin/add-postagens",{
      categorias,
    })
  })
  .catch(function(error){
    req.flash("error_msg","Aconteceu um erro ao criar categorias")
    res.redirect("/admin/postagens")
  })
})

router.post("/postagens/nova",function(req,res){
  
  const titulo = req.body.titulo;
  const categoriaPostagem = req.body.categoriaPostagem;
  const slugPostagem = req.body.slugPostagem;
  const slugPostagemCompleto = req.body.slugPostagemCompleto;
  const descricaoPostagem = req.body.descricaoPostagem;
  const conteudoPostagem = req.body.conteudoPostagem;
  
  var erros = [];
  
  if(!titulo || typeof titulo == undefined || titulo == null){
    erros.push({
      texto:"Título Inválido"
    })
  }
  
  if( titulo.length < 10){
    erros.push({
      texto:"Título muito pequeno"
    })  
  }
  
  if(!categoriaPostagem || typeof categoriaPostagem == undefined || categoriaPostagem == null){
      erros.push({
        texto:"Categoria Inválida"
    })
  }
  
    Categoria.find({
      slug:categoriaPostagem
    })
    .then(function(categoria){
      
    })
    .catch(function(error){
      erros.push({
        texto:"Categoria não existe"
      })
    })
  
  /*
  if(erros.length > 0){
    Categoria.find().sort({
      date:"desc"
    })
    .then(function(categorias){
      res.render("admin/add-postagens",{
        erros,
        categorias,
      })
    })
  }
  else{
    res.send(req.body)
  }
  */
})

router.get("/categorias",function(req,res){
  Categoria.find().sort({
    date:"desc"
  }).
  then(function(categorias){
     res.render("admin/categorias",{
       categorias:categorias
     })
  })
  .catch(function(error){
    req.flash("error_msg","Houve um erro ao entra na categorias")
    console.log("Erro: "+error)
    res.redirect("/admin/")
  })
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
    //Dados a serem salvos 
    
    new Categoria(novaCategoria).save().//Salvando no Db
    then(function(){
      req.flash("success_msg","Categoria salva com sucesso");
      res.redirect("/admin/categorias")
    }).
    catch(function(error){
      req.flash("error_msg","Houve um erro ao criar a categoria,tente novamente mais tarde")
      console.log("erro: "+error)
      res.redirect("/admin/categorias")
    })
  }
})

router.get("/categorias/editar/:id",function(req,res){
  Categoria.findOne({
    _id:req.params.id
  }).then(function(categoria){
    res.render("admin/edit-categorias",{
      categoria:categoria
    })
  }).catch(function(error){
    console.log("ERRO: "+error)
    req.flash("error_msg","Categoria Invalida")
    res.redirect("/admin/categorias")
  })
  
})

router.post("/categorias/edit",function(req,res){
  
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
    Categoria.findOne({
      _id:req.body.id
    }).then(function(categoria){
      categoria.nome = nome
      categoria.slug = slug
      
      categoria.save().then(function(){
        req.flash("success_msg","Editado com sucesso")
        res.redirect("/admin/categorias")
      })
      .catch(function(error){
        req.flash("error_msg","Houve um erro ao salvar a edição")
        res.redirect("/admin/categorias")
      })
    }).catch(function(error){
      req.flash("error_msg","Houve um erro ao editar")
      res.redirect("/admin/categorias")
    })
  }
})

router.get("/categorias/delete/:id",function(req,res){
  Categoria.findOne({
    _id:req.params.id
  }).
  then(function(categoria){
    res.render("admin/delete-categorias",{
      categoria:categoria
    })
  })
  .catch(function(error){
    req.flash("error_msg","Provavelmente essa categoria não existe")
    res.redirect("admin/categorias")
  })
})

router.post("/categorias/delete",function(req,res){
  const id = req.body.id
  const excluir = req.body.excluir
  
  var erros = [];
  
  if(excluir == "nao"){
    req.flash("error_msg","Categoria não foi apagada")
    res.redirect("/admin/categorias")
  }
  else if(excluir == null || !excluir || typeof excluir == undefined){
    erros.push({
      texto:"Decisão excluir invalida"
    })
  }
  
  if(erros.length > 0){
    Categoria.findOne({
      _id:id
    })
    .then(function(categoria){
      res.render("admin/delete-categorias",{
        erros,
        categoria,
      })
    })
    .catch(function(error){
      req.flash("error_msg","Acabou acontecendo um erro")
      res.redirect("/admin/categoria")
    })
  }
  else if(excluir == "sim"){
    Categoria.deleteOne({
      _id:id
    })
    .then(function(categoria){
      req.flash("success_msg","Categoria apagada com sucesso")
      res.redirect("/admin/categorias")
    })
    .catch(function(error){
      req.flash("error_msg","Erro ao apagar a categoria")
      res.redirect("/admin/categorias")
    })
  }
})

module.exports = router;