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
        console.log(req.session)
        var query = 'SELECT p.*, u.username, u.img_url FROM users u left join posts p ON u.id = p.user_id WHERE p.topic_id=' + req.params.id
        db.find('topics', req.params.id, function (topic) {
            db.query(query, function (posts) {
                var data = {
                    topic: topic[0],
                    posts: posts
                };
                console.log(data)
                res.render('topicsShow', data);
            })
        })
    });
}