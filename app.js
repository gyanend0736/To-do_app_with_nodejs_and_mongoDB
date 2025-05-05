const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const { connect } = require('mongoose');
const mongoose= require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const todo= require("./model/todo.js")
const auth= require("./model/User.js")
app.get('/',async (req,res) =>{
  res.render('index');
})
app.get('/signup', (req, res) => {
    res.render('signup');
});
  
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/dashboard',requireLogin, async (req, res) => {
    const user = await auth.findById(req.session.userId);
    const todos = await todo.find({ user: req.session.userId });
    res.render('mainpage', { todos,user });
});
mongoose.connect('mongodb://127.0.0.1:27017/todo-auth')
.then(()=> console.log("mongoose connected"))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
const authRoutes = require('./routes/auth'); // adjust path if needed
app.use(authRoutes);
const routes= require("./routes/todo.js")
app.use('',routes);


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}