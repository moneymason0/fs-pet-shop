
function read() {
    const fs = require('fs');

    fs.readFile('./pets.json',"utf8", function(error, data){
        if(error){
            console.log(error);
         } 

        else {
            let record = JSON.parse(data);
            if (record[process.argv[3]] === undefined)
                console.log("Usage: node pets.js read INDEX");
            else
                console.log(record[process.argv[3]]);
         }
    });
}

module.exports = read();