const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');
const { connect } = require('http2');
const { render } = require('ejs');
const { result } = require('lodash');
const app = express();

const dburl='mongodb+srv://ritik9294:ritik1234@project1.o9sun.mongodb.net/project_1?retryWrites=true&w=majority';
mongoose.connect(dburl,{ useNewUrlParser: true,useUnifiedTopology: true})
.then((result) =>  app.listen('3000'))
.catch((err) => console.log(err));
   
   

//app.listen('3000');
// register view engine
app.set('view engine','ejs');



app.use(express.static(path.join(__dirname, '/views')));


app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));


/*app.get('/add-blog',(req,res)=> {
  const blog = new Blog({
    title: 'new blog3',
    snippet: 'about my new blog',
    body: 'A gjha kbaj akbajg ajvbljabg'

  });
  blog.save()
  .then((result) => {
    res.send(result);
    
  }).catch((err) => {
    console.log(err);
  });
   
});


app.get('/all-blogs',(req,res)=> {
  blog.find();
  .then((result) => {
    res.send(result);
    
  }).catch((err) => {
    console.log(err);
  });
   
});*/

//listen for requests
/*app.use(function(req,res,next){
   console.log('new request made:');
   console.log('host: ', req.hostname);
   console.log('path: ',req.path);
   console.log('method: ',req.method);
   next();
});*/

app.get('/' , function(req , res){
  res.redirect('/blogs');
});

app.get('/about' , function(req , res){
    res.render('about' , { title: 'About'});
    console.log(req.url);
  });

  app.get('/blogs',function(req,res){
    Blog.find().sort({ createdAt: -1})
        .then((result)=>{
            res.render('index1',{title: 'All Blogs' , blogs: result});
        })
        .catch((err)=>{
          console.log(err);
        })
  });

  app.post('/blogs',(req,res)=>{
     const blog = new Blog(req.body);
     blog.save()
     .then((result)=>{
      res.redirect('/blogs')
  })
  .catch((err)=>{
    console.log(err);
  })

  });
  app.get('/blogs/create' , function(req , res){
    res.render('create' , { title: 'Create a new Blog'});
  });

  app.get('/blogs/:id',(req,res) => {
    const id=req.params.id;
    console.log(id);
    Blog.findById(id)
    
    .then(result=>{
      res.render('details',{blog: result ,title: 'blog content' });
  })
  .catch(err=>{
    res.status(404).render('404',{title: 'Blog Not Found'});
  })

  });

  app.delete('/blogs/:id',(req,res) => {
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    
    .then(result=>{
      res.json({ redirect:  '/blogs'});
  })
  .catch(err=>{
    console.log(err);
  })

  });

  //404 page
  app.use(function(req , res){
    res.status(404).render('404', { title: 'Error Page'});
  })