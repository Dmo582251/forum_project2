var express        = require('express');
var logger         = require('morgan');
var path           = require('path');
var exphbs         = require('express-handlebars');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
// this is now in controllers: 
var db						 = require('./db.js');
var fs 						 = require('fs');
//FOR LOGIN
var session 			 = require('express-session');
var cookieParser	 = require('cookie-parser'); // the session is stored in a cookie, so we use this to parse it

var app = express();

// Setting up handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main', extname: 'handlebars'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// must use cookieParser before expressSession
app.use(cookieParser());
app.use(session({ secret: 'app', cookie: { maxAge: 60000 }}));


// Allows us to use req.body
app.use(bodyParser.urlencoded());
// Loads static files
app.use(express.static('public'));
app.use(logger('dev'));

// stuff for fs
fs.readdirSync('./controllers').forEach(function (file) {
 if(file.substr(-3) == '.js') {
     route = require('./controllers/' + file);
     route.controller(app);
 }
});

// Allows us to use method PUT and DELETE for forms
app.use(methodOverride(function (req, res) {
    if(req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.listen(3000);


/*START ROUTES
---------------------------*/
//HOME ROUTE
app.get('/', function (req, res) {
  res.render('home');
});

//USER LOGIN
app.post('/login', function(req, res){
	//created ne findbyColumn for this
	db.findByColumn('users', 'username', req.body.username, function (data){
		//how you sign in 
		req.session.signed_in_user_id = data[0].id;
		req.session.loggedIn = true;
		res.send(data);
	}); 
});

//CREATING USER POST

app.post('/signup', function (req, res) {
	console.log(req.body);
	db.create('users', req.body, function (data) {
		//used for session
		console.log('this is the data that comes back after signing up', data);
		req.session.signed_in_user_id = data.id;
		req.session.loggedIn = true;
    res.render('afterlog');
  });
});

//TEST ROUTE
app.get('/test', function (req, res) {
  console.log( "signed in user id", req.session.signed_in_user_id);
   console.log( "signed in user id", req.session.loggedIn);
  res.render('test');
});

//SIGNING OUT OF USER
app.get('/signout', function (req, res){
	req.session.destroy();
	res.redirect('/');
});

