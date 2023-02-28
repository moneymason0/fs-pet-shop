const express = require('express');
const path = require('path');
var fs = require('fs');

const app = express();
const port = process.env.PORT || 8000;

var petsPath = path.join(__dirname, 'pets.json');

app.use(express.json());

app.get('/pets(/:id*)?', function(req, res){

  const id = Number(req.params.id);

      if (req.url === '/pets') {
        fs.readFile(petsPath, function(err, petsJSON) {
          if (err) {
            return err;
          }
          let allPets = JSON.parse(petsJSON);

          res.status(200).json(allPets);
        });
      }

    else if (id !== undefined) 
        {
            fs.readFile(petsPath, function(err, petsJSON) {
              if (err) {
                return err;
              }

              let petsJSONparsed = JSON.parse(petsJSON);
              let extractedPet = petsJSONparsed[id];

              // Checks to see if current Extracted Pet exists in the pets.json file
              if (extractedPet == undefined){
                res.end('Record Does Not Exist!');
               }
              else{
                res.json(extractedPet);
               }
            });
        }

    else {
      next(err)
    }
})

app.post('/pets', function(req, res){
  // POST localhost:8000/pets
  // body: { "age": 3,    "kind": "cat",    "name": "Max"}

  const age = req.body.age;
  const kind = req.body.kind;
  const name = req.body.name;

  console.log(req.body);

  if (age == undefined || kind == undefined || name == undefined)    {
    res.send("Did not have all query parameters to create a record....need AGE KIND NAME");
   }

else {
    fs.readFile('./pets.json', function(error, petsJSON){
        let currentRecords = JSON.parse(petsJSON);
        currentRecords.push(req.body);       
         
        fs.writeFile('./pets.json', JSON.stringify(currentRecords), function(error, req, res){ });
        res.json(currentRecords);
    });
} 
})

app.patch('/pets(/:id*)?', function(req, res){
  const id = Number(req.params.id);
  const age = req.body.age;
  const kind = req.body.kind;
  const name = req.body.name;

    fs.readFile(petsPath, function(err, petsJSON) {
      if (err) {
        return err;
      }
      let allPets = JSON.parse(petsJSON);
      allPets[id] = {age: age, kind: kind, name: name}; 

      fs.writeFile('./pets.json', JSON.stringify(allPets), function(error, req, res){ });
      res.status(200).json(allPets);
    });
})

app.delete('/pets(/:id*)?', function(req, res){
  const id = Number(req.params.id);

  fs.readFile(petsPath, function(err, petsJSON) {
    if (err) {
      return err;
    }
    let allPets = JSON.parse(petsJSON);
    allPets.splice(id, 1);

    fs.writeFile('./pets.json', JSON.stringify(allPets), function(error, req, res){ });
    res.status(200).json(allPets);
  });
})

app.listen(port, function(){
    console.log(`Server is running! on port ${port}`);
})