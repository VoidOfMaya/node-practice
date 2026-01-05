#!/usr/bin/env node
import fs from 'fs';
import { pipeline } from 'node:stream/promises';
import path from 'path';
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
const EventEmitter = require('node:events'); //required for event emitter section

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
    // Example: Read a file and change its content and read
    //this is based on the promise-based API an other callback-basedAPI
    //exists however it risks callback-hell if the operations are numurouis
    async function readAndChangeFile() {
    const fileName = '/Users/joe/test.txt';
    try {
        const data = await fs.readFile(fileName, 'utf8');
        console.log(data);
        const content = 'Some content!';
        await fs.writeFile(fileName, content);
        console.log('Wrote some content!');
        const newData = await fs.readFile(fileName, 'utf8');
        console.log(newData);
       }catch (err) {
        console.log(err);
       }
    }
    readAndChangeFile();
    //NOTE= By default, the writeFile API will replace the contents of the file if it does already exist.
    //You can modify the default by specifying a flag:
    fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {});

    /*
    common flags

    r+ = opens the file for reading and writing
    w+ = opens the file for reading and writing and it also positions the stream at the beginning of the file
    a  = opens the file for writing and it also positions the stream at the end of the file
    a+ = opens the file for reading and writing and it also positions the stream at the end of the file
    */

    //Appending content to a file, this example is promise based, checkout documents for referance on using synchronous version

    async function appendToFile() {
    try {
        const content = 'Some content!';
        await fs.appendFile('/Users/joe/test.txt', content);
    } catch (err) {
        console.log(err);
    }
    }
    appendToFile();
}
//often times when handeling larg files  it can slow down preformance with the regular fs functions
//due to it needing to fully read the file into memory befor providing us the whole file
//as a solution we can pull only chunks of a file into memory and save on time and expensive operations
//with streams
// stream
async function readFromStream (){
    const fileUrl = 'https://www.gutenberg.org/files/2701/2701-0.txt';
    const outputFilePath = path.join(process.cwd(), 'moby.md');
    async function downloadFile(url, outputPath) {
    const response = await fetch(url);
    if (!response.ok || !response.body) {
        // consuming the response body is mandatory: https://undici.nodejs.org/#/?id=garbage-collection
        await response.body?.cancel();
        throw new Error(`Failed to fetch ${url}. Status: ${response.status}`);
    }
    const fileStream = fs.createWriteStream(outputPath);
    console.log(`Downloading file from ${url} to ${outputPath}`);
    await pipeline(response.body, fileStream);
    console.log('File downloaded successfully');
    }
    async function readFile(filePath) {
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    try {
        for await (const chunk of readStream) {
        console.log('--- File chunk start ---');
        console.log(chunk);
        console.log('--- File chunk end ---');
        }
        console.log('Finished reading the file.');
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
    }
    }
    try {
    await downloadFile(fileUrl, outputFilePath);
    await readFile(outputFilePath);
    } catch (error) {
    console.error(`Error: ${error.message}`);
    }
}
//WHATWG URL API
// URL constructuor is accessible as a property globaly
/*content:
- new url
- hash
- host
- href
*/
function urlSection(){
    function  createUrl () {
        //new url declerations take the following args (input, base)
        const myURL = new URL('/foo','https://example.org/');


    }
    //gets & sets the hash section of the url
    function hashUrl () {
        //gets and sets fragment portions of the url
        const mySecondURL = new URL('https://example.org/foo#bar');
        console.log(mySecondURL.hash);
        // Prints #bar

        mySecondURL.hash = 'baz';
        console.log(mySecondURL.href);
        // Prints https://example.org/foo#baz     
    }
    //gets & sets the host poriton of the url
    function hostUrl(){
        const myURL = new URL('https://example.org:81/foo');
        console.log(myURL.hostname);
        // Prints example.org

        // Setting the hostname does not change the port
        myURL.hostname = 'example.com';
        console.log(myURL.href);
        // Prints https://example.com:81/foo

        // Use myURL.host to change the hostname and port
        myURL.host = 'example.org:82';
        console.log(myURL.href);
        // Prints https://example.org:82/foo 
    }
    //gets & sets the href poriton of the url
    function hrefUrl(){
        const myURL = new URL('https://example.org/foo');
        console.log(myURL.href);
        // Prints https://example.org/foo

        myURL.href = 'https://example.com/bar';
        console.log(myURL.href);
        // Prints https://example.com/bar 
    }
    //gets & sets the protocol poriton of the url
    function protocolUrl(){
        const myURL = new URL('https://example.org');
        console.log(myURL.protocol);
        // Prints https:

        myURL.protocol = 'ftp';
        console.log(myURL.href);
        // Prints ftp://example.org/ 
    }
    //gets & sets the hostname poriton of the url
    function hostNameUrl(){
        const myURL = new URL('https://example.org:81/foo');
        console.log(myURL.hostname);
        // Prints example.org

        // Setting the hostname does not change the port
        myURL.hostname = 'example.com';
        console.log(myURL.href);
        // Prints https://example.com:81/foo

        // Use myURL.host to change the hostname and port
        myURL.host = 'example.org:82';
        console.log(myURL.href);
        // Prints https://example.org:82/foo 
    }
    //gets & sets the pathname poriton of the url
    function pathNameUrl(){
        const myURL = new URL('https://example.org/abc/xyz?123');
        console.log(myURL.pathname);
        // Prints /abc/xyz

        myURL.pathname = '/abcdef';
        console.log(myURL.href);
        // Prints https://example.org/abcdef?123 
    }
    //gets & sets the search poriton of the url
    function searchUrl(){
    const myURL = new URL('https://example.org/abc?123');
    console.log(myURL.search);
    // Prints ?123

    myURL.search = 'abc=xyz';
    console.log(myURL.href);
    // Prints https://example.org/abc?abc=xyz 
    }
    //gets & sets the search parameters poriton of the url
    function searchUrlParams (){
        const myURL = new URL('https://example.org/abc?foo=~bar');

        console.log(myURL.search);  // prints ?foo=~bar

        // Modify the URL via searchParams...
        myURL.searchParams.sort();

        console.log(myURL.search);  // prints ?foo=%7Ebar 
    }
    // gets sets original url
    function originUrl(){
        const idnURL = new URL('https://測試');
        console.log(idnURL.origin);
        // Prints https://xn--g6w251d

        console.log(idnURL.hostname);
        // Prints xn--g6w251d 
    }
    //gets & sets the username poriton of the url
    function usernamehUrl(){
        const myURL = new URL('https://abc:xyz@example.com');
        console.log(myURL.username);
        // Prints abc

        myURL.username = '123';
        console.log(myURL.href);
        // Prints https://123:xyz@example.com/ 
    }
    //gets & sets the password poriton of the url
    function passwordUrl(){
        const myURL = new URL('https://abc:xyz@example.com');
        console.log(myURL.password);
        // Prints xyz

        myURL.password = '123';
        console.log(myURL.href);
        // Prints https://abc:123@example.com/ 
    }

    function toJSONhUrl(){
        const myURLs = [
        new URL('https://www.example.com'),
        new URL('https://test.example.org'),
        ];
        console.log(JSON.stringify(myURLs));
        // Prints ["https://www.example.com/","https://test.example.org/"] 
    }    
}

