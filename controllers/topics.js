var db = require('../db.js');

module.exports.controller = function(app) {

/*Topics
------------------------*/
	//index of topics
	app.get('/topics', function (req, res){
		db.all('topics', function (topics){
			var data = {
				topics : topics
			}
			console.log(req.session);
			res.render('topicsIndex', data);
		});
	});

	//NEW - topic
	app.get('/topics/new', function (req, res){
		db.all('topics', function (topics){
			//To check if all topics show: console.log(topics);
			var data = {
				topics : topics
			}
			res.render('new-topic', data);
		});
	});

	//CREATE - (post) new topic
	app.post('/topics', function (req, res){
		//to check if topic posted: console.log(req.body)
		db.create('topics', req.body, function (topic){
			res.redirect('/topics');
		});
	});

	//SHOW - specific topic
	app.get('/topics/:id', function (req, res){
		db.find('topics', req.params.id, function (topic){
		// topics
		var data = {
			topic: topic[0]
		};
			db.findRelations('posts', 'topic_id', req.params.id, function (posts){
				data.topic.posts = posts;
				console.log("THESE ARE POSTS", posts);
				
				// data.topic.posts.forEach( function ( post, post_index, posts ){
				// });

				// for(var i = 0; i < posts.length; i++){
				// 	db.find('users', posts[i-1].user_id , function (user){
				// 		console.log("THIS IS THE USER SHIT", user);
				// 		posts[i-1].user = user;
				// 	});
				// };

				res.render('topicsShow', data);
				
				// var data = {
    //       topic: topic[0],
    //       posts: posts
				// };
				// console.log(req.session);
				
			});	
		});
	});
}