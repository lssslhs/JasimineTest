+function() {
	"use strict";

	var express = require("express")
	, 	app = express()
	,	http = require("http")
	,	path = require("path");

	app.set("views", path.join(__dirname, "src"));
	app.set("port", 4000);
	app.engine("html", require("ejs").renderFile);
  	app.set("view engine", "html");
  	app.use(express.static(path.join(__dirname, "/")));

	app.get("/", function(req, res, next) {
		res.render("index");
	});

	var server = http.createServer(app);

	server.listen(4000);

	console.log("server start");

}();