const express = require('express');
const app = express();

const mongojs = require('mongojs');
const db = mongojs('contactlist', ['contactlist']);

const bodyParser = require('body-parser');

//use HTML/JS/CSS files at a location
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json()); //nead to teach the server to read the data otherwise 'undefined' response for sent data

app.get('/contactlist', function (req, res) {
	console.log("I received a GET request!");

	db.contactlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});

	//placeholder data before adding db
    // let person1 = {
    // 	name: 'Tim',
    // 	email: 'tim@email1.com',
    // 	number: '(111) 111-1111'
    // };

    // let person2 = {
    // 	name: 'Emily',
    // 	email: 'emily@email2.com',
    // 	number: '(222) 222-2222'
    // }

    // let person3 = {
    // 	name: 'John',
    // 	email: 'john@email3.com',
    // 	number: '(333) 333-3333'
    // }

    // const contactlist = [person1, person2, person3];
    // res.json(contactlist); //this is the response
});

//listening to post requests
app.post('/contactlist', function(req, res){
	console.log(req.body);
//insert data to db
	db.contactlist.insert(req.body, function(err, doc){
		res.json(); //sends data back to the controler.
	});
});

app.delete('/contactlist/:id', function(req, res){
	let id = req.params.id;
	console.log(id);

	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

//this code will test as well as send back all the data we requested
app.get('/contactlist/:id', function(req, res) {
	let id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
})

app.put('/contactlist/:id', function(req,res) {
	let id = req.params.id;
	console.log(req.body.name);

	//updating db
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function (err, doc) {
			res.json(doc); //responding with json doc that we updated
		
	});
});

app.listen(3000);
console.log("Server running on port 3000");

