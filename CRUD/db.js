const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:JgtxeC67aPjQF0v9@cluster0.b2cjr.mongodb.net/RIC")

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}