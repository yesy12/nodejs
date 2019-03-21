const Sequelize = require("sequelize");
const sequelize = new Sequelize("teste","root","",{
  host:"localhost",
  dialect:"mysql",
});
//db,user,password,{host,type_db}

/*
sequelize.authenticate().then(function(){
  console.log("DEU CERTO")
})

.catch(function(erro){
  console.log("DEU ERRADO: "+erro)
})*/

//Postagem

const Postagem = sequelize.define("postagens",{
  titulo:{
    type:Sequelize.STRING
  },
  conteudo:{
    type:Sequelize.TEXT
  }
})

//Cria tabela
//Postagem.sync({force:true});

//Inserir na tabela
/*Postagem.create({
  titulo:"fdgg",
  conteudo:"fgdggddhjjjjjjjjjjjjjjjjjs"
})*/

const Usuario = sequelize.define("usuarios",{
  nome:{
    type:Sequelize.STRING
  },
  sobrenome:{
    type:Sequelize.STRING 
  },
  idade:{
    type:Sequelize.INTEGER
  },
  email:{
    type:Sequelize.STRING
  }
})

Usuario.create({
  nome:"Alison",
  sobrenome:"Vieira",
  idade:18,
  email:"alisonvieira728@yahoo.com.br"
})

//Usuario.sync({force:true});