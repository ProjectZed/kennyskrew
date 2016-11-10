create database demojs;
use demojs;
create table t_user (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	password VARCHAR(20) NOT NULL
);
insert into t_user (name,password) values ('root', 'root');
select * from t_user;
