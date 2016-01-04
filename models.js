var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/gifproject');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var questionSchema = new Schema({
  title: { type: String, required: true },
  used: { type: Boolean, required: true, default: false }
});

var gifSchema = new Schema({
  url: { type: String, required: true },
  user: { type: String, required: true }
});

var userSchema = new Schema({
  username: { type: String, required: true }
});

var Question = mongoose.model('Question', questionSchema);
var Gif = mongoose.model('Gif', gifSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
    Question: Question,
    Gif: Gif,
    User: User
}