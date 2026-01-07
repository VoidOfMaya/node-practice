import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
//IMPORTANT NOTE: this project file is configured
//to  run with ESM not commonjs, therefore
//it may look differnet  from tutorials
//pleease do keep that in mind

//setting up server with express.js
const app = express();

//register view engine

app.set('view engine','ejs');

const PORT =  3000
app.listen(PORT, (err)=>{
    //note: without this any startup errors will silently fail
    if(err){
        throw err;
    }
    console.log(`express app- ;istening on port ${PORT}`)
})


//=== routing ===

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/',(req, res)=>{
    //html
    //interprets content type based on sent content
    //==>res.sendFile('./htmlpages/main.html', {root: __dirname});

    //ejs
    //render takes an object to enable passing data to the view 
    res.render('main',{title: 'Home'});

});
app.get('/about',(req, res)=>{
    //html
    //expects absolute path, if relative  it requires root directory
    //to be specified
    //==>res.sendFile('./htmlpages/about.html', {root: __dirname});

    //ejs
    res.render('about');
    
});
app.get('/contact',(req, res)=>{
    //html
    //==>res.sendFile('./htmlpages/contact.html', {root: __dirname});

    //ejs
    res.render('contact');
});

app.get('/create',(req, res)=>{
    res.render('create')
})

//=== 300 redirects ===
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})
//=== 404 ===
//note : make sure this is always the last method in a router, this acts as the default in a switch case
app.use((re, res)=>{
    res.status(404)
       .render('404')
    
})
