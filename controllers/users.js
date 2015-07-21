var db = require('../db.js');

module.exports.controller = function(app) {
/*Users
------------------------*/
	//index of users
	app.get('/users', function (req, res){
		db.all('users', function (users){
			var data = {
				users : users
			}
			res.render('usersIndex', data);
		});
	});

	//SHOW - specific users
	app.get('/users/:id', function (req, res){
		db.find("users", req.params.id, function (users){
			db.findRelations('posts', 'user_id', req.params.id, function (posts){
				var data = {
          users: users[0],
          posts: posts
				};
				res.render('usersShow', data);
			});	
		});
	});

}