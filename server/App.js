#!/usr/bin/env node
/*
common node bash commands:-

Pass string as argument to node
=> node -e "console.log(123)"

Restart the application automatically
=> node --watch app.js

Run a task with Node.js
=> node --run {package.json command}/
=> node --run test/
=> node --run dev

*/
//each section is separated with  a function for ease of navigation !

const https = require('https'); // required for native https.GET/POST/PULL/DELET function
const http = require('node:http'); // required for http.CreateServer
const fs = require('fs'); //required for File System

//request examples (no axios)
function RequestSection (){
    // native node http get
    const getFromApi = () =>{
        const options = {
        hostname: 'example.com',
        port: 443,
        path: '/todos',
        method: 'GET',
        };

        const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', d => {
            process.stdout.write(d);
        });
        });

        req.on('error', error => {
        console.error(error);
        });

        req.end();    
    }

    //native node POST request
    //declarw https= reuired('https');
    const postToApi = () =>{
        const data = JSON.stringify({
        todo: 'Buy the milk',
        });

        const options = {
        hostname: 'whatever.com',
        port: 443,
        path: '/todos',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        },
        };

        const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', d => {
            process.stdout.write(d);
        });
        });

        req.on('error', error => {
        console.error(error);
        });

        req.write(data);
        req.end();    
    }
    //keynote, PUT/DELETE requests follow the same POSt format with the differance being the options.method on line 53 
    //is replaced with the desired method

}
//server create example
function ServerCreateSection (){
    //http.createServer ([options], [requestListener])*for study purposes will be using http instead of https!
    // Creates a local server to receive data from
    const server = http.createServer();

    // Listen to the request event
    server.on('request', (request, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        data: 'Hello World!',
    }));
    });

    server.listen(8000);    
}

//file system
function FileSystemSection (){
    //friendly reminded this is where our lesson on the 4th of jan 2026 ended
}

