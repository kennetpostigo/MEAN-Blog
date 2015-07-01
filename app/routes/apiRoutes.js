var bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	jwt = require('jsonwebtoken'),
	User = require('../models/user'),
	Blog = require('../models/blog'),
	config = require('../config'),
	shizzles = config.shizzles;

module.exports = function (app, express) {
	var apiRouter = express.Router();
	
	
	apiRouter.route('/user')
		//Create a User
		.post(function (req, res) {
			var user = new User();
			user.name = req.body.name;
			user.username = req.body.username;
			user.password = req.body.password;
			user.save(function (err, user) {
				if (err) {
					return res.json(err);
				} else {
					res.json(user);
				}
			});
		});
	
	apiRouter.route('/blogStream')
		//Get Blog Stream
		.get(function (req, res) {
			User.findOne({name: 'Kennet Postigo'}, {username: 0, date: 0, __v: 0})
				.populate({
					path: 'posts',
					select: 'title body date'
				}).exec(function (err, user) {
					if (err) {
						res.send(err);
					} else {
						res.json(user);
					}
				});
		});
	
	apiRouter.route('/blogStream/:blog_id')
		//Get Individual Blog Post
		.get(function (req, res) {
			Blog.findOne({_id: req.params.blog_id}, {title:1, body:1, author:1, date:1, _id:1})
			.populate({path: 'author', select: 'name'})
				.exec(function (err, blog) {
					if (err) {
						return res.send(err);
					} else {
						res.json(blog);
					}
				});
		});
	
	apiRouter.post('/authenticate', function (req, res) {
		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function (err, user) {
			if (err) {
				throw err;
			}
			if (!user) {
				res.json({
					success: false,
					message: 'Authentication failed. User not found.'
				});
			} else if (user) {
				var validPassword = user.comparePassword(req.body.password);

				if (!validPassword) {
					res.json({
						success: false,
						message: 'Authentication failed. Wrong Password.'
					});
				} else {
					var token = jwt.sign({
						name: user.name,
						username: user.username
					}, shizzles, {
						expiresInMinutes: 1440
					});

					res.json({
						success: true,
						message: 'Enjoy Your Token!',
						token: token
					});
				}
			}
		});
	});

	apiRouter.use(function (req, res, next) {

		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, shizzles, function (err, decoded) {
				if (err) {
					return res.json({
						success: false,
						message: 'Failed to authenticate token.'
					});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			return res.status(403).send({
				success: false,
				message: 'No Token provided.'
			});
		}
	});

	
	apiRouter.route('/:user_id/blog/:blog_id')
	
		//Update Individial Blog Post
		.put(function (req, res) {
			Blog.findById(req.params.user_id, function (err, blog) {
				if (err) {
					return res.send(err);
				} else if (req.body.title) {
					blog.title = req.body.title;
				} else if (req.body.body) {
					blog.body = req.body.body;
				}
				
				blog.save(function (err) {
					if (err) {
						return res.send(err);
					} else {
						res.json({message: 'Blog Post Was Successfully Updated'});
					}
				});
				
			});
		})
		
		//Delete A Blog Post
		.delete(function (req, res) {
			User.update({_id: req.params.user_id},
						{$pull: {posts: req.params.blog_id}},
						{multi: true},
				function (err, user) {
					if (err) {
						return res.send(err);
					} else {
						Blog.remove(req.params.blog_id, function (err, blog) {
							if (err) {
								return res.send(err);
							} else {
								res.json({message: 'Blog Post Was Successfully Deleted'});
							}
						});
					}
				});
		});
	
	apiRouter.route('/:user_id/create')
		//Create A Blog Post
		.post(function (req, res) {
			var blog = new Blog();
			blog.title = req.body.title;
			blog.author = req.params.user_id;
			blog.body = req.body.body;
			blog.save(function (err) {
				if (err) {
					return res.json(err);
				} else {
					User.findById(req.params.user_id, function (err, user) {
						user.posts.push(blog);
						user.save(function (err) {
							if (err) {
								res.json(err);
							} else {
								res.send({message: 'Blog Post Was Successfully Created.'});
							}
						});
					});
				}
			});
		});
	
	return apiRouter;
};