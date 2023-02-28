module.exports = get();

function get(req, res){

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

      if (req.url === '/pets') {
            fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
              if (err) {
                console.error(err.stack);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                return res.end('Internal Server Error');
              }
              res.setHeader('Content-Type', 'application/json');
              res.end(petsJSON);
            });
          }

        else if ([req.url[6]] !== undefined) 
            {
                fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
                  if (err) {
                    console.error(err.stack);
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    return res.end('Internal Server Error');
                  }

                  let petsJSONParsed = JSON.parse(petsJSON);
                  let extractPet = JSON.stringify(petsJSONParsed[req.url[6]]);
        
                  // Checks to see if current Extracted Pet exists in the pets.json file
                  if (extractPet == undefined){
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Record Does Not Exist!');
                  }
                  else{
                    res.setHeader('Content-Type', 'application/json');
                    res.end(extractPet);
                  }
                });
            }
        
      else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
      }
}
