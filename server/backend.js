import http from 'http';
import fs from 'fs';
import _ from 'lodash';


//create server object
const server = http.createServer((req, res)=>{
    //lodash
    

    // set header content type
    res.setHeader('Content-Type','text/html');

    //status codes
    //100 range -informational responses
    //200 range - success codes,            200 = ok
    //300 range - codes for redirects,      301 = resource removed
    //400 range - user /client error codes, 404 = not found
    //500 range - server error codes,       500 = internal server error
     
    //setting up routing regular way

    let path ='./htmlpages/'
    switch(req.url){
        case '/':
            path += 'main.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/contact':
            path += 'contact.html';
            res.statusCode = 200;
            break;
        case '/about-me': // redirecting to /about router access point
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default :
            path += '404.html';
            res.statusCode = 404;
            break;
    }




    //sending an html page using the fs
    fs.readFile(path,(err, data)=>{
        err? console.log(err) : res.end(data);
    })

});
//listen to incomming requests from port 3000
server.listen(3000, 'localhost',()=>{
    console.log('listining on p:3000')
});


