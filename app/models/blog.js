var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BlogSchema = new Schema({
	'title': {type: String, required: true},
	'author': {type: Schema.Types.ObjectId, ref: 'User'},
	'body': {type: String, required: true},
	'date': {type: Date, default: Date.now}
});

module.exports = mongoose.model('Blog', BlogSchema);

