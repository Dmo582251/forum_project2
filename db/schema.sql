DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS topics CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(255),
	name VARCHAR(255),
	img_url TEXT,
	bio TEXT,
	date_made TIMESTAMP
);

CREATE TABLE topics(
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	img_url TEXT
);

CREATE TABLE posts(
	id SERIAL PRIMARY KEY,
	description TEXT,
	location TEXT,
	date_made TIMESTAMP,
	like_count INTEGER,
	user_id INTEGER references users,
	topic_id INTEGER references topics
);