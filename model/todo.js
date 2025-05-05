const mongoose= require('mongoose')
const todos= new mongoose.Schema({
    title: {type: String,  required: true},
    desc: {type: String},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports= mongoose.model("todo",todos);