# personal

create database personal;

use personal;

create table treino (id_treino int primary key auto_increment, 
                     nome varchar(50),
                     dthrent datetime default current_timestamp);
                     
 
 
 
 create table aula (id_aula int primary key auto_increment, 
					nome varchar(50),
					duracao int,
                    dataAula datetime,
                    diaSemana varchar(20),
                    dthrent datetime default current_timestamp);
                     
 
 
 
 
 create table aluno (id_aluno int primary key auto_increment, 
					nome varchar(50),
					email  varchar(30),
                    sexo varchar(1),
                    dataNascimento datetime,
                    profissao varchar(100),
                    telefoneResidencial varchar(20),
					telefoneComercial varchar(20),
					telefoneCelular varchar(20),
                    Hora numeric(12,2),
                    ajuste numeric(12,2),
                    dthrent datetime default current_timestamp);
                     
 
 
 create table aluno_treino (id_aluno_treino int primary key auto_increment,
                            id_treino int,
                            id_aluno int )
                             
 
 
 
