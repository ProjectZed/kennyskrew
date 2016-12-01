# DigitalDashDemo
ExpressJS + AngularJS + Bootstrap + NodeJS + mysql/SQLite

#bin
www service config

#bower_components
bower install folder

#common
static resource file

#conf
configuration file
log4j mysql

#dao
data access object

#log
system log

#node_modules

#public
custom stylesheet and javascript

#routes
express router configuration

#util
custom tool package

#views
custom html pages

#app.js
node start file
Basic global configuration and component configuration

#run
npm start

http://localhost:3000/
to login page if not login yet

http://localhost:3000/register
register page

***Inportant****
Need to install MySQL server in local machine
and execute the t_user_scheme.sql under mysql_scheme to create a t_user table to login
default username and password
root
root

#MySQL installation
MySQL community server and MySQL WorkBench
Install both and create a connection in WorkBench.
run the t_user_scheme.sql in that connection
set database password to 1234 to match db.js config

#Installation (Windows)
1. Download MySQL: [here](https://dev.mysql.com/downloads/file/?id=466291), Click "No thanks, just start my download."
2. Run it with default settings, you will be asked to setup a root password for the server use 1234 or something
3. Open MySQL WorkBench
4. "Open Connection" to your localhost
5. Copy [contents](https://github.com/ProjectZed/kennyskrew/blob/prototype/mysql_scheme/t_user_scheme.sql) into the "Query 1" window
6. Execute (the thunderbolt icon)
7. Run "npm start" in the root git folder
8. If there is any "Error: Cannot find module..." run "npm install [name of module]"
9. Run "npm start"
10. Open "localhost:3000" in browser

Note:
Username - root
Password - root
