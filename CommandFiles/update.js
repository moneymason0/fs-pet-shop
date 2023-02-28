module.exports = update();

function update() {
    const fs = require('fs');

    let index = Number(process.argv[3])
    let age = Number(process.argv[4]);
    let kind = process.argv[5];
    let name = process.argv[6];

    if (index == undefined || age == undefined || kind == undefined || name == undefined)    {
        console.log("Not enough parameters passed in command!");
        console.log("Usage: node pets.js update INDEX AGE KIND NAME");
     }
    
    else {
        fs.readFile('./pets.json',"utf8", function(error, data){
            if(error){
                console.log(error);
                return;
             } 
                
            let currentRecords = JSON.parse(data);

            if (currentRecords[index] == undefined)   {
                    console.log("Record does not exist");
                    return;
                }
            
            currentRecords[index] = {"age": age, "kind": kind, "name": name};

            fs.writeFile('./pets.json', JSON.stringify(currentRecords), function(error){
                if(error) {
                    console.log(error);
                    return;
                 } 
                else {
                    console.log('Record has been updated!')
                }
            });
        });
    }   
}   