const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dollarSchema = new mongoose.Schema({
    number: Number,
    time : Date
});


const Dollar = mongoose.model('Dollar', dollarSchema)
module.exports = { dollarSchema, Dollar };