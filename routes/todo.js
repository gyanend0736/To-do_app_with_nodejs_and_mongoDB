const express= require('express');
const router = express.Router();
const todo= require("../model/todo.js")


router.get('/dashboard', async (req, res) => {
    const todos = await todo.find();
    res.json(todos);
  });


router.post('/add',async (req,res) =>{
    await todo.create({ title: req.body.title, desc: req.body.desc, user: req.session.userId })
    
    res.redirect('/dashboard');
});

router.delete('/delete/:id', async (req, res) => {
  await todo.findByIdAndDelete(req.params.id);
  res.redirect('/dashboard');
});
module.exports = router;