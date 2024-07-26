const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : String,
    passowrd : String,
});

const todoSchema = new mongoose.Schema({
    title : String,
    description : String,
    done : Boolean,
    userId : String, 
});

const User = mongoose.model('User',userSchema);
const Todo = mongoose.model('Todo',todoSchema);

module.exports = {
    User,
    Todo
}