const fs = require('fs');

function genPyFiles(folderPath, fileName) {
    fs.appendFile(`${folderPath}/${fileName}.py`, "", function (err) {
        if (err) throw err;
        console.log('main.py saved!');
    });
}

module.exports = { genPyFiles };