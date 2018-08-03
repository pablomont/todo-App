const mongoose = require('mongoose')
mongoose.Promise = global.Promise //remover warning
module.exports = mongoose.connect('mongodb://localhost/todo')
