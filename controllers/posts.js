var db = require('../db.js');

module.exports.controller = function(app) {
	//NEW - post
	app.get('/posts/:id/new', function (req, res){
			var idObj = {
				id : req.params.id
			};
			res.render('new-post', idObj);
	});

	app.post('/posts/:id/new', function (req, res){
		var topicObj = {
			description : req.body.description,
			user_id : req.session.signed_in_user_id,
			topic_id : req.params.id
		};
		db.create('posts', topicObj, function (post){
			res.render('topicsShow');
		});
	});
	

}

