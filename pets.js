#!/usr/bin/env node

const process = require('process');
// Printing process.argv property value
var command = process.argv[2];

if (command === "read"){
    require("./CommandFiles/read.js");
}

else if (command === "create"){
    require("./CommandFiles/create.js");
}

else if (command === "update"){
    require("./CommandFiles/update.js");
}

else if (command === "destroy"){
    require("./CommandFiles/destroy.js");
}