//Event Emitter :-  
// serves a similar function to event handlers/listeners in js
//with a focus on server side events
function emitEvent(){
    const eventEmitter = new EventEmitter();
    // note emitter.on() is interchangable with emitter.addListener()
    eventEmitter.on('start', (start, end) => {
        onsole.log(`started from ${start} to ${end}`);
    });
    //triggers the event with multiple arguments
    eventEmitter.emit('start', 1, 100);

    //different example
    const door = new EventEmitter();
    //.emit() synchronously calls every event listener declared  in order!
    door.emit('slam'); // emitting the event "slam"

    //emitter.eventNames() Returns array of strings representing the events registered on current EventEmitter
    door.eventNames();

    //emitter.getMaxListeners() Gets maximum amount of listeners one can add to an emitter, defaults to 10,
    //set by setMaxListeners()!
    door.getMaxListeners();

    //emitter.listenerCount() Gets count of listeners of passed  event as param
    door.listenerCount('open');

    //emitter.listeners() Gets array of event listeners passed as param
    door.listeners('open');

    //emitter.off() Alias for emitter.removeListener() added in Node.js 10
    const doSomething = () => {};
    door.on('open', doSomething);
    door.removeListener('open', doSomething);
}
//additional emitter methods:-
/*
once(): add a one-time listener
removeListener() / off(): remove an event listener from an event
removeAllListeners(): remove all listeners for an event
 */