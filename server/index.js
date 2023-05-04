const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');
  console.log('mongodb connection')

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
// We've created a schema with one property, username & password, which will be a String
const userSchema = new mongoose.Schema({
    username: String,
    password: String
  });

// A model is a class with which we construct documents  
const User = mongoose.model('User', userSchema);  

server.use(cors());
server.use(bodyParser.json());

// create
server.post('/demo',async (req,res)=>{
    let user = new User()
    user.username = req.body.username
    user.password = req.body.password
    const doc = await user.save()
    console.log(doc)
    
    res.send(req.body)
})

server.get('/demo', async (req, res) =>{
  const docs = await  User.find({})
  res.send(docs)
})

server.listen(8080, ()=>{
    console.log('Servidor rodando')
})