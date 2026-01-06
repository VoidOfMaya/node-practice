//global object!
//console.log(global);

// __dirname returns absolute file path
//__filename returns server.js file path

//modules : be mindfull when using ESM import may differ
import { people } from './peopleModule.js';

//streams

const fs = require('fs');

const readStream = fs.createReadStream( people , {encoding: 'utf8'});
const writeStream = fs.createWriteStream(people)

readStream.on('data', (chunk)=>{
    //reminder : end of day save , 36:30 on the second video about node basics / topic: streams;
    writeStream.write('\nNEW CHUNCK \n')
    writeStream.write(chunk);

})

//piping :- this does the same thing that the above code does
readStream.pipe(writeStream);