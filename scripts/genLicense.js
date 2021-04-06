const fs = require('fs');

function genLicense(folderPath) {
    // TODO :  Give option for creating LICENSE TYPE
    fs.appendFile(folderPath + '/LICENSE', "", function (err) {
        if (err) throw err;
        console.log('LICENSE saved!');
    });
}

module.exports = { genLicense };