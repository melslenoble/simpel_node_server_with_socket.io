'use strict'

var path 	= require('path');
var fs 		= require('fs-extra');
var http 	= require("http");
var io      = require("socket.io");

var listener , _socket;
var filedir = __dirname;




var app = http.createServer(function(request, response) {
	var filePath = path.join(filedir, "html", request.url)

	var extname = path.extname(filePath);
	var contentType = getContentType(extname)
	if(extname === ""){
		filePath = path.join(filedir,"html", "index.html")
	}
	
	if(extname === ".ico"){return}
	
	fs.readFile(filePath, function(error, content) {
	if (error) {
		response.writeHead(500);
		response.end("Sorry, check with the site admin for error: " + error.code + " ..\n");
		response.end()
	} else {
		response.writeHead(200, {
			"Content-Type": contentType
		});
		response.end(content, "utf-8")
	}
	})


}).listen(9999)

listener = io.listen(app)
listener.sockets.on('connection', on_connection);
function on_connection(socket) {
    _socket = socket;
    _socket.emit("message", "ready!")

}


function getContentType(extname){var contentType="text/html";switch(extname){case ".js":contentType="text/javascript";break;case ".css":contentType="text/css";break;case ".json":contentType="application/json";break;case ".png":contentType="image/png";break;case ".jpg":contentType="image/jpg";break;case ".wav":contentType="audio/wav";break}return contentType};
