var db = require('../db.js');


//This is for topics
var title = ['Topic1', 'Topic2'];
var photo = [
'http://www.vvcofhamburg.com/wp-content/uploads/2015/07/little_cute_cat_1920x1080.jpg',
'http://cdn.sheknows.com/articles/2013/04/Puppy_2.jpg'
];

//this is for posts
var description = ['This is my topic 1 post', 'This is my topic 2 post'];
var like_count = [5, 3];



//Topics
var topic1 = {
	title : title[0],
	img_url : photo[0]
};

var topic2 = {
	title : title[1],
	img_url : photo[1]
};

//Posts
var post1 = {
	description : description[0],
	like_count : like_count[0],
	user_id : null,
	topic_id : null
};

var post2 = {
	description : description[1],
	like_count : like_count[1],
	user_id : null,
	topic_id : null
};

/* DB Stuff */


//topic one
db.create('topics', topic1, function (topic){
	post1.topic_id = topic.id
	db.create('posts', post1, function (post){
		console.log("topic 1 has worked");
	});
});

//topic 2
db.create('topics', topic2, function (topic){
	post2.topic_id = topic.id
	db.create('posts', post2, function (post){
		console.log("topic 2 has worked");
	});
});


