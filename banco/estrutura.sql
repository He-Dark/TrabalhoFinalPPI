create database TrabalhoFinalPPI;

use TrabalhoFinalPPI;

create table if not exists clientes(
	id int not null primary key auto_increment,
    cli_cpf varchar(200) not null,
    cli_nome varchar(200) not null,
    cli_telefone varchar(200) not null,
    cli_email varchar(200) not null
);

create table if not exists livros(
	id int not null primary key auto_increment,
    liv_titulo varchar(200) not null,
    liv_autor varchar(200) not null,
    cli_id INT,  
    
    CONSTRAINT fk_cliente
        FOREIGN KEY (cli_id)
        REFERENCES clientes(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
