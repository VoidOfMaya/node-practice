import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
//IMPORTANT NOTE: this project file is configured
//to  run with ESM not commonjs, therefore
//it may look differnet  from tutorials
//pleease do keep that in mind

//setting up server with express.js
const app = express();


//listen for request
app.listen(3000)

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/',(req, res)=>{
    //interprets content type based on sent content
    res.sendFile('./htmlpages/main.html', {root: __dirname});

});
app.get('/about',(req, res)=>{
    //expects absolute path, if relative  it requires root directory
    //to be specified
    res.sendFile('./htmlpages/about.html', {root: __dirname});
    
});
app.get('/contact',(req, res)=>{
    
    res.sendFile('./htmlpages/contact.html', {root: __dirname});
    
});