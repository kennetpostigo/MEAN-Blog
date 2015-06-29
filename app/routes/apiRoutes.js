var bodyParser = require('body-parser'),
	User = require('../models/user'),
	Blog = require('../models/blog'),
	config = require('../config');

module.exports = function (app, express) {
	var apiRouter = express.Router();
	
	apiRouter.route('/user')
		.post(function (req, res) {
			var user = new User();
			user.name = req.body.name;
			user.username = req.body.username;
			user.password = req.body.password;
			user.blogPosts = req.body.blogPosts;
			user.save(function (err, user) {
				if (err) {
					return res.json(err);
				} else {
					res.json(user);
				}
			});
		});
	
	apiRouter.route('/create')
		.post(function (req, res) {
			var blog = new Blog();
			blog.title = req.body.title;
			blog.author = req.body.author;
			blog.body = req.body.body;
			blog.save(function (err, blog) {
				if(err) {
					return res.json(err);
				} else {
					res.json(blog);
				}
			});
		});
	
	return apiRouter;
};

//date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()










































