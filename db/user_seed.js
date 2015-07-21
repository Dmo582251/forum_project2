var db = require('../db.js');

// different users
var usernames = ['cosmo1', 'lulu'];
var names = ['Cosmo', 'Lucy'];
var photos = [
'http://www.buventureaccelerator.org/images/Cosmo_Cochrane.jpg',
'http://www.revitalizenotmilitarize.org/wp-content/uploads/2013/10/FlowerPower_v1.png'
];
var bio = ['My name is Cosmo I stink', 'My name is Lucy I like flowers'];



//People variables
var cosmo = {
	username : usernames[0],
	name : names[0],
	img_url : photos[0],
	bio : bio[0]
};

var lucy = {
	username : usernames[1],
	name : names[1],
	img_url : photos[1],
	bio : bio[1]
};



// DB STUFF
//cosmo 
db.create('users', cosmo, function (user){
	post1.user_id = user.id;
	console.log("cosmo worked");
})


//lucy
db.create('users', lucy, function (user){
	post2.user_id = user.id;
		console.log("lucy worked");
});