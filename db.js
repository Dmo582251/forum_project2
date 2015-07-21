/* Set Up
-------------*/
var pg = require('pg'); //grabs postgres
var dbUrl = "pg://localhost/forum_db"; // connecting to database

//this is just working with pg model
//prepared our functions to do whatever we want and to do them to many different things
module.exports = {
	end: function(){
		pg.end();
	},
	all: function(table, cb) {
		pg.connect(dbUrl, function (err, client, done){
			client.query('SELECT * FROM ' + table, function (err, result){
				done();

				cb(result.rows);
			});
		});
		this.end();
	},
	find: function(table, id, cb) {
		pg.connect(dbUrl, function (err, client, done){
			var q = 'SELECT * FROM ' + table + ' WHERE id=' + id;
			console.log(q);
			client.query(q, function (err, result){
				if (err) {return console.error('error from find', err)};
				done();
				// console.log(result.rows);
				cb(result.rows);
			});
		});
		this.end();
	},
	findByColumn: function(table, col, value, cb) {
		pg.connect(dbUrl, function (err, client, done){
			client.query('SELECT * FROM ' + table + ' WHERE ' + col + '=\'' + value + '\'', function (err, result){
				done();
				// console.log('SELECT * FROM ' + table + ' WHERE ' + col + '=\'' + value + '\'')
				cb(result.rows);
			});
		});
		this.end();
	},
 	findRelations : function (table, column, id, cb) {
      pg.connect(dbUrl, function (err, client, done) {
          client.query('SELECT * FROM ' + table + ' WHERE ' + table + '.' + column + ' = ' + id, function (err, result) {
              done();
              cb(result.rows);
          });
      });
      this.end();
  },
	delete: function (table, id, cb){
		pg.connect(dbUrl, function (err, client, done) {
			client.query('DELETE FROM ' + table + ' WHERE id=' + id, function (err, result){
				done();

				cb(result);
			});
		});
		this.end();
	},
	create: function (table, obj, cb) {
		pg.connect(dbUrl, function (err, client, done) {
			var columns = [];
			var values = [];
			var dollars = [];
			
			Object.keys(obj).forEach(function (key, i) {
				columns.push(key);
				values.push(obj[columns[i]]);
				dollars.push('$' + (i + 1));
			});

			var query = 'INSERT INTO ' + table + '(' + columns.join(', ') + ') VALUES(' + dollars.join(', ') + ') RETURNING id AS id';
			client.query(query, values, function (err, result) {
				done();

				cb(result.rows[0]);
			});
		});
		this.end();
	},
	update: function (table, obj, id, cb){
		pg.connect(dbUrl, function (err, client, done){
			var columns = [];
			var set = [];
			var values = [];
			
			Object.keys(obj).forEach(function (key, i){
				columns.push(key);
				set.push(key + '=($' + (i + 1) + ')')
				values.push(obj[columns[i]]);
			});

			client.query('UPDATE ' + table + ' SET ' + set.join(', ') + ' WHERE id=' + id, values, function (err, result) {
				done();

				cb(result)
			});
		});
		this.end();
	},
	findUserName: function (columns, table, table2, column1, cb){
   pg.connect(dbUrl, function (err, client, done){
     var query = 'SELECT '+columns+' FROM ' + table + ' FULL OUTER JOIN ' + table2 + ' ON ' + table+'.'+column1 + '=' + table2+'.id';
     console.log(query)
     client.query(query, function (err, result){
       console.log("THIS IS RESULT", result);
       cb(result.rows)
     })

   })
   this.end();
 },
};
