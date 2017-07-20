var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser= require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

var url = "mongodb://localhost:27017/LoginDb";
var chkLogin = 0;


app.get('/',function(req,res){
	res.sendFile(__dirname+'/'+'mainApp.html');

});

app.get('/Login',function(req,res){
	res.sendFile(__dirname+'/'+'login.html');
});

/*app.post('/profile',function(req,res){
	res.sendFile(__dirname+'/'+'profile.html');
	
});*/

app.post('/profile',urlencodedParser,function(req,res){

	MongoClient.connect(url,function(err,db){
	assert.equal(err,null);
	console.log('Connection established with DataBase');

    var collection = db.collection('Login')
	
		collection.find({}).toArray(function(err,docs){
			assert.equal(err,null);
			for(var i=0;i<docs.length;i++){
				if(req.body.loginId===docs[i].id && req.body.loginPass===docs[i].pass){

					console.log("->",req.body.loginId);
					console.log("->",req.body.loginPass);
					console.log('successfully logged in');
					res.sendFile(__dirname+'/'+'profile.html');
				}	
			}
			res.status(404);
			res.end();
		});
	
	});


});

app.listen(8081,function(){
	console.log('server Started...');
});