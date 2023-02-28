module.exports = destroy();

function destroy() {
    const fs = require('fs');

    let index = Number(process.argv[3])

    if (index == undefined)    {
        console.log("Not enough parameters passed in command!");
        console.log("Usage: node pets.js destroy INDEX");
     }
    
    else {
        fs.readFile('./pets.json',"utf8", function(error, data){
            if(error){
                console.log(error);
             } 
                
            let currentRecords = JSON.parse(data);

            if (currentRecords[index] == undefined)
            {
                console.log("Record does not exist");
                return;
            }
            
            currentRecords.splice(index, 1);

            fs.writeFile('./pets.json', JSON.stringify(currentRecords), function(error){
                if(error) {
                    console.log(error)
                } else {
                    console.log('Record has been deleted!')
                }
            });
        });
    }   
}   