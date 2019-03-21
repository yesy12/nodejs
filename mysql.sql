create database sistemaDeCadastro;

use database sistemaDeCadastro;

create table usuarios(
	id int not null auto_increment ,
	nome varchar(50) not null,
	email varchar(100) not null,
	idade int null,
	primary key(id)
);
