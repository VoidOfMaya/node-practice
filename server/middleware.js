//on middleware

//case uses:
//logger  middleware - logs details of every request
//autenticaiton middleware - checks for protected routs
// JSON middleware - parses JSON data from request
//return 404 pages

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

//basic sever setup
const app = express();
app.set('view engine','ejs');
//KEYnote:the port number would come from an environment variable
//         with a fallback value in case the environment 
//         variable does not exist.
const PORT = 3000
app.listen(PORT, (err)=>{
    if(err){
        throw err;
    }
    console.log(`express server running on port:${PORT}`)
})

//custom logger middleware 

//note: requires next() to moce outside of the middleware on to the rest of the app
app.use((req,res, next)=>{
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    //required ti exit the middleware
    next();
})

//routing setup

app.get('/',(req, res)=>{ 
    res.render('main',{title: 'Home'});
});
app.get('/about',(req, res)=>{
    res.render('about');
});
app.get('/contact',(req, res)=>{
    res.render('contact');
});

app.get('/create',(req, res)=>{
    res.render('create');
});

app.get('/about-us',(req,res)=>{
    res.redirect('/about');
});

app.use((re, res)=>{
    res.status(404)
       .render('404');   
});
