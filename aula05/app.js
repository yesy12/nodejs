var http = require("http");

http.createServer(function(req,res){
	res.end("Ola Mundo!");
}).listen(8000);

console.log("O servidor esta rodando");