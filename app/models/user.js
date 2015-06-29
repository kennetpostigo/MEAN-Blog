var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Blog = require('../models/blog'),
	bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	name: String,
	username: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true, select: false},
	posts: [{type: Schema.Types.ObjectId, ref: 'Blog'}],
	date: {type: Date, default: Date.now}
});



UserSchema.pre('save', function (next) {
	var user = this;
	
	if (!user.isModified('password')) {
		return next();
	} else {
		bcrypt.hash(user.password, null, null, function (err, hash) {
			if (err) {
				return next(err);
			} else {
				user.password = hash;
				next();
			}
		});
	}
});

UserSchema.methods.comparePassword = function (password) {
	var user = this;
	
	return bcrypt.compareSync(password, user.password);
	
};

module.exports = mongoose.model('User', UserSchema);