
function create() {
    const fs = require('fs');

    let age = Number(process.argv[3]);
    let kind = process.argv[4];
    let name = process.argv[5];

    if (age == undefined || kind == undefined || name == undefined)    {
        console.log("Usage: node pets.js create AGE KIND NAME");
     }
    else {
        fs.readFile('./pets.json',"utf8", function(error, data){
            if(error){
                console.log(error);
             }     
            let newRecord = {"age": age, "kind": kind, "name": name};
            let currentRecords = JSON.parse(data);
            currentRecords.push(newRecord);
            
            fs.writeFile('./pets.json', JSON.stringify(currentRecords), function(error){
                if(error) {
                    console.log(error)
                } else {
                    console.log('it worked!')
                }
            });
        });
    }   
}   

// [{"age":7,"kind":"rainbow","name":"fido"},{"age":5,"kind":"snake","name":"Buttons"}]

module.exports = create();